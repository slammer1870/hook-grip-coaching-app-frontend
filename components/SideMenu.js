import PropTypes from 'prop-types';

const SideMenu = ({ active, sideMenuActive }) => {
    if (active) {
        return (
            <div className="absolute">
                <div className="w-screen h-screen bg-black fixed opacity-50 top-0 right-0 z-10"></div>
                <div className="w-5/12 h-full flex flex-col left-0  bottom-0 fixed z-20 bg-gray-700 p-6 text-white">
                    <h1 className="text-2xl font-thin mb-12">
                        <strong>EXECBJJ</strong> ONLINE
                    </h1>
                    <ul className="left-0">
                        <li className="mb-4">Home</li>
                        <li className="mb-4">About</li>
                        <li className="mb-4">Contact</li>
                    </ul>
                </div>
            </div>
        );
    } else return false;
};

SideMenu.propTypes = {
    active: PropTypes.bool.isRequired,
    sideMenuActive: PropTypes.func
};

export default SideMenu;
