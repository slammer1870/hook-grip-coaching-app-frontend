import { loadStripe } from "@stripe/stripe-js";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

const BuyButton = ({ product }) => {
  const { getToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const token = await getToken();
    console.log(product)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      method: "POST",
      body: JSON.stringify({
        product
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    //working
    const session = await res.json();
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    setLoading(false);
  };

  return (
    <button
      className="flex bg-blue-400 font-bold text-white w-full p-3 transition duration-300 ease-in-out hover:bg-blue-500 text-center justify-center items-center h-12 my-4"
      onClick={handleBuy}
    >
      {!loading && <p>BUY NOW</p>}
      {loading && <FontAwesomeIcon icon={faCircleNotch} spin />}
    </button>
  );
};

BuyButton.propTypes = {
  product: PropTypes.object,
};

export default BuyButton;
