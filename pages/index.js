import { Hero } from "@components/ui/common";
import { CourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "content/courses/fetcher";

export default function Home({ courses }) {
  return (
    <>
      <Hero />
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

Home.Layout = BaseLayout;
