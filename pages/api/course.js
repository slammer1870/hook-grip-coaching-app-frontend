import AuthContext from "../../context/AuthContext"
import {useContext} from "react"
import { useRouter } from "next/router"

export default async function getCourse(req, res) {

  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(false);

  const {user, getToken} = useContext(AuthContext)

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
