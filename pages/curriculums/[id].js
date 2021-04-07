import {useRouter} from 'next/router'
import Link from 'next/link'

const CurriculumContent = ({ curriculum }) => {
  
  const router = useRouter()

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

  return (
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
        Once you have done your consultation, your curriculum will appear on
        this page!
      </p>
    </div>
  );
};

export default CurriculumContent;

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
