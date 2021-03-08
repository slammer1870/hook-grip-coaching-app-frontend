import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
<<<<<<< HEAD
import Logo from '../icons/Logo';
=======
import ExecLogo from '../icons/ExecLogo';
>>>>>>> ba398a967b269625a4765c67b735b096315a69ae
import Link from 'next/link';

const Navbar = ({ handleAccount }) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const path = router.pathname;
    const goToLink = path !== '/' ? path : '/';

    return (
<<<<<<< HEAD
        <div className="w-screen flex p-6 justify-between bg-white lg:pr-28">
            <Link href="/">
                <a>
                    <Logo />
=======
        <div className="w-screen flex p-6 justify-between bg-white">
            <Link href="/">
                <a>
                    <ExecLogo />
>>>>>>> ba398a967b269625a4765c67b735b096315a69ae
                </a>
            </Link>
            <div>
                {user ? (
                    <button href="#" onClick={handleAccount}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="29"
                            height="29"
                            viewBox="0 0 16 16">
                            <path
                                id="Union_5"
                                data-name="Union 5"
                                d="M0,370v-2c0-2.2,3.6-4,8-4s8,1.8,8,4v2Zm4-12a4,4,0,1,1,4,4A4,4,0,0,1,4,358Z"
                                transform="translate(0 -354)"
                                fill="#2e2e2e"
                            />
                        </svg>
                    </button>
                ) : (
<<<<<<< HEAD
                    <Link href="/">
                    <button className="border p-1 w-20">Sign In</button></Link>
=======
                    <button className="border p-1 w-20">Sign In</button>
>>>>>>> ba398a967b269625a4765c67b735b096315a69ae
                )}
            </div>
        </div>
    );
};

Navbar.propTypes = {
    handleAccount: PropTypes.func
};

export default Navbar;
