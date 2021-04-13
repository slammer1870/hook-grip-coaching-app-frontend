import { useState, useEffect } from "react"

export const useOrders = (user, getToken) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchOrders = async () => {
        if (user) {
          try {
            setLoading(true);
            const token = await getToken();
            const order_res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/orders`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const data = await order_res.json();
            const paid = data.filter((order) => order.status === "paid");
            setOrders(paid);
          } catch (err) {
            setOrders([]);
          }
          setLoading(false);
        }
      };
  
      fetchOrders();
    }, [user]);
    return { orders, loading };
  };

  export default useOrders;