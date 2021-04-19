import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const useOrder = (session_id) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(null);

  const { getToken, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const fetchOrder = async () => {
        setLoading(true);
        try {
          const token = await getToken();
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/confirm`, {
            method: "POST",
            body: JSON.stringify({ checkout_session: session_id }),
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();
          setOrder(data);
        } catch (err) {
          setOrder(null);
        }
        setLoading(false);
      };
      fetchOrder();
    }
  }, [user]);

  return { order, loading };
};

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;
  const { order, loading } = useOrder(session_id);
  console.log(order);

  useEffect(() => {
    if (order && !loading) {
      if(order.course.slug){
      router.push(`/courses/${order.course.slug}`);}
      if(order.curriculum.id){
        router.push(`/curriculums/${order.curriculum.id}`);
      }
    }
  }, [order, loading]);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <FontAwesomeIcon icon={faCircleNotch} size="6x" spin />
      <h2></h2>
      {loading && (
        <h2 className="text-4xl mt-4 animate-pulse">
          Were confirming your purchase!
        </h2>
      )}
      {!loading && order && (
        <h2 className="text-4xl mt-4 animate-pulse">
          Your order was processed successfully
        </h2>
      )}
    </div>
  );
}
