import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "content/courses/fetcher";
import { useWalletInfo } from "@components/hooks/web3";
import { Button } from "@components/ui/common";
import { useState } from "react";
import { OrderModal } from "@components/ui/order";
import { MarketHeader } from "@components/ui/marketplace";

export default function Marketplace({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { canPurchaseCourse } = useWalletInfo();

  return (
    <>
      <div className="py-4">
        <MarketHeader />
      </div>

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
