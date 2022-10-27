export default function CourseList({ courses, children }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
      {courses.map((course) => {
        return children(course);
      })}
    </section>
  );
}
