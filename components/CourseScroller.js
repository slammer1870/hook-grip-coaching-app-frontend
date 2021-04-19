import Link from "next/link";
import PropTypes from "prop-types";
import { fromImageToUrl } from "../utils/urls";

const CourseScroller = ({ course }) => {
  const MAX_LENGTH = 60;

  if (course) {
    return (
      <Link href={`/courses/${course.slug}`}>
      <a >
        <div
          className="flex flex-col border w-52 h-72
         my-4 "
        >
          <div className="flex h-full w-full items-center justify-center overflow-hidden relative">
            <img
              alt={course.title}
              src={fromImageToUrl(course.thumbnail)}
              className="top-0 absolute"
            />
          </div>
          <div className="p-2 flex flex-col justify-between h-full">
            <div>
              <h1 className="text-xl mb-1">{course.title}</h1>
              <div>
                {course.description && (course.description.length > MAX_LENGTH) ? (
                  <p className="text-sm">{`${course.description.substring(
                    0,
                    MAX_LENGTH
                  )}...`}</p>
                ) : (
                  <p>{course.description}</p>
                )}
              </div>
            </div>
            <span className="ml-auto">€{course.price}</span>
          </div>
        </div>
      </a></Link>
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
