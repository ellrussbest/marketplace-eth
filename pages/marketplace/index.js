import { Hero } from "@components/ui/common";
import { CourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { Walletbar } from "@components/ui/web3";
import { getAllCourses } from "content/courses/fetcher";

export default function Marketplace({ courses }) {
  return (
    <>
      <div className="py-4">
        <Walletbar />
      </div>
      <CourseCard courses={courses} />
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
