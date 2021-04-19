import { Magic } from 'magic-sdk';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

let magic;

export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const loginUser = async (email) => {
        try {
            await magic.auth.loginWithMagicLink({ email });
            setUser({ email });
            router.push('/articles');
        } catch (err) {
            setUser(null);
        }
    };

    const logoutUser = async () => {
        try {
            await magic.user.logout();
            setUser(null);
            router.push('/');
        } catch (err) {
            console.error(err.message);
        }
    };

    const checkUserLoggedIn = async () => {
        try {
            const isLoggedIn = await magic.user.isLoggedIn();

            if (isLoggedIn) {
                const { email } = await magic.user.getMetadata();
                setUser({ email });

                const token = await getToken()
            }
            else{
                router.push('/')
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const getToken = async () => {
        try {
            const token = await magic.user.getIdToken();
            return token;
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PK);

        checkUserLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser, getToken }}>
            {props.children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.object
};

export default AuthContext;
