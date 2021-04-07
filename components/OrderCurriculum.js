import Link from "next/link";
import PropTypes from "prop-types";
import { fromImageToUrl } from "../utils/urls";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";

const OrderCurriculum = ({ timeslots, active, handlerOrder }) => {
  const { user, getToken } = useContext(AuthContext);
  const [time, setTime] = useState();
  const router = useRouter();

  const handleBooking = async (e) => {
    e.preventDefault();
    const token = await getToken();
    setTime(e.target.timeslot.value);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/curricula`, {
      method: "POST",
      body: JSON.stringify({
        timeslot: { id: e.target.timeslot.value },
        name: e.target.name.value,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("sent");
    const result = await res.json();
    const redirect = await router.push(`/curriculums/confirm/${result.id}`);
  };

  if (user && timeslots && active) {
    return (
      <div className="flex p-6 top-0 left-0 w-screen h-screen fixed bg-black bg-opacity-75 z-10 ">
        <Link href="/curriculums">
          <button
            className="w-screen h-screen absolute"
            onClick={handlerOrder}
          ></button>
        </Link>
        <div className="h-100 w-full max-w-screen-sm p-6 bg-gray-100 mx-auto my-auto z-20 relative">
          <div class="flex relative w-3/4 sm:items-center md:w-2/3 mx-auto">
            <div class="w-full h-6 absolute inset-0 flex items-center justify-center">
              <div class="w-full ml-6 h-1 bg-gray-200 pointer-events-none"></div>
              <div class="flex-shrink-0 w-6 h-6 rounded-full inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm opacity-50"></div>
            </div>
            <div class="flex-shrink-0 w-6 h-6 rounded-full inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm"></div>
          </div>
          <div className="h-6 w-10/12 md:w-3/4 flex justify-between bg-gray-100 max-w-screen-sm bg-white mx-auto my-auto z-20 relative">
            <h1>Schedule</h1>
            <h1 className="opacity-50">Confirm</h1>
          </div>
          <form onSubmit={handleBooking}>
            <label class="block my-4">
              <span class="text-gray-700">Name</span>
              <input
                type="text"
                id="name"
                class="form-input mt-1 p-2 block w-full"
                placeholder="Your Name"
                required
              />
            </label>
            <label class="block my-4">
              <span class="text-gray-700">Email</span>
              <input
                type="text"
                class="form-input mt-1 p-2 block w-full placeholder-black"
                placeholder={user.email}
                readOnly="readonly"
              />
            </label>
            <label for="timeslot my-4">Choose a time:</label>
            {timeslots.filter(timeslot => timeslot.date) != 0 ? (
              <select
                id="timeslot"
                className="form-select mt-1 p-2 block w-full"
              >
                {timeslots.filter(timeslot => timeslot.date).map((timeslot) => (
                  <option value={timeslot.id}>
                    {new Date(timeslot.date).toUTCString()}
                  </option>
                ))}
              </select>
            ) : (
              <p className="my-3">
                We're sorry but there's no bookings currently available!
              </p>
            )}
            {timeslots.filter(timeslot => timeslot.date) != 0 && (
              <input
                type="submit"
                value="BOOK NOW"
                className="flex bg-blue-400 font-bold text-white w-full p-3 transition duration-300 ease-in-out hover:bg-blue-500 text-center justify-center items-center h-12 mt-8 my-4"
              />
            )}
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
