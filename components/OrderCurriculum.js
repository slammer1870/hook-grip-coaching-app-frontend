import Link from 'next/link';
import PropTypes from 'prop-types';
import { fromImageToUrl } from '../utils/urls';


const OrderCurriculum = ({ user, active }) => {
    return (
                <div className="flex flex-col border w-72 h-auto m-auto my-6">
                    <img alt={article.title} src={fromImageToUrl(article.image)} />
                    <div className="p-4">
                        <h4 className="text-xs uppercase mr-2 mb-2 font-thin text-blue-400">
                            {article.tag}
                        </h4>
                        <h1 className="text-xl mb-1">{article.title}</h1>
                        <p className="text-sm">{article.description}</p>
                    </div>
                </div>
    );
};

OrderCurriculum.propTypes = {
    curriculum: PropTypes.shape({
        description: PropTypes.string
    })
};

export default OrderCurriculum;
