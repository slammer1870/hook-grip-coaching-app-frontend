import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { fromImageToUrl } from "../utils/urls";

const useCurricula = (user, getToken) => {
  const [curricula, setCurricula] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCurricula = async () => {
      if (user) {
        try {
          setLoading(true);
          const token = await getToken();
          const curricula_res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/curricula`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await curricula_res.json();
          setCurricula(data);
        } catch (err) {
          setCurricula([]);
        }
        setLoading(false);
      }
    };
    fetchCurricula();
  }, [user]);
  return { curricula, loading };
};

const CurriculumGrid = ({ makeActive }) => {
  const { user, getToken } = useContext(AuthContext);

  const { curricula, loading } = useCurricula(user, getToken);

  return (
    <div className="flex flex-wrap w-full">
      {loading && (
        <div className="mr-4 h-60 items-center justify-center w-full">
          <div className="flex flex-col items-center p-6">
            <FontAwesomeIcon icon={faCircleNotch} size="6x" spin />
            <h2 className="text-4xl mt-4 animate-pulse">Loading...</h2>
          </div>
        </div>
      )}
      {!loading && (
        <div className="flex flex-wrap">
          {curricula.map((curriculum) => (
            <div
              key={curriculum.id}
              className="w-36 h-56 bg-gray-200 mr-4 mb-4"
            >
              <a href={`/curriculums/${curriculum.id}`}>
                <div className="flex h-full w-full items-center justify-center overflow-hidden relative">
                  <img
                    alt={curriculum.title}
                    src={fromImageToUrl(curriculum.thumbnail)}
                    className="top-0 absolute"
                  />
                  <div className="p-2 flex flex-col justify-between">
                    <div>
                      <h1 className="text-xl mb-1">
                        {curriculum.name}'s curriculum
                      </h1>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
          <button className="w-36 h-56 bg-gray-200" onClick={makeActive}>
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
        </div>
      )}
    </div>
  );
};

export default CurriculumGrid;
