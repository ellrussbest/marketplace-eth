import { useWeb3 } from "@components/providers";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "content/courses/fetcher";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { AnimateKeyframes } from "react-simple-animate";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Statistics({ courses }) {
  const { contract } = useWeb3();
  const totalNumberOfCourses = courses.length;
  const [totalNumberOfPurchasedCourses, setTotalNumberOfPurchasedCourses] =
    useState(0);
  const [courseHashArray, setCourseHashArray] = useState([]);
  const [numberOfActivated, setNumberOfActivated] = useState(0);
  const [numberOfDeactivated, setNumberOfDeactivated] = useState(0);
  const [numberOfPending, setNumberOfPending] = useState(0);

  const doughnutData = {
    labels: ["Activated", "Deactivated", "Pending"],
    datasets: [
      {
        label: "Activated Deactivated and Pending Courses",
        data: [
          `${numberOfActivated}`,
          `${numberOfDeactivated}`,
          `${numberOfPending}`,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["Purchased", "Not purchased"],
    datasets: [
      {
        label: "Total number of courses",
        data: [
          `${totalNumberOfPurchasedCourses}`,
          `${totalNumberOfCourses - totalNumberOfPurchasedCourses}`,
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

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
      <div className="flex justify-center">
        <div className="border-2 w-72 shadow-sm rounded-lg bg-purple-200">
          <span className="flex justify-between text-base p-2 font-bold">
            {" "}
            Total Number of courses:{"    "}
            <strong className="text-2xl">{totalNumberOfCourses}</strong>
          </span>

          <span className="flex justify-between text-base p-2 font-bold">
            {" "}
            Total Number of purchased courses:{"    "}
            <strong className="text-2xl">
              {totalNumberOfPurchasedCourses}
            </strong>
          </span>

          <span className="flex justify-between text-base p-2 font-bold">
            {" "}
            Total Number of courses:{"    "}
            <strong className="text-2xl">{totalNumberOfCourses}</strong>
          </span>

          <span className="flex justify-between text-base p-2 font-bold">
            {" "}
            Total Number of courses:{"    "}
            <strong className="text-2xl">{totalNumberOfCourses}</strong>
          </span>

          <span className="flex justify-between text-base p-2 font-bold">
            {" "}
            Total Number of courses:{"    "}
            <strong className="text-2xl">{totalNumberOfCourses}</strong>
          </span>
        </div>
      </div>

      <div className="bg-red-100 mt-4 mr-10 flex justify-center items-center h-auto right-0 left-0">
        <div className="bg-blue-100 h-16">
          <Doughnut data={doughnutData} />
        </div>
        <div className="bg-green-100 h-16">
          <Pie data={pieData} />
        </div>
      </div>
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
