import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import ProfileAvatar from '../../icons/ProfileAvatar';
import { fromImageToUrl } from '../../utils/urls';

export default function Account() {
    const { user, logoutUser } = useContext(AuthContext);

    if (!user) {
        return (
            <div>
                <a href="/">Please click here to log in</a>
            </div>
        );
    }

    return (
        <div className="w-screen h-96 flex flex-col items-center p-6 justify-between">
            <div>
                {user.avatar ? (
                    <img alt="avatar" src={fromImageToUrl(user.avatar)} />
                ) : (
                    <ProfileAvatar />
                )}
            </div>
            <h1>
                Hello<p>{user.email}</p>
            </h1>
            <button href="#" className="w-40 h-10 border" onClick={logoutUser}>
                Logout
            </button>
            <h1 className="text-3xl">My Courses</h1>
            <h1 className="text-3xl">My Curriculums</h1>
        </div>
    );
}
