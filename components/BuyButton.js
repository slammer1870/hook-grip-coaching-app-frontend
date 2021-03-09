import { loadStripe } from '@stripe/stripe-js';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

const BuyButton = ({ course }) => {
    
    const { getToken } = useContext(AuthContext);

    const handleBuy = async () => {
        const stripe = await stripePromise;
        const token = await getToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
            method: 'POST',
            body: JSON.stringify({ course }),
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        //working
        const session = await res.json();
        await stripe.redirectToCheckout({
            sessionId: session.id
        });
    };

    return (
        <button
            className="flex bg-blue-400 font-bold text-white w-full py-3 transition duration-300 ease-in-out hover:bg-blue-500 text-center justify-center my-4"
            onClick={handleBuy}>
            BUY NOW
        </button>
    );
};

BuyButton.propTypes = {
    course: PropTypes.object
};

export default BuyButton;
