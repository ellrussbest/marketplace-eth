import { normalizeOwnedCourse } from "@utils/normalize";
import useSWR from "swr";

export const handler = (web3, contract) => (address, isAdmin) => {
  const swrRes = useSWR(
    () => {
      return web3 && contract && address && isAdmin
        ? `web3/manageCourses/${address}`
        : null;
    },
    async () => {
      const courses = [];
      const courseCount = await contract.methods.getCourseCount().call();

      for (let i = Number(courseCount) - 1; i >= 0; i--) {
        const courseHash = await contract.methods
          .getCourseHashAtIndex(i)
          .call();
        const course = await contract.methods
          .getCourseByHash(courseHash)
          .call();

        if (course) {
          courses.push(normalizeOwnedCourse(web3)({ courseHash }, course));
        }
      }
      return courses;
    }
  );

  return { data: swrRes.data };
};
