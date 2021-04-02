import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import { fromImageToUrl } from "../../utils/urls";

const ArticleContent = ({ article }) => {
  return (
    <div className="prose p-6 max-w-screen-md mx-auto">
      <img alt={article.title} src={fromImageToUrl(article.image)} />
      <h1>{article.title}</h1>
      <ReactMarkdown source={article.content} escapeHtml={false} />
    </div>
  );
};

ArticleContent.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    contents: PropTypes.string,
  }),
};

export default ArticleContent;

export async function getStaticProps({ params: { slug } }) {
  const article_res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/?slug=${slug}`
  );
  const found = await article_res.json();

  return {
    props: {
      article: found[0],
    },
  };
}

export async function getStaticPaths() {
  const article_paths = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles`
  );
  const articles = await article_paths.json();

  return {
    paths: articles.map((article) => ({
      params: { slug: String(article.slug) },
    })),
    fallback: false,
  };
}
