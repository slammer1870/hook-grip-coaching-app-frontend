import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import styles from '../../styles/Article.module.css';
import { API_URL, fromImageToUrl } from '../../utils/urls';

const ArticleContent = ({ article }) => {
    return (
        <div className="prose p-6">
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
