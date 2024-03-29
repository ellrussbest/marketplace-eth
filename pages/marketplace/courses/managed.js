import { useAccount, useManagedCourses } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button, Loader, Message } from "@components/ui/common";
import { CourseFilter, ManagedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { normalizeOwnedCourse } from "@utils/normalize";
import { withToast } from "@utils/toast";
import { useState } from "react";

const VerificationInput = ({ verifyCourse, managedCourse }) => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex mr-2 relative rounded-md">
      <input
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        type="text"
        name="account"
        id="account"
        className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
        placeholder="0x2341ab..."
      />
      <Button
        onClick={() =>
          verifyCourse(email, {
            courseHash: managedCourse.courseHash,
            proof: managedCourse.proof,
          })
        }
      >
        Verify
      </Button>
    </div>
  );
};

export default function ManagedCourses() {
  const [proofOfOwnership, setProofOfOwnership] = useState({});
  const { data: address, isAdmin, hasFinishedFirstFetch } = useAccount();
  const { web3, contract } = useWeb3();
  const { data: managedCourses } = useManagedCourses(address, isAdmin);
  const [searchedCourse, setSearchedCourse] = useState(null);
  const [filteredCourse, setFilteredCourse] = useState({ state: "all" });
  const [busyCourseId, setBusyCourseId] = useState(null);

  const verifyCourse = (email, { courseHash, proof }) => {
    if (email) {
      const emailHash = web3.utils.sha3(email);
      const proofToCheck = web3.utils.soliditySha3(
        { type: "bytes32", value: courseHash },
        { type: "bytes32", value: emailHash }
      );

      proofToCheck === proof
        ? setProofOfOwnership((proofOfOwnership) => ({
            ...proofOfOwnership,
            [courseHash]: true,
          }))
        : setProofOfOwnership((proofOfOwnership) => ({
            ...proofOfOwnership,
            [courseHash]: false,
          }));
    }
  };

  const changeCourseState = async (courseHash, method, courseId) => {
    setBusyCourseId(courseId);
    try {
      const result = await contract.methods[method](courseHash).send({
        from: address,
      });

      return result;
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    } finally {
      setBusyCourseId(null);
    }
  };

  const activateCourse = async (courseHash, courseId) => {
    withToast(changeCourseState(courseHash, "activateCourse", courseId));
  };

  const deactivateCourse = async (courseHash, courseId) => {
    withToast(changeCourseState(courseHash, "deactivateCourse", courseId));
  };

  const renderCard = (managedCourse, isSearched) => {
    const isBusy = busyCourseId === managedCourse.id;
    return (
      <ManagedCourseCard
        isSearched={isSearched}
        key={managedCourse.id}
        managedCourse={managedCourse}
      >
        <VerificationInput
          verifyCourse={verifyCourse}
          managedCourse={managedCourse}
        />

        {proofOfOwnership[managedCourse.courseHash] && (
          <div className="mt-2">
            <Message>Verified!</Message>
          </div>
        )}
        {proofOfOwnership[managedCourse.courseHash] == false && (
          <div className="mt-2">
            <Message type="danger">Wrong Proof</Message>
          </div>
        )}
        {managedCourse.state === "purchased" && (
          <div className="mt-2">
            <Button
              disabled={isBusy}
              onClick={() =>
                activateCourse(managedCourse.courseHash, managedCourse.id)
              }
              variant="green"
            >
              {isBusy ? (
                <div className="flex">
                  {" "}
                  <Loader size="sm" />
                  <div className="ml-2">In Progress</div>
                </div>
              ) : (
                <div>Activate</div>
              )}
            </Button>
            <Button
              disabled={isBusy}
              onClick={() =>
                deactivateCourse(managedCourse.courseHash, managedCourse.id)
              }
              variant="red"
            >
              {isBusy ? (
                <div className="flex">
                  {" "}
                  <Loader size="sm" />
                  <div className="ml-2">In Progress</div>
                </div>
              ) : (
                <div>Deactivate</div>
              )}
            </Button>
          </div>
        )}
      </ManagedCourseCard>
    );
  };

  if (hasFinishedFirstFetch && !isAdmin)
    return (
      <div>
        <Message type="danger">Unauthorized access!!</Message>
      </div>
    );

  const handleSearchSubmit = async (courseHash) => {
    const regEx = /[0-9A-Fa-f]{6}/g;

    if (courseHash && courseHash.length === 66 && regEx.test(courseHash)) {
      const course = await contract.methods.getCourseByHash(courseHash).call();

      if (course.owner !== "0x0000000000000000000000000000000000000000") {
        const normalized = normalizeOwnedCourse(web3)({ courseHash }, course);
        setSearchedCourse(normalized);
        return;
      }
    }
    searchedCourse(null);
  };

  const handleFilterSelected = async (value) => {
    setFilteredCourse({ state: value });
  };

  const filteredCourses = managedCourses
    ?.filter((course) => {
      if (filteredCourse.state === "all") return true;
      return course.state === filteredCourse.state;
    })
    .map((managedCourse) => renderCard(managedCourse));

  return (
    <>
      <MarketHeader />
      <CourseFilter
        handleSearchSubmit={handleSearchSubmit}
        handleFilterSelected={handleFilterSelected}
      />
      <section className="grid grid-cols-1">
        {searchedCourse && (
          <div>
            <h1 className="text-2xl font-bold p-5">Searched Courses</h1>
            {renderCard(searchedCourse, true)}
          </div>
        )}
        <h1 className="text-2xl font-bold p-5">All Courses</h1>
        {filteredCourses}
        {filteredCourses?.length === 0 && (
          <Message type="warning">No courses to display</Message>
        )}
      </section>
    </>
  );
}

ManagedCourses.Layout = BaseLayout;
