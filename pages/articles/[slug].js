import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import styles from '../../styles/Article.module.css';
import { API_URL, fromImageToUrl } from '../../utils/urls';

const ArticleContent = ({ article }) => {
    return (
<<<<<<< HEAD
        <div className="prose p-6 max-w-screen-md mx-auto">
=======
        <div className="prose p-6">
>>>>>>> ba398a967b269625a4765c67b735b096315a69ae
            <h1>{article.title}</h1>
            <img alt={article.title} src={fromImageToUrl(article.image)} />
            <ReactMarkdown source={article.content} escapeHtml={false} />
        </div>
    );
};

ArticleContent.propTypes = {
    article: PropTypes.shape({ title: PropTypes.string, contents: PropTypes.string })
};

export default ArticleContent;

export async function getStaticProps({ params: { slug } }) {
    const article_res = await fetch(`${API_URL}/articles/?slug=${slug}`);
    const found = await article_res.json();

    return {
        props: {
            article: found[0]
        }
    };
}

export async function getStaticPaths() {
    const article_paths = await fetch(`${API_URL}/articles`);
    const articles = await article_paths.json();

    return {
        paths: articles.map((article) => ({
            params: { slug: String(article.slug) }
        })),
        fallback: false
    };
}
