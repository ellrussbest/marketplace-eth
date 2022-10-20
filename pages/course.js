import { Modal } from "@components/common";
import { CourseHero, Curriculum, KeyPoints } from "@components/course";
import { BaseLayout } from "@components/layout";

export default function Course() {
  return (
    <BaseLayout>
      <div className="py-4">
        <CourseHero />
      </div>

      {Array.from({ length: 4 }).map((_, i) => {
        return <KeyPoints key={i} />;
      })}

      <Curriculum />

      <Modal />
    </BaseLayout>
  );
}

// Course.Layout = BaseLayout;
