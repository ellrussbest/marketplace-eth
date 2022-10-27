import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { Walletbar } from "@components/ui/web3";
import { getAllCourses } from "content/courses/fetcher";
import { useAccount, useNetwork } from "@components/hooks/web3";
import { Button, Modal } from "@components/ui/common";
import { useState } from "react";
import { OrderModal } from "@components/ui/order";

export default function Marketplace({ courses }) {
  const { data: address } = useAccount();

  const {
    data: networkId,
    isSupported,
    targetNetwork,
    hasFinishedFirstFetch,
  } = useNetwork();

  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <>
      <div className="py-4">
        <Walletbar
          address={address}
          networkId={networkId}
          targetNetwork={targetNetwork}
          isSupported={isSupported}
          hasFinishedFirstFetch={hasFinishedFirstFetch}
        />
      </div>
      <CourseList courses={courses}>
        {(course) => {
          return (
            <CourseCard
              key={course.id}
              course={course}
              Footer={() => (
                <div className="mt-4">
                  <Button
                    onClick={() => {
                      setSelectedCourse(course);
                    }}
                    variant="lightPurple"
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
