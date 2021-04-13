import PropTypes from "prop-types";
import { fromImageToUrl } from "../utils/urls";

const CurriculumScroller = ({ curriculum }) => {
  const MAX_LENGTH = 60;

  if (curriculum) {
    return (
      <a href={`/curriculums/${curriculum.id}`}>
        <div
          className="flex flex-col border w-52 h-72
         my-4 "
        >
          <div className="flex h-full w-full items-center justify-center overflow-hidden relative">
            <img
              alt={curriculum.title}
              src={fromImageToUrl(curriculum.thumbnail)}
              className="top-0 absolute"
            />
          </div>
          <div className="p-2 flex flex-col justify-between h-full">
            <div>
              <h1 className="text-xl mb-1">{curriculum.name}'s curriculum</h1>
             
            </div>
          </div>
        </div>
      </a>
    );
  } else return false;
};

CurriculumScroller.propTypes = {
  curriculum: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default CurriculumScroller;
