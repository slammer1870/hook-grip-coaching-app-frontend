export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const MAGIC_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAGIC_PK;

export const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PK;

export const fromImageToUrl = (image) => {
    if (!image) {
        return '/vercel.svg';
    }

    if (image.url.indexOf('/') === 0) {
        return `${API_URL}${image.url}`;
    }
    else return image.url
};
