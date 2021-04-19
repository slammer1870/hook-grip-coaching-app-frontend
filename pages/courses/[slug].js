import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import BuyCourse from "../../components/BuyCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const useCourse = (user, getToken) => {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const fetchCourse = async () => {
      if (user) {
        try {
          setLoading(true);
          const token = await getToken();
          const course_res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/courses/?slug=${slug}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await course_res.json();
          console.log(data);
          setCourse(data);
        } catch (err) {
          setCourse();
        }
        setLoading(false);
      }
    };
    fetchCourse();
  }, [user]);
  return { course, loading };
};

const CourseContent = () => {
  const { user, getToken } = useContext(AuthContext);

  const { course, loading } = useCourse(user, getToken);

  const realCourse = course[0];

  console.log(realCourse);

  //Sets the Url of the video in the videoplayer
  const [video, setVideo] = useState();

  const handleClick = (e) => {
    setVideo(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center w-screen h-screen">
        <FontAwesomeIcon icon={faCircleNotch} size="6x" spin />
        <h2 className="text-4xl mt-4 animate-pulse">Loading...</h2>
      </div>
    );
  }
  if (!loading && realCourse && realCourse.chapter) {
    return (
      <div className="p-6 items-center max-w-screen-lg mx-auto">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={video ? video : realCourse.chapter[0].lesson[0].url}
            width="640"
            height="360"
            frameBorder="0"
            className=""
            allow="autoplay; fullscreen;"
            allowFullScreen
          ></iframe>
        </div>
        <ul className="py-3">
          {realCourse.chapter.map((chapter) => (
            <li key={chapter.id}>
              <h2 className="text-2xl p-3 bg-gray-400 text-white mb-1">
                {chapter.title}
              </h2>
              <ul>
                {chapter.lesson.map((lesson) => (
                  <li key={lesson.id}>
                    <button
                      value={lesson.url}
                      className={
                        video === lesson.url
                          ? "bg-gray-300 w-full text-left p-3 mb-1"
                          : "bg-gray-100 w-full text-left p-3 mb-1"
                      }
                      onClick={handleClick}
                    >
                      {lesson.name}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (!loading && realCourse && !realCourse.chapter) {
    return (
      <div className="p-6">
        <BuyCourse course={realCourse} />
      </div>
    );
  }
  if (!loading && !realCourse && user) {
    return (
      <div className="p-6">
        <h1>Course does not exist</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

CourseContent.propTypes = {
  course: PropTypes.shape({
    title: PropTypes.string,
    contents: PropTypes.string,
  }),
};

export default CourseContent;
