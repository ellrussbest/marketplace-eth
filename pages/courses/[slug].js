import { Modal } from "@components/common";
import { CourseHero, Curriculum, KeyPoints } from "@components/course";
import { BaseLayout } from "@components/layout";
import { getAllCourses } from "content/courses/fetcher";

export default function Course({ course }) {
  return (
    <BaseLayout>
      <div className="py-4">
        <CourseHero
          title={course.title}
          description={course.description}
          image={course.coverImage}
        />
      </div>
      <KeyPoints points={course.wsl} />;
      <Curriculum locked={true} />
      <Modal />
    </BaseLayout>
  );
}

export function getStaticPaths() {
  const { data } = getAllCourses();

  return {
    paths: data.map((course) => ({
      params: {
        slug: course.slug,
      },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const { data } = getAllCourses();

  const course = data.filter((course) => course.slug === params.slug)[0];
  return {
    props: {
      course,
    },
  };
}

// Course.Layout = BaseLayout;
