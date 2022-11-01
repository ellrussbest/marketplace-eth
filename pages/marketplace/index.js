import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "content/courses/fetcher";
import { useWalletInfo } from "@components/hooks/web3";
import { Button } from "@components/ui/common";
import { useState } from "react";
import { OrderModal } from "@components/ui/order";
import { MarketHeader } from "@components/ui/marketplace";
import { useWeb3 } from "@components/providers";

export default function Marketplace({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const {
    canPurchaseCourse,
    account: { data: address },
  } = useWalletInfo();
  const { web3, contract } = useWeb3();

  const purchaseCourse = async (order) => {
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);

    // emailHash + courseHash = proof
    const courseHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: address }
    );

    const emailHash = web3.utils.sha3(order.email);

    const proof = web3.utils.soliditySha3(
      { type: "bytes32", value: courseHash },
      { type: "bytes32", value: emailHash }
    );

    const value = web3.utils.toWei(String(order.price));

    try {
      await contract.methods.purchaseCourse(hexCourseId, proof).send({
        from: address,
        value,
      });
    } catch {
      console.log("Purchase course: Operation has failed");
    }
  };

  return (
    <>
      <MarketHeader />

      <CourseList courses={courses}>
        {(course) => {
          return (
            <CourseCard
              key={course.id}
              course={course}
              disabled={!canPurchaseCourse}
              Footer={() => (
                <div className="mt-4">
                  <Button
                    onClick={() => {
                      setSelectedCourse(course);
                    }}
                    variant="lightPurple"
                    disabled={!canPurchaseCourse}
                  >
                    Purchase
                  </Button>
                </div>
              )}
            />
          );
        }}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          purchaseCourse={purchaseCourse}
          setSelectedCourse={setSelectedCourse}
        />
      )}
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
}

Marketplace.Layout = BaseLayout;
