
const CourseChapters = ({ chapters }) => {
    return (
        <Link href={`/user/articles/${article.slug}`}>
            <a href={`/user/articles/${article.slug}`}>
                <div className="flex flex-col border w-72 h-72 m-auto mb-12">
                    <img alt={article.title} src={article.image.url} />
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