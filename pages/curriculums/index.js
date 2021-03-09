import { useRouter } from "next/router";
import { useState } from 'react';
import BuyButton from "../../components/BuyButton";
import OrderCurriculum from "../../components/OrderCurriculum";

export default function Curriculums() {
  const [active, setActive] = useState(false);

  const accountActive = () => {
    if (!active) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  const router = useRouter();

  const path = router.pathname;

  return (
    <div className="container p-6">
      <h1 className="text-4xl mb-4">Curriculums</h1>
      <p className="mb-4">
        Curriclums allow you to provide personalised coaching straight to your
        clients in a customisable video course format.
      </p>
      <p className="mb-4">
        Curriculums are purchased and scheduled right here!
      </p>
      <button className="w-36 h-56 bg-gray-200" onClick={accountActive}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          className="mx-auto"
        >
          <defs>
            <clipPath id="clip-path">
              <rect width="40" height="40" fill="none" />
            </clipPath>
            <clipPath id="clip-path-2">
              <rect width="16" height="15.999" fill="none" />
            </clipPath>
          </defs>
          <g id="_" data-name="+" clip-path="url(#clip-path)">
            <circle
              id="Ellipse_226"
              data-name="Ellipse 226"
              cx="20"
              cy="20"
              r="20"
              fill="#2699fb"
            />
            <g
              id="_2"
              data-name="+"
              transform="translate(12 12)"
              clip-path="url(#clip-path-2)"
            >
              <path
                id="Union_1"
                data-name="Union 1"
                d="M-4613,16V9h-7V7h7V0h2V7h7V9h-7v7Z"
                transform="translate(4620)"
                fill="#fff"
              />
            </g>
          </g>
        </svg>
      </button>
      <OrderCurriculum active={active} handlerOrder={accountActive} />
    </div>
  );
}
