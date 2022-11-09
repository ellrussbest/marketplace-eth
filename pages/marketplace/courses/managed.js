import { useAccount, useManagedCourses } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button, Message } from "@components/ui/common";
import { CourseFilter, ManagedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
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

  const verifyCourse = (email, { courseHash, proof }) => {
    console.log(email);
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
  };

  const changeCourseState = async (courseHash, method) => {
    try {
      await contract.methods[method](courseHash).send({
        from: address,
      });
    } catch (e) {
      console.error(e.message);
    }
  };

  const activateCourse = async (courseHash) => {
    changeCourseState(courseHash, "activateCourse");
  };

  const deactivateCourse = async (courseHash) => {
    changeCourseState(courseHash, "deactivateCourse");
  };

  if (hasFinishedFirstFetch && !isAdmin)
    return (
      <div>
        <Message type="danger">Unauthorized access!!</Message>
      </div>
    );

  return (
    <>
      <MarketHeader />
      <CourseFilter />
      <section className="grid grid-cols-1">
        {managedCourses?.map((managedCourse) => (
          <ManagedCourseCard
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
                  onClick={() => activateCourse(managedCourse.courseHash)}
                  variant="green"
                >
                  Activate
                </Button>
                <Button
                  onClick={() => deactivateCourse(managedCourse.courseHash)}
                  variant="red"
                >
                  Deactivate
                </Button>
              </div>
            )}
          </ManagedCourseCard>
        ))}
      </section>
    </>
  );
}

ManagedCourses.Layout = BaseLayout;
