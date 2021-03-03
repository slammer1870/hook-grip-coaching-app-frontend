import PropTypes from 'prop-types';
import { useState } from 'react';
import AccountMenu from '../components/AccountMenu';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { AuthProvider } from '../context/AuthContext';
import { useRouter } from 'next/router';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
    const [active, setActive] = useState(false);

    const accountActive = () => {
        if (!active) {
            setActive(true);
        } else {
            setActive(false);
        }
    };

    const router = useRouter();

    const path = router.pathname;

    return (
        <AuthProvider>
            <main className="flex flex-col w-screen h-screen">
                <nav className="top-0 fixed z-10 lg:left-20">
                    <Navbar handleAccount={accountActive} />
                    <AccountMenu active={active} handleAccount={accountActive} />
                </nav>
                <content className="my-20 pb-20 lg:left-20 lg:absolute lg:pr-28 lg:w-full">
                    <Component {...pageProps} />
                </content>
                <nav className="bottom-0 fixed">
                    <BottomNav path={path} />
                </nav>
            </main>
        </AuthProvider>
    );
};

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object
};

export default MyApp;
