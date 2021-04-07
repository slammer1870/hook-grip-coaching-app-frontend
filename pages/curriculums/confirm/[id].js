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

  const redirect = () => {
    router.push({
      pathname: "/curriculums",
      query: { redirect: "true" },
    });
  };

  return (
    <div className="flex p-6 top-0 left-0 w-screen h-screen fixed bg-black bg-opacity-75 z-10 ">
      <Link href="/curriculums">
        <button className="w-screen h-screen absolute"></button>
      </Link>
      <div className="h-auto w-full max-w-screen-sm p-6 bg-gray-100 mx-auto my-auto z-20 relative">
        <div class="flex relative w-3/4 sm:items-center md:w-2/3 mx-auto">
          <div class="w-full h-6 absolute inset-0 flex items-center justify-center">
            <div class="w-full ml-6 h-1 bg-gray-200 pointer-events-none"></div>
            <div class="flex-shrink-0 w-6 h-6 rounded-full inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm"></div>
          </div>
          <button onClick={redirect}>
            <div class="flex-shrink-0 w-6 h-6 rounded-full inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm opacity-50"></div>
          </button>
        </div>
        <div className="h-6 w-10/12 md:w-3/4 flex justify-between bg-gray-100 max-w-screen-sm bg-white mx-auto my-auto z-20 relative">
          <h1 className="opacity-50">Schedule</h1>
          <h1>Confirm</h1>
        </div>
        <label className="block my-4">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            className="form-input mt-1 py-2 px-5 mx-autoblock w-full bg-gray-100 placeholder-black"
            placeholder={curriculum.name}
            readOnly="readonly"
          />
        </label>
        <label className="block my-4">
          <span className="text-gray-700">Email</span>
          <input
            type="text"
            className="form-input mt-1 py-2 px-5 block w-full bg-gray-100 placeholder-black"
            placeholder={curriculum.user.email}
            readOnly="readonly"
          />
        </label>
        <label className="block my-4">
          <span className="text-gray-700">Time</span>
          <input
            type="text"
            className="form-input mt-1 py-2 px-5 block w-full bg-gray-100 placeholder-black"
            placeholder={new Date(curriculum.timeslot.date).toUTCString()}
            readOnly="readonly"
          />
        </label>
        <div className="mt-2">
          <BuyButton product={curriculum} />
        </div>
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
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const curricula_paths = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/curricula?_limit=-1`
  );
  const curricula = await curricula_paths.json();

  return {
    paths: curricula.map((curriculum) => ({
      params: { id: String(curriculum.id) },
    })),
    fallback: true,
  };
}
