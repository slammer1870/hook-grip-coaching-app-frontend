import Link from "next/link";
import PropTypes from "prop-types";
import { fromImageToUrl } from "../utils/urls";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";
import BuyButton from "../components/BuyButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const OrderCurriculum = ({ timeslots, active, handlerOrder }) => {
  const { user, getToken } = useContext(AuthContext);
  const [booking, setBooking] = useState();
  const [loading, setLoading] = useState();
  const [time, setTime] = useState();

  const router = useRouter();

  const handleBooking = async (e) => {
    setLoading(true);
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
    console.log(result);
    setBooking(result);
    setLoading(false);
  };

  console.log(booking);

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
          <div className="flex relative w-3/4 sm:items-center md:w-2/3 mx-auto">
            <div className="w-full h-6 absolute inset-0 flex items-center justify-center">
              <div className="w-full ml-6 h-1 bg-gray-200 pointer-events-none"></div>
              <div
                className={
                  !booking
                    ? "flex-shrink-0 w-6 h-6 rounded-full inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm opacity-50"
                    : "flex-shrink-0 w-6 h-6 rounded-full inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm"
                }
              ></div>
            </div>
            <button onClick={() => setBooking(false)}>
              <div
                className={
                  booking
                    ? "flex-shrink-0 w-6 h-6 rounded-full inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm opacity-50"
                    : "flex-shrink-0 w-6 h-6 rounded-full inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm"
                }
              ></div>
            </button>
          </div>
          <div className="h-6 w-10/12 md:w-3/4 flex justify-between bg-gray-100 max-w-screen-sm bg-white mx-auto my-auto z-20 relative">
            <h1 className={booking && "opacity-50"}>Schedule</h1>
            <h1 className={!booking && "opacity-50"}>Confirm</h1>
          </div>
          {!booking && (
            <form onSubmit={handleBooking}>
              <h1 className="text-2xl mt-4">Schedule your curriculum</h1>
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
              {timeslots.filter((timeslot) => timeslot.date) != 0 ? (
                <select
                  id="timeslot"
                  className="form-select mt-1 p-2 block w-full"
                >
                  {timeslots
                    .filter((timeslot) => timeslot.date)
                    .map((timeslot) => (
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
              {timeslots.filter((timeslot) => timeslot.date) != 0 &&
                !loading && (
                  <input
                    type="submit"
                    value="BOOK NOW"
                    className="flex bg-blue-400 font-bold text-white w-full p-3 transition duration-300 ease-in-out hover:bg-blue-500 text-center justify-center items-center h-12 mt-8 my-4"
                  />
                )}
              {timeslots.filter((timeslot) => timeslot.date) != 0 && loading && (
                <button className="flex bg-blue-400 font-bold text-white w-full p-3 transition duration-300 ease-in-out hover:bg-blue-500 text-center justify-center items-center h-12 mt-8 my-4">
                  <FontAwesomeIcon icon={faCircleNotch} spin />
                </button>
              )}
            </form>
          )}
          {booking && (
            <div>
              <h1 className="text-2xl mt-4">{booking.title}</h1>
              <label className="block my-4">
                <span className="text-gray-700">Name</span>
                <input
                  type="text"
                  className="form-input mt-1 py-2 px-5 mx-autoblock w-full bg-gray-100 placeholder-black"
                  placeholder={booking.name}
                  readOnly="readonly"
                />
              </label>
              <label className="block my-4">
                <span className="text-gray-700">Email</span>
                <input
                  type="text"
                  className="form-input mt-1 py-2 px-5 block w-full bg-gray-100 placeholder-black"
                  placeholder={booking.user.email}
                  readOnly="readonly"
                />
              </label>
              <label className="block my-4">
                <span className="text-gray-700">Time</span>
                <input
                  type="text"
                  className="form-input mt-1 py-2 px-5 block w-full bg-gray-100 placeholder-black"
                  placeholder={new Date(booking.timeslot.date).toUTCString()}
                  readOnly="readonly"
                />
              </label>
              <div className="mt-2">
                <BuyButton product={booking} />
              </div>
            </div>
          )}
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
