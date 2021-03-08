import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useState } from "react";
import ArticleCard from "../../components/ArticleCard";
import BottomNav from "../../components/BottomNav";
import Slider from "../../components/Slider";
import { API_URL } from "../../utils/urls";

const Article = ({ articles, categories }) => {
  //const categories = ['guard', 'passing', 'submissions', 'defence'];

  const [count, setCount] = useState(0);

  // Create handleIncrement event handler
  const handleIncrement = () => {
    if (count < categories.length - 1) {
      setCount((prevCount) => prevCount + 1);
    } else {
      setCount(0);
    }
  };

  //Create handleDecrement event handler
  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    } else {
      setCount(categories.length - 1);
    }
  };

  const router = useRouter();

  const path = router.pathname;

  return (
    <div className="">
      <div className="max-w-screen-sm mx-auto">
        <Slider
          handleDecrement={handleDecrement}
          categories={categories}
          count={count}
          handleIncrement={handleIncrement}
        />
      </div>
        <div className="flex flex-wrap">
          {articles
            .filter(
              (article) =>
                article.article_category.title === categories[count].title
            )
            .map((article) => (
              <div className="mx-auto lg:mx-5">
                <ArticleCard key={article.id} article={article} />
              </div>
            ))}
        </div>
      </div>
  );
};

Article.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      category: PropTypes.shape({
        name: PropTypes.string,
      }),
    })
  ),
};

export default Article;

export async function getStaticProps() {
  const [articles, categories] = await Promise.all([
    fetch(`${API_URL}/articles/`).then((r) => r.json()),
    fetch(`${API_URL}/article-categories/`).then((r) => r.json()),
  ]);

  return {
    props: {
      articles,
      categories,
    },
  };
}
