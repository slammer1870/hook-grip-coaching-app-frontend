import { useRouter } from "next/router";
import PropTypes from "prop-types";
import BuyButton from "../../components/BuyButton";
import CourseScroller from "../../components/CourseScroller";

const Courses = ({ courses, categories }) => {
  const router = useRouter();

  const path = router.pathname;
  return (
    <div>
      <div className="flex flex-col p-6">
        <h1 className="text-4xl mb-4">Courses</h1>
        <p className="mb-4">
          These courses are sample courses and the Stripe Checkout is in test
          mode. If you wish to view a course you can make a test purchase by
          using:
        </p>
        <p className="mb-4">Card Number: 4242 4242 4242 4242</p>
        <p className="mb-4">Expiration Date: 04/24</p>
        <p className="mb-4">CCV: 442</p>

        {categories.map((category) => (
          <div className="overflow-y-hidden" key={category.id}>
            <h1 className="text-3xl mb-4 capitalize">{category.title}</h1>
            <div className="flex overflow-y-scroll gradient-mask-r-70%">
              {courses
                .filter(
                  (course) => course.course_category.title == category.title
                )
                .map((course) => (
                  <div
                    className="flex flex-col justify-center items-center mr-4"
                    key={course.id}
                  >
                    <CourseScroller course={course} />
                    <BuyButton product={course} />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Courses.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      course_category: PropTypes.shape({
        title: PropTypes.string,
      }),
    })
  ),
};

export default Courses;

export async function getStaticProps() {
  const [courses, categories] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/`).then((r) => r.json()),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/course-categories/`).then((r) => r.json()),
  ]);

  return {
    props: {
      courses,
      categories,
    },
  };
}
