import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';
import SideMenu from './SideMenu';
import { faCode, faHighlighter, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const BottomNav = ({ path }) => {
    const [active, setActive] = useState(false);

    const sideMenuActive = () => {
        if (!active) {
            setActive(true);
        } else {
            setActive(false);
        }
    };

    if (path != '/') {
        return (
            <div className="w-screen flex p-6 justify-between items-center bg-opacity-90 bg-gray-700 lg:w-20 lg:h-screen lg:flex-col lg:justify-around">
                <SideMenu active={active} />
                <Link href="/articles">
                    <a className={path == '/articles' ? '' : 'opacity-30'}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 16 16"
                            className="mx-auto">
                            <defs>
                                <clipPath id="clip-path">
                                    <rect width="16" height="16" fill="none" />
                                </clipPath>
                            </defs>
                            <g id="Messages" clipPath="url(#clip-path)">
                                <rect
                                    id="Rectangle_117"
                                    data-name="Rectangle 117"
                                    width="16"
                                    height="16"
                                    fill="none"
                                />
                                <path
                                    id="Path_50"
                                    data-name="Path 50"
                                    d="M14,2H2L8,7ZM0,2A2.006,2.006,0,0,1,2,0H14a2.006,2.006,0,0,1,2,2v8a2.006,2.006,0,0,1-2,2H2a2.006,2.006,0,0,1-2-2Z"
                                    transform="translate(0 2)"
                                    fill="#fff"
                                    fillRule="evenodd"
                                />
                            </g>
                        </svg>
                        <p className="text-white text-xs">Articles</p>
                    </a>
                </Link>
                <Link href="/courses">
                    <a className={String(path) === '/courses' ? '' : 'opacity-30'}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 16 16"
                            className="mx-auto">
                            <defs>
                                <clipPath id="clip-path">
                                    <rect width="16" height="16" fill="none" />
                                </clipPath>
                            </defs>
                            <g id="Videos" clipPath="url(#clip-path)">
                                <rect
                                    id="Rectangle_312"
                                    data-name="Rectangle 312"
                                    width="16"
                                    height="16"
                                    fill="none"
                                />
                                <path
                                    id="Path_123"
                                    data-name="Path 123"
                                    d="M16,.4V9.733a.287.287,0,0,1-.267.267H15.6c-.133,0-.133,0-.267-.133L12,6.533V9.067c0,.267-.133.4-.267.667a1.43,1.43,0,0,1-.8.267H1.067A1.018,1.018,0,0,1,.4,9.733c-.267-.267-.4-.4-.4-.667v-8A1.018,1.018,0,0,1,.267.4a.95.95,0,0,1,.8-.4h10a1.018,1.018,0,0,1,.667.267,1.9,1.9,0,0,1,.267.8V3.6L15.467.133C15.467,0,15.6,0,15.733,0,15.867.133,16,.133,16,.4Z"
                                    transform="translate(0 3)"
                                    fill="#fff"
                                />
                            </g>
                        </svg>
                        <p className="text-white text-xs">Courses</p>
                    </a>
                </Link>
                <Link href="/curriculums">
                    <a className={String(path) === '/curriculums' ? '' : 'opacity-30'}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 16 16"
                            className="mx-auto">
                            <defs>
                                <clipPath id="clip-path">
                                    <rect width="16" height="16" fill="none" />
                                </clipPath>
                            </defs>
                            <g id="Compose" clipPath="url(#clip-path)">
                                <rect
                                    id="Rectangle_324"
                                    data-name="Rectangle 324"
                                    width="16"
                                    height="16"
                                    fill="none"
                                />
                                <path
                                    id="Path_110"
                                    data-name="Path 110"
                                    d="M8.154,3.077,2.462,8.923,0,16l7.077-2.308L12.769,8Zm7.231-.462-2-2a1.865,1.865,0,0,0-2.769,0L8.923,2.308l4.615,4.769,1.846-1.846A1.95,1.95,0,0,0,16,3.846,1.9,1.9,0,0,0,15.385,2.615Z"
                                    fill="#fff"
                                />
                            </g>
                        </svg>
                        <p className="text-white text-xs">Curriculums</p>
                    </a>
                </Link>
                {/*<button href="#" onClick={sideMenuActive} className="z-20">
                    <svg
                        width="30"
                        height="30"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        className="opacity-90">
                        <defs>
                            <clipPath id="clip-path">
                                <rect width="30" height="30" fill="none" />
                            </clipPath>
                        </defs>
                        <g id="Feed" clipPath="url(#clip-path)">
                            <path
                                id="Path_102"
                                data-name="Path 102"
                                d="M0,14H16v2H0ZM0,7H16v5H0ZM7,0h9V5H7ZM0,0H5V5H0Z"
                                fill="#fff"
                                fillRule="evenodd"
                            />
                        </g>
                    </svg>
        </button>*/}
            </div>
        );
    } else return false;
};

BottomNav.propTypes = {
    path: PropTypes.string.isRequired
};

export default BottomNav;
