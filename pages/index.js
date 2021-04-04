import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';

export default function Home() {
    const [email, setEmail] = useState('');
    const { user, loginUser } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        loginUser(email);
    };

    console.log(user)

    const router = useRouter();

    if (user) {
        router.push('/articles');
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mt-40">
                <h1 className="text-gray-800 text-5xl tracking-wider mb-6">
                    <strong>Hook Grip</strong> Tech
                </h1>
                <form onSubmit={handleSubmit}>
                    <p className="mb-6 mt-3 font-thin">Enter your email to create your account and access</p>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email Address"
                        className="border border-gray-500 rounded p-2 w-full"></input>
                    <button className="bg-gray-500 p-2 rounded text-white mt-3 w-full">
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
}
