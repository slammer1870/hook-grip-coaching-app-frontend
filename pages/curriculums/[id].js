import { useRouter } from "next/router";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

const useCurriculum = (user, getToken) => {
  const [curriculum, setCurriculum] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchCurriculum = async () => {
      if (user) {
        try {
          setLoading(true);
          const token = await getToken();
          const curriculum_res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/curricula/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await curriculum_res.json();
          console.log(data);
          setCurriculum(data);
        } catch (err) {
          setCurriculum();
        }
        setLoading(false);
      }
    };
    fetchCurriculum();
  }, [user]);
  return { curriculum, loading };
};

const CurriculumContent = () => {
  const { user, getToken } = useContext(AuthContext);

  const { curriculum, loading } = useCurriculum(user, getToken);

  if (loading) {
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

  if (!loading && curriculum.timeslot !== undefined) {
    return (
      <div className="flex p-6 top-0 left-20 w-screen h-screen fixed bg-black bg-opacity-75 z-10 ">
        <div className="h-auto w-full max-w-screen-sm p-6 bg-white mx-auto my-auto z-20 relative">
          <div className="p-6 items-center max-w-screen-lg mx-auto">
            <h1 className="my-4 text-3xl">
              Hey {curriculum.name}, thank you for booking with us!
            </h1>
            <p className="my-4">
              Your Zoom Call is scheduled for: <br />
              <br />
              {String(new Date(curriculum.timeslot.date))}
            </p>
            <p className="my-4">Your meeting url is: </p>
            <a className="my-4 text-blue-600" href={curriculum.meeting_url}>
              {curriculum.meeting_url}
            </a>
            <p className="my-4">
              Once you have done your consultation, your curriculum will appear
              on this page!
            </p>
          </div>
        </div>
      </div>
    );
  }
  return <h1>Curriculum does not exist</h1>;
};

export default CurriculumContent;
