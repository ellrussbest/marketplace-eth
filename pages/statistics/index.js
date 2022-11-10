import { useWeb3 } from "@components/providers";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "content/courses/fetcher";
import { useEffect, useState } from "react";

export default function Statistics({ courses }) {
  const { contract } = useWeb3();
  const totalNumberOfCourses = courses.length;
  const [totalNumberOfPurchasedCourses, setTotalNumberOfPurchasedCourses] =
    useState(0);
  const [courseHashArray, setCourseHashArray] = useState([]);
  const [numberOfActivated, setNumberOfActivated] = useState(0);
  const [numberOfDeactivated, setNumberOfDeactivated] = useState(0);
  const [numberOfPending, setNumberOfPending] = useState(0);

  useEffect(() => {
    const getOwnedCoursesCount = async () => {
      if (contract) {
        const result = await contract.methods.getAllOwnedCourses().call();
        setCourseHashArray(result);
      }
    };

    getOwnedCoursesCount();
  }, [contract]);

  useEffect(() => {
    setTotalNumberOfPurchasedCourses(courseHashArray.length);
  }, [courseHashArray]);

  useEffect(() => {
    const pendingState = courseHashArray.filter((value) => {
      return value.state === "0";
    });
    setNumberOfPending(pendingState.length);

    const activatedState = courseHashArray.filter((value) => {
      return value.state === "1";
    });
    setNumberOfActivated(activatedState.length);

    const deactivatedState = courseHashArray.filter((value) => {
      return value.state === "2";
    });
    setNumberOfDeactivated(deactivatedState.length);
  }, [courseHashArray]);

  return (
    <>
      <div> Total Number of courses: {totalNumberOfCourses}</div>
      <div>
        Total Number of Purchased Courses: {totalNumberOfPurchasedCourses}
      </div>
      <div>Total number of Pending Courses: {numberOfPending}</div>
      <div>Total number of Activated Courses: {numberOfActivated}</div>
      <div>Total number of Deactivated Courses: {numberOfDeactivated}</div>
    </>
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

Statistics.Layout = BaseLayout;
