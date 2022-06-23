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
      
      {/*------ COURSE CARD STARTS ------*/}
      <CourseList courses = {courses} />
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