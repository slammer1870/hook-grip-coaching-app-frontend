<<<<<<< HEAD
import Link from "next/link";
import PropTypes from "prop-types";
import { fromImageToUrl } from "../utils/urls";

const OrderCurriculum = ({ user, active, handlerOrder }) => {
  if (active) {
    return (
      <div className="flex p-6 top-0 left-0 w-screen h-screen fixed bg-black bg-opacity-75 z-10 ">
          <button className="w-screen h-screen absolute" onClick={handlerOrder}></button>
        <div className="h-80 w-full max-w-screen-sm p-6 bg-white mx-auto my-auto z-20 relative">
            <h1 className="text-2xl">Coming Soon</h1>
        </div>
      </div>
    );
  } else return false;
};

OrderCurriculum.propTypes = {
  curriculum: PropTypes.shape({
    description: PropTypes.string,
  }),
=======
import Link from 'next/link';
import PropTypes from 'prop-types';
import { fromImageToUrl } from '../utils/urls';


const OrderCurriculum = ({ user, active }) => {
    return (
                <div className="flex flex-col border w-72 h-auto m-auto my-6">
                    <img alt={article.title} src={fromImageToUrl(article.image)} />
                    <div className="p-4">
                        <h4 className="text-xs uppercase mr-2 mb-2 font-thin text-blue-400">
                            {article.tag}
                        </h4>
                        <h1 className="text-xl mb-1">{article.title}</h1>
                        <p className="text-sm">{article.description}</p>
                    </div>
                </div>
    );
};

OrderCurriculum.propTypes = {
    curriculum: PropTypes.shape({
        description: PropTypes.string
    })
>>>>>>> ba398a967b269625a4765c67b735b096315a69ae
};

export default OrderCurriculum;
