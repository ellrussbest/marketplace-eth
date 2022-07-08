import { Modal } from "@components/common";
import { CourseHero, 
  Curriculum, 
  Keypoints 
} from "@components/course";
import { BaseLayout } from "@components/layout";
import { getAllCourses } from "@content/courses/fetcher";


export default function Course( { course } ) {

    return (
        <>
        {/*------ HERO STARTS ------*/}
        <div className="py-4">
            <CourseHero 
            title={course.title}
            description={course.description}
            image={course.coverImage}
            />
        </div>
        {/*------ HERO ENDS ------*/}

        {/*------ KEYPOINT STARTS ------*/}
        <Keypoints 
            points={course.wsl}
        />
        {/*------ KEYPOINT ENDS ------*/}

        {/*------ LECTURES STARTS ------*/}
        <Curriculum 
            locked={true}
        />
        {/*------ LECTURES ENDS ------*/}

        {/* MODAL STARTS */}
        <Modal />
        {/* MODAL ENDS */}
        </>
    )
}

export function getStaticPaths() {
    const { data } = getAllCourses();

    return {
        // paths is the array of all the paths we'd like to render
        paths: data.map(c => ({
            params: {
                slug: c.slug
            }
        })),
        fallback: false,
    }
}

export function getStaticProps({ params }) {
    const { data } = getAllCourses();
    const course = data.filter(c => c.slug === params.slug)[0]
    return {
      props: {
        course
      }
    }
}

Course.Layout = BaseLayout;