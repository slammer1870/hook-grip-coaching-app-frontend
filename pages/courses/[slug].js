import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import BuyCourse from "../../components/BuyCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const useOrders = (user, getToken) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          setLoading(true);
          const token = await getToken();
          const order_res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await order_res.json();
          setOrders(data);
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

const CourseContent = ({ course }) => {
  //Sets the Url of the video in the videoplayer
  const [video, setVideo] = useState();

  const [bought, setBought] = useState();

  const handleClick = (e) => {
    setVideo(e.target.value);
  };

  const { user, getToken } = useContext(AuthContext);

  const { orders, loading } = useOrders(user, getToken);

  useEffect(() => {
    if (
      orders.some(
        (order) =>
          order.course != null &&
          order.course.title === course.title &&
          order.status === "paid"
      )
    ) {
      setBought(true);
    }
  });

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center w-screen h-screen">
        <FontAwesomeIcon icon={faCircleNotch} size="6x" spin />
        <h2 className="text-4xl mt-4 animate-pulse">Loading</h2>
      </div>
    );
  }

  if (bought) {
    return (
      <div className="p-6 items-center max-w-screen-lg mx-auto">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={video ? video : course.chapter[0].lesson[0].url}
              width="640" height="360"
              frameBorder="0"
              className=""
              allow="autoplay; fullscreen;"
              allowFullScreen
            ></iframe>
          </div>
          <ul className="py-3">
            {course.chapter.map((chapter) => (
              <li key={chapter.id}>
                <h2 className="text-2xl p-3 bg-gray-400 text-white mb-1">{chapter.title}</h2>
                <ul>
                  {chapter.lesson.map((lesson) => (
                    <li key={lesson.id}>
                      <button value={lesson.url} className={video === lesson.url ? "bg-gray-300 w-full text-left p-3 mb-1" : "bg-gray-100 w-full text-left p-3 mb-1"} onClick={handleClick}>
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
  } else if (user && !bought) {
    return (
      <div>
        <BuyCourse course={course} />
      </div>
    );
  } else return false;
};

CourseContent.propTypes = {
  course: PropTypes.shape({
    title: PropTypes.string,
    contents: PropTypes.string,
  }),
};

export default CourseContent;

export async function getStaticProps({ params: { slug } }) {
  const course_res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/?slug=${slug}`);
  const found = await course_res.json();

  return {
    props: {
      course: found[0],
    },
  };
}

export async function getStaticPaths() {
  const course_paths = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
  const courses = await course_paths.json();

  return {
    paths: courses.map((course) => ({
      params: { slug: String(course.slug) },
    })),
    fallback: false,
  };
}
