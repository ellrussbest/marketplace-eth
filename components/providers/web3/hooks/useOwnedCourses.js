import { createCourseHash } from "@utils/hash";
import { normalizeOwnedCourse } from "@utils/normalize";
import useSWR from "swr";

export const handler = (web3, contract) => (courses, address) => {
  const swrRes = useSWR(
    () => {
      return web3 && contract && address
        ? `web3/ownedCourses/${address}`
        : null;
    },
    async () => {
      const ownedCourses = [];

      for (let i = 0; i < courses.length; i++) {
        const course = courses[i];

        if (!course.id) continue;

        const courseHash = createCourseHash(web3)(course.id, address);

        const ownedCourse = await contract.methods
          .getCourseByHash(courseHash)
          .call();

        if (ownedCourse.owner != "0x0000000000000000000000000000000000000000") {
          const normalized = normalizeOwnedCourse(web3)(course, ownedCourse);
          ownedCourses.push(normalized);
        }
      }

      return ownedCourses;
    }
  );



  return {
    data: swrRes.data,
    lookup:
      swrRes.data?.reduce((a, c) => {
        a[c.id] = c;
        return a;
      }, {}) ?? {},
  };
};
