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
};

export default OrderCurriculum;
