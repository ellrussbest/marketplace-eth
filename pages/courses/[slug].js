import { useAccount, useOwnedCourse } from "@components/hooks/web3";
import { Message, Modal } from "@components/ui/common";
import { CourseHero, Curriculum, KeyPoints } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "content/courses/fetcher";

export default function Course({ course }) {
  const { data: address } = useAccount();
  const { data: ownedCourse } = useOwnedCourse(course, address);
  const courseState = ownedCourse?.state;

  const isLocked = courseState === "deactivated" || courseState === "purchased";

  return (
    <>
      <div className="py-4">
        <CourseHero
          hasOwner={!!ownedCourse}
          title={course.title}
          description={course.description}
          image={course.coverImage}
        />
      </div>
      <KeyPoints points={course.wsl} />;
      {courseState && (
        <div className="max-w-5xl mx-auto">
          {courseState === "purchased" && (
            <Message type="warning">
              Course is purchased and waiting for activation. Process can take
              up to 24 hours
              <i className="block font-normal">
                {" "}
                In case of any questions please contact ellrussbest@gmail.com
              </i>
            </Message>
          )}
          {courseState === "activated" && (
            <Message type="success">
              Sisi Education wishes you a happy learning
            </Message>
          )}
          {courseState === "deactivated" && (
            <Message type="danger">
              Course has been deactivated due to incorrect purchase data. The
              functionality to watch the course has been temporarily disabled.
              <i className="block font-normal">
                {" "}
                Please contact ellrussbest@gmail.com
              </i>
            </Message>
          )}
        </div>
      )}
      <Curriculum locked={isLocked} courseState={courseState} />
      <Modal />
    </>
  );
}

export function getStaticPaths() {
  const { data } = getAllCourses();

  return {
    paths: data.map((course) => {
      return {
        params: {
          slug: course.slug,
        },
      };
    }),
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

Course.Layout = BaseLayout;
