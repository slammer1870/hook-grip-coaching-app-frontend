import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import CourseScroller from "../components/CourseScroller";
import AuthContext from "../context/AuthContext";
import ProfileAvatar from "../icons/ProfileAvatar";
import { API_URL, fromImageToUrl } from "../utils/urls";

const useOrders = (user, getToken) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const token = await getToken();
          const order_res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await order_res.json();
          const paid = data.filter((order) => order.status === "paid");
          setOrders(paid);
        } catch (err) {
          setOrders([]);
        }
      }
    };

    fetchOrders();
  }, [user]);
  return orders;
};

const AccountMenu = ({ active, handleAccount }) => {
  const { user, logoutUser, getToken } = useContext(AuthContext);

  const orders = useOrders(user, getToken);

  if (user && active) {
    return (
      <div className="w-screen h-screen fixed bg-white top-0 flex flex-col p-6 lg:pr-28">
        <div className="flex justify-between">
          <Link href="/">
            <a onClick={handleAccount}>
              <h1 className="text-2xl font-light">
                <strong>Hook Grip</strong> Tech
              </h1>
            </a>
          </Link>

          <button onClick={handleAccount}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19.707"
              height="19.707"
              viewBox="0 0 19.707 19.707"
              className="mr-1"
            >
              <line
                id="Line_1"
                data-name="Line 1"
                x1="19"
                y2="19"
                transform="translate(0.354 0.354)"
                fill="none"
                stroke="#707070"
                stroke-width="2"
              />
              <line
                id="Line_2"
                data-name="Line 2"
                x1="19"
                y2="19"
                transform="translate(19.354 0.354) rotate(90)"
                fill="none"
                stroke="#707070"
                stroke-width="2"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center my-4">
          {user.avatar ? (
            <img alt="User Avatar" src={fromImageToUrl(user.avatar)} />
          ) : (
            <ProfileAvatar />
          )}

          <h1 className="my-4">
            Hello<p>{user.email}</p>
          </h1>
          <button href="#" className="w-36 h-10 border" onClick={logoutUser}>
            Logout
          </button>
        </div>
        <div>
          <h1 className="text-3xl mb-4">My Courses</h1>
          <div className="flex overflow-y-hidden right-0 gradient-mask-r-70%">
            {orders.map((order) => (
              <div key={order.id} className="mr-4" onClick={handleAccount}>
                <CourseScroller course={order.course} />
              </div>
            ))}
          </div>
          <h1 className="text-3xl my-4">My Curriculums</h1>
        </div>
      </div>
    );
  } else return false;
};

export default AccountMenu;
