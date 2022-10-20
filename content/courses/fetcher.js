import courses from "./index.json";

export const getAllCourses = () => {
  return {
    data: courses,
    courseMap: courses.reduce((accumulator, course, index) => {
      const { id } = course;
      course = { ...course, index: `${index}` };
      return { ...accumulator, [id]: course };
    }, {}),
  };
};
