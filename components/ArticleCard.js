import Link from 'next/link';
import PropTypes from 'prop-types';
import { fromImageToUrl } from '../utils/urls';


const ArticleCard = ({ article }) => {
    return (
        <Link href={`/articles/${article.slug}`}>
            <a>
                <div className="flex flex-col border w-72 h-96 my-6">
                    <div className="flex h-40 w-full items-center justify-center overflow-hidden">
                        <img alt={article.title} src={fromImageToUrl(article.image)}  />
                    </div>
                    <div className="p-4">
                        <h4 className="text-xs uppercase mr-2 mb-2 font-thin text-blue-400">
                            {article.tag}
                        </h4>
                        <h1 className="text-xl mb-1">{article.title}</h1>
                        <p className="text-sm">{article.description}</p>
                    </div>
                </div>
            </a>
        </Link>
    );
};

ArticleCard.propTypes = {
    article: PropTypes.shape({
        slug: PropTypes.string,
        title: PropTypes.string,
        thumbnail: PropTypes.shape({ url: PropTypes.string }),
        tag: PropTypes.string,
        description: PropTypes.string
    })
};

export default ArticleCard;
