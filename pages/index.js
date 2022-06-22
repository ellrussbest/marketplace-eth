import { Hero } from "@components/common"
import { CourseList } from "@components/course"
import { BaseLayout } from "@components/layout"
import { getAllCourses } from "@content/courses/fetcher"

export default function Home( { courses } ) {
  return (
    <>
      {/*------ HERO STARTS ------*/}
      <Hero />
      {/*------ HERO ENDS ------*/}

      {JSON.stringify(courses)}
      
      {/*------ COURSE CARD STARTS ------*/}
      <CourseList />
      {/*------ COURSE CARD ENDS ------*/}
    </>
  )
}

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data
    }
  }
}

Home.Layout = BaseLayout;