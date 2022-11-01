export const createCourseHash = (web3) => (courseId, address) => {
  const hexCourseId = web3.utils.utf8ToHex(courseId);
  const courseHash = web3.utils.soliditySha3(
    { type: "bytes16", value: hexCourseId },
    { type: "address", value: address }
  );

  return courseHash;
};
