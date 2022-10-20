import { Breadcrumbs, Hero } from "@components/common";
import { CourseCard } from "@components/course";
import { BaseLayout } from "@components/layout";
import { getAllCourses } from "content/courses/fetcher";

export default function Home({ courses }) {
  return (
    <BaseLayout>
      <Hero />
      <CourseCard courses={courses} />
    </BaseLayout>
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

// Home.Layout = BaseLayout;
