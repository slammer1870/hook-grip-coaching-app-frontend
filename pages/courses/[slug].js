import PropTypes from 'prop-types';
import { API_URL } from '../../utils/urls';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import BuyButton from '../../components/BuyButton';
import BuyCourse from '../../components/BuyCourse';
import styles from '../../styles/Course.module.css';
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
                    const order_res = await fetch(`${API_URL}/orders`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
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

    console.log(orders)

    useEffect(() => {
        if (orders.some((order) => order.course != null && order.course.title === course.title && order.status === 'paid')) {
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
            <div className="container p-6 items-center mx-auto">
                <div className={styles.videoPlayer}>
                    <iframe
                        src={video ? video : course.chapter[0].lesson[0].url}
                        width="640"
                        height="360"
                        className="inset-0 w-full h-full absolute"
                        frameBorder="0"
                        allow="autoplay; fullscreen;"
                        allowFullScreen></iframe>
                </div>
                <ul className="py-3">
                    {course.chapter.map((chapter) => (
                        <li key={chapter.id}>
                            <h2 className="text-2xl p-3 bg-gray-400">{chapter.title}</h2>
                            <ul>
                                {chapter.lesson.map((lesson) => (
                                    <li className="bg-gray-100 p-3 mt-1" key={lesson.id}>
                                        <button value={lesson.url} onClick={handleClick}>
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
    course: PropTypes.shape({ title: PropTypes.string, contents: PropTypes.string })
};

export default CourseContent;

export async function getStaticProps({ params: { slug } }) {
    const course_res = await fetch(`${API_URL}/courses/?slug=${slug}`);
    const found = await course_res.json();

    return {
        props: {
            course: found[0]
        }
    };
}

export async function getStaticPaths() {
    const course_paths = await fetch(`${API_URL}/courses`);
    const courses = await course_paths.json();

    return {
        paths: courses.map((course) => ({
            params: { slug: String(course.slug) }
        })),
        fallback: false
    };
}
