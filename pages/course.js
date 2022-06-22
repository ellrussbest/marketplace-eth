import { Modal } from "@components/common";
import { CourseHero, 
  Curriculum, 
  Keypoints 
} from "@components/course";
import { BaseLayout } from "@components/layout";


export default function Course() {
  
    return (
      <>
        {/*------ HERO STARTS ------*/}
        <div className="py-4">
          <CourseHero />
        </div>
        {/*------ HERO ENDS ------*/}
  
        {/*------ KEYPOINT STARTS ------*/}
        <Keypoints />
        {/*------ KEYPOINT ENDS ------*/}
  
        {/*------ LECTURES STARTS ------*/}
        <Curriculum />
        {/*------ LECTURES ENDS ------*/}
  
        {/* MODAL STARTS */}
        <Modal />
        {/* MODAL ENDS */}
      </>
    )
  }

  Course.Layout = BaseLayout;