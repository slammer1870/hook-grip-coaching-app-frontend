import PropTypes from "prop-types";
import { fromImageToUrl } from "../utils/urls";

const CourseScroller = ({ course }) => {
  if (course) {
    return (
      <a href={`/courses/${course.slug}`}>
        <div className="flex flex-col border w-52 h-72
         my-4 ">
          <div className="flex h-full w-full items-center justify-center overflow-hidden relative">
            <img alt={course.title} src={fromImageToUrl(course.thumbnail)} className="top-0 absolute"/>
          </div>
          <div className="p-2 flex flex-col justify-between h-full">
            <div>
            <h1 className="text-xl mb-1">{course.title}</h1>
            <p className="text-sm">{course.description}</p></div>
            <span className="ml-auto">
              €{course.price}
            </span>
            
          </div>
        </div>
      </a>
    );
  } else return false;
};

CourseScroller.propTypes = {
  course: PropTypes.shape({
    slug: PropTypes.string,
    thumbnail: PropTypes.shape({ url: PropTypes.string }),
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default CourseScroller;
