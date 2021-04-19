import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import BuyButton from "../../components/BuyButton";
import OrderCurriculum from "../../components/OrderCurriculum";
import AuthContext from "../../context/AuthContext";
import { useOrders } from "../../lib/api";
import CurriculumScroller from "../../components/CourseScroller";
import CurriculumGrid from "../../components/CurriculumGrid";

const Curriculums = ({ timeslots }) => {
  const [active, setActive] = useState();

  const { user, getToken } = useContext(AuthContext);

  const { orders, loading } = useOrders(user, getToken);

  console.log("orders are", orders);

  const accountActive = () => {
    if (!active) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  return (
    <div className="flex w-full">
      <div className="p-6">
        <h1 className="text-4xl mb-4">Curriculums</h1>
        <p className="mb-4">
          Curriculums allow you to provide personalised coaching straight to
          your clients in a customisable video course format.
        </p>
        <p className="mb-4">
          Curriculums are purchased and scheduled right here!
        </p>
        <div>
          <CurriculumGrid makeActive={accountActive} />
        </div>

        <OrderCurriculum
          active={active}
          handlerOrder={accountActive}
          timeslots={timeslots}
        />
      </div>
    </div>
  );
};

export default Curriculums;

export async function getServerSideProps() {
  const timeslots = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/timeslots`
  ).then((r) => r.json());

  return {
    props: {
      timeslots,
    },
  };
}
