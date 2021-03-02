export async function getStaticProps() {
    const articles = await (await fetch(`${API_URL}/article_categories/`)).json();

    return {
        props: {
            categories
        }
    };
}