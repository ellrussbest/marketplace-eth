import { Modal } from "@components/common";
import { CourseHero, 
  Curriculum, 
  Keypoints 
} from "@components/course";


export default function Course() {
  
    return (
      <div className="relative max-w-7xl mx-auto px-4">
        {/*------ HERO STARTS ------*/}
        <CourseHero />
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
      </div>
    )
  }