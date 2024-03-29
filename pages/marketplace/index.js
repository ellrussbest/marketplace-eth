import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "content/courses/fetcher";
import { useOwnedCourses, useWalletInfo } from "@components/hooks/web3";
import { Button, Loader } from "@components/ui/common";
import { useState } from "react";
import { OrderModal } from "@components/ui/order";
import { MarketHeader } from "@components/ui/marketplace";
import { useWeb3 } from "@components/providers";
import { withToast } from "@utils/toast";

export default function Marketplace({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isNewPurchase, setIsNewPurchase] = useState(true);
  const [busyCourseId, setBusyCourseId] = useState(null);
  const {
    hasConnectedWallet,
    account: { data: address },
    isConnecting,
  } = useWalletInfo();
  const { lookup, hasFinishedFirstFetch, mutate } = useOwnedCourses(
    courses,
    address
  );

  const { web3, contract, requireInstall } = useWeb3();

  const purchaseCourse = async (order, course) => {
    const hexCourseId = web3.utils.utf8ToHex(course.id);

    // emailHash + courseHash = proof
    const courseHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: address }
    );

    const value = web3.utils.toWei(String(order.price));

    setBusyCourseId(course.id);

    if (isNewPurchase) {
      const emailHash = web3.utils.sha3(order.email);

      const proof = web3.utils.soliditySha3(
        { type: "bytes32", value: courseHash },
        { type: "bytes32", value: emailHash }
      );

      withToast(_purchaseCourse(hexCourseId, proof, value));
    } else {
      withToast(_repurchaseCourse(courseHash));
    }
  };

  const _purchaseCourse = async (hexCourseId, proof, value) => {
    try {
      const result = await contract.methods
        .purchaseCourse(hexCourseId, proof)
        .send({
          from: address,
          value,
        });
      mutate();
      return result;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setBusyCourseId(null);
    }
  };

  const _repurchaseCourse = async (courseHash, value) => {
    try {
      const result = await contract.methods.repurchaseCourse(courseHash).send({
        from: address,
        value,
      });
      mutate();
      return result;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setBusyCourseId(null);
    }
  };

  return (
    <>
      <MarketHeader />
      <CourseList courses={courses}>
        {(course) => {
          const owned = lookup[course.id];

          return (
            <CourseCard
              key={course.id}
              course={course}
              state={owned?.state}
              disabled={!hasConnectedWallet}
              Footer={() => {
                if (requireInstall) {
                  return (
                    <Button size="sm" variant="lightPurple" disabled={true}>
                      Install
                    </Button>
                  );
                }

                if (isConnecting) {
                  return (
                    <Button size="sm" variant="lightPurple" disabled={true}>
                      <Loader size="sm" />
                    </Button>
                  );
                }

                if (!hasFinishedFirstFetch && !address) {
                  return (
                    <Button variant="white" size="sm" disabled={true}>
                      {hasConnectedWallet ? "Loading State..." : "Connect"}
                    </Button>
                  );
                }

                const isBusy = busyCourseId === course.id;

                if (owned) {
                  return (
                    <>
                      <div className="flex">
                        <Button size="sm" variant="white">
                          Yours &#10003;
                        </Button>
                        {owned.state === "deactivated" && (
                          <div className="ml-1">
                            <Button
                              size="sm"
                              variant="purple"
                              disabled={isBusy}
                              onClick={() => {
                                setIsNewPurchase(false);
                                setSelectedCourse(course);
                              }}
                            >
                              {isBusy ? (
                                <div className="flex">
                                  {" "}
                                  <Loader size="sm" />
                                  <div className="ml-2">In Progress</div>
                                </div>
                              ) : (
                                <div>Fund to Activate</div>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </>
                  );
                }
                return (
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedCourse(course);
                    }}
                    variant="lightPurple"
                    disabled={!hasConnectedWallet || isBusy}
                  >
                    {isBusy ? (
                      <div className="flex">
                        {" "}
                        <Loader size="sm" />
                        <div className="ml-2">In Progress</div>
                      </div>
                    ) : (
                      <div>Purchase</div>
                    )}
                  </Button>
                );
              }}
            />
          );
        }}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          purchaseCourse={purchaseCourse}
          setSelectedCourse={setSelectedCourse}
          setIsNewPurchase={setIsNewPurchase}
          isNewPurchase={isNewPurchase}
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
