import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";



export default function Confirm() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <FontAwesomeIcon icon={faCircleNotch} size="6x" spin />
    </div>
  );
}