export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

<<<<<<< HEAD
export const MAGIC_PUBLIC_KEY = process.env.MAGIC_PUBLIC_KEY || 'pk_test_2A97D22CB16C023D';

export const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PK || 'pk_test_qWW9hfd5OAlI6PCydV4hSw7E';
=======
export const MAGIC_PUBLIC_KEY = process.env.MAGIC_PUBLIC_KEY || 'Your Magic Test Key goes Here';

export const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PK || 'Your Stripe Test Key goes Here';
>>>>>>> ba398a967b269625a4765c67b735b096315a69ae

export const fromImageToUrl = (image) => {
    if (!image) {
        return '/vercel.svg';
    }

    if (image.url.indexOf('/') === 0) {
        return `${API_URL}${image.url}`;
    }
    else return image.url
};
