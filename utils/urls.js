export const fromImageToUrl = (image) => {
    if (!image) {
        return '/vercel.svg';
    }

    if (image.url.indexOf('/') === 0) {
        return `${API_URL}${image.url}`;
    }
    else return image.url
};
