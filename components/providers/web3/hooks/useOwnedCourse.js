import { normalizeOwnedCourse } from "@utils/normalize";
import useSWR from "swr";

export const handler = (web3, contract) => (course, address) => {
  const swrRes = useSWR(
    () => {
      return web3 && contract && address
        ? `web3/ownedCourses/${address}`
        : null;
    },
    async () => {
      const hexCourseId = web3.utils.utf8ToHex(course.id);
      const courseHash = web3.utils.soliditySha3(
        { type: "bytes16", value: hexCourseId },
        { type: "address", value: address }
      );

      const ownedCourse = await contract.methods
        .getCourseByHash(courseHash)
        .call();

      if (ownedCourse.owner === "0x0000000000000000000000000000000000000000") {
        return null;
      }

      return normalizeOwnedCourse(web3)(course, ownedCourse);
    }
  );

  return { data: swrRes.data };
};
