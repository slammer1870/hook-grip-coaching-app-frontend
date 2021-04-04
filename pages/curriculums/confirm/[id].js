import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import BuyButton from "../../../components/BuyButton";
import Link from "next/link";
import PropTypes from "prop-types";

export default function Confirm({ curriculum }) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return (
      <div className="flex p-6 top-0 left-0 w-screen h-screen fixed bg-black bg-opacity-75 z-10 ">
        <Link href="/curriculums">
          <button className="w-screen h-screen absolute"></button>
        </Link>
        <div className="h-80 w-full max-w-screen-sm p-6 bg-white mx-auto my-auto z-20 relative">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (curriculum.order && curriculum.order.status === "paid") {
      router.push(`/curriculums/${curriculum.id}`);
    }
  });

  return (
    <div className="flex p-6 top-0 left-0 w-screen h-screen fixed bg-black bg-opacity-75 z-10 ">
      <Link href="/curriculums">
        <button className="w-screen h-screen absolute"></button>
      </Link>
      <div className="h-80 w-full max-w-screen-sm p-6 bg-white mx-auto my-auto z-20 relative">
        <h1>Confirm your order</h1>
        <p>{curriculum.timeslot.date}</p>
        <BuyButton product={curriculum} />
      </div>
    </div>
  );
}

Confirm.propTypes = {
  curriculum: PropTypes.shape({
    order: PropTypes.shape({
      id: PropTypes.number,
    }),
    timeslot: PropTypes.shape({
      date: PropTypes.string,
    }),
  }),
};

export async function getStaticProps({ params: { id } }) {
  const curriculum_res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/curricula/?id=${id}`
  );
  const found = await curriculum_res.json();

  return {
    props: {
      curriculum: found[0],
    },
  };
}

export async function getStaticPaths() {
  const curricula_paths = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/curricula`
  );
  const curricula = await curricula_paths.json();

  return {
    paths: curricula.map((curriculum) => ({
      params: { id: String(curriculum.id) },
    })),
    fallback: true,
  };
}
