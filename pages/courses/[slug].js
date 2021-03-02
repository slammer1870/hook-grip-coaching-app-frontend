import PropTypes from 'prop-types';
import { API_URL } from '../../utils/urls';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import BuyButton from '../../components/BuyButton';
import BuyCourse from '../../components/BuyCourse';
import styles from '../../styles/Course.module.css';


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
            <div className="p-8 flex flex-col justify-center items-center">
                <svg
                    class="animate-pulse"
                    xmlns="http://www.w3.org/2000/svg"
                    width="152.88"
                    height="89.892"
                    viewBox="0 0 50.096 29.964">
                    <g id="Group_1" data-name="Group 1" transform="translate(-875.904 -422.836)">
                        <path
                            id="Path_2"
                            data-name="Path 2"
                            d="M925.376,452.8h-6.109l-6.312-9.672-6.309,9.67H875.9a1.469,1.469,0,0,1,.1-.49c1.043-1.585,2.146-3.131,3.139-4.746,1.163-1.892,2.427-3.717,3.611-5.594.411-.652.832-1.3,1.235-1.927h14.583l.984-1.493-4.187-6.492c-1.2,1.56-2.129,3.237-3.2,4.8h-5.926a1.474,1.474,0,0,1,.1-.49c1.27-1.928,2.614-3.811,3.811-5.782.852-1.4,1.857-2.7,2.64-4.154.521-.964,1.222-1.83,1.837-2.744.166-.247.311-.509.5-.812.236-.114.45.03.588.264.908,1.537,1.942,2.992,2.9,4.494.753,1.181,1.578,2.316,2.291,3.516.687,1.158,1.471,2.246,2.19,3.379.866,1.364,1.745,2.72,2.616,4.077l-4.02,6.144H887.072l-2.088,3.168a1.134,1.134,0,0,0,.1.13.127.127,0,0,0,.071.038c6.1,0,12.2,0,18.354,0a7.149,7.149,0,0,0,1.138-1.575c.967-1.433,1.936-2.868,2.84-4.341.661-1.077,1.367-2.121,2.071-3.168.122-.182.243-.364.359-.539L899.777,422.92c-.013.014,0-.011.027-.026a.144.144,0,0,1,.075-.028c1.956,0,3.911,0,5.961,0q3.532,5.364,7.1,10.886l7.1-10.87H926c.01.531-.387.847-.621,1.215-1.046,1.645-2.142,3.26-3.214,4.889q-1.765,2.683-3.52,5.372c-.881,1.355-1.748,2.718-2.628,4.088Z"
                            fill="#2e2e2e"
                        />
                    </g>
                </svg>
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
