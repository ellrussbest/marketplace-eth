import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { Walletbar } from "@components/ui/web3";
import { getAllCourses } from "content/courses/fetcher";
import { useAccount, useNetwork } from "@components/hooks/web3";

export default function Marketplace({ courses }) {
  const { data: address } = useAccount();

  const {
    data: networkId,
    isSupported,
    targetNetwork,
    hasFinishedFirstFetch,
  } = useNetwork();

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
          return <CourseCard key={course.id} course={course} />;
        }}
      </CourseList>

      {/* {courses.map((course) => (
        <CourseCard course={course} key={course.id} />
      ))} */}
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
