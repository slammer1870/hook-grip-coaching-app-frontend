import Link from "next/link";
import PropTypes from "prop-types";
import { fromImageToUrl } from "../utils/urls";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from 'next/router';


const OrderCurriculum = ({ timeslots, active, handlerOrder }) => {
  const { getToken } = useContext(AuthContext);
  const [time, setTime] = useState()
  const router = useRouter()

  const handleBooking = async (e) => {
    e.preventDefault();
    const token = await getToken();
    setTime(e.target.timeslot.value)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/curricula`, {
      method: "POST",
      body: JSON.stringify({
        timeslot: { id: e.target.timeslot.value },
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("sent");
    const result = await res.json();
    router.push(`/curriculums/confirm/${result.id}`)
  };


  if (timeslots && active) {
    return (
      <div className="flex p-6 top-0 left-0 w-screen h-screen fixed bg-black bg-opacity-75 z-10 ">
        <button
          className="w-screen h-screen absolute"
          onClick={handlerOrder}
        ></button>
        <div className="h-80 w-full max-w-screen-sm p-6 bg-white mx-auto my-auto z-20 relative">
          <form onSubmit={handleBooking}>
            <label for="timeslot">Choose a time:</label>
            <select id="timeslot">
              {timeslots.map((timeslot) => (
                <option value={timeslot.id}>{timeslot.date}</option>
              ))}
            </select>
            <input type="submit"></input>
          </form>
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
