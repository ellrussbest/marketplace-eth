import { useAccount, useOwnedCourses } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button, Message } from "@components/ui/common";
import { OwnedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { getAllCourses } from "@content/courses/fetcher";
import Link from "next/link";

export default function OwnedCourses({ courses }) {
  const { requireInstall } = useWeb3();
  const { data: address, isEmpty: isAddressEmpty } = useAccount();
  const { data: ownedCourses, isEmpty: isOwnedCourseEmpty } = useOwnedCourses(
    courses,
    address
  );

  return (
    <>
      <div className="py-4">
        <MarketHeader />
      </div>

      <section className="grid grid-cols-1">
        {isOwnedCourseEmpty && (
          <div>
            <Message type="warning">
              You don&apos;t own any courses
              <Link href="/marketplace">
                <a className="font-normal hover:underline">
                  <i className="block">Purchase Course</i>
                </a>
              </Link>
            </Message>
          </div>
        )}
        {isAddressEmpty && (
          <div>
            <Message type="warning">Please connect to Metamask</Message>
          </div>
        )}

        {requireInstall && (
          <div>
            <Message type="warning">Please install Metamask</Message>
          </div>
        )}
        {ownedCourses?.map((course) => {
          return (
            <OwnedCourseCard key={course.id} course={course}>
              <Button>Watch the course</Button>
            </OwnedCourseCard>
          );
        })}
      </section>
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

OwnedCourses.Layout = BaseLayout;
