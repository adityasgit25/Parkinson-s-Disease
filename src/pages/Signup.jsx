import React from "react";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import  app  from "../firebase";
import { useNavigate, Link } from 'react-router-dom';
import Dashboard from "./Dashboard";
import SuccessAnimation from "../SuccessAnimation";
import NeuralNetworkAnimation from "../NeuralNetworkAnimation";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Signup = () => {
    // console.log("hii");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // const createUser = () => {
    //     createUserWithEmailAndPassword(auth, email, password)
    //     .then(() => {
    //         alert("Sign-up successful");
    //         navigate('/dashboard');  // Navigate only after successful sign-up
    //     })
    //     .catch(error => {
    //         console.error("Error during sign-up: ", error.message);
    //         alert("Sign-up failed: " + error.message);
    //     });
    // }
    const createUser = () => {
        setIsLoading(true); // Show loading animation
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                // Wait for the animation to complete before navigating
                setTimeout(() => {
                    navigate('/dashboard'); // Navigate after showing animation
                }, 1500); // Match duration with the animation
            })
            .catch(error => {
                console.error("Error during sign-up: ", error.message);
                alert("Sign-up failed: " + error.message);
                setIsLoading(false); // Hide loading animation on error
            });
    };
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then(() => {
            navigate('/dashboard');  // Redirect on successful Google sign-in
        })
        .catch(error => {
            console.error("Error during Google sign-in: ", error.message);
            alert("Google sign-in failed: " + error.message);
        });
    }
    // return (
    //     <div className="signup-page">
    //         <label>Email</label>
    //         <input 
    //         type="email" 
    //         required placeholder="Enter your email" 
    //         onChange={(e) => setEmail(e.target.value)}
    //         value = {email}
    //         />
    //         <label>Password</label>
    //         <input 
    //         type="password" 
    //         required placeholder="Enter the password"
    //         onChange={(e)=> setPassword(e.target.value)}
    //         value = {password}
    //         />
    //         <br />
    //         <button onClick={signInWIthGoogle}>Sign in with Google</button>
    //         <button onClick={createUser}>SignUp</button>
    //     </div>
    // )
    // return (
        // <div className="signup-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
        //     <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        //         <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Sign Up</h2>

        //         <div className="mb-4">
        //             <label className="block text-gray-700 font-medium mb-2">Email</label>
        //             <input
        //                 type="email"
        //                 required
        //                 placeholder="Enter your email"
        //                 onChange={(e) => setEmail(e.target.value)}
        //                 value={email}
        //                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        //             />
        //         </div>

        //         <div className="mb-6">
        //             <label className="block text-gray-700 font-medium mb-2">Password</label>
        //             <input
        //                 type="password"
        //                 required
        //                 placeholder="Enter the password"
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 value={password}
        //                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        //             />
        //         </div>

        //         <div className="flex flex-col space-y-4">
        //             <button
        //                 onClick={signInWithGoogle}
        //                 className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
        //             >
        //                 Sign in with Google
        //             </button>
        //             <button
        //                 onClick={createUser}
        //                 className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        //             >
        //                 Sign Up
        //             </button>
        //         </div>

        //         <p className="text-center text-gray-600 mt-4">
        //             Already have an account?{" "}
        //             <Link to="/signin" className="text-indigo-500 hover:underline">
        //                 Sign in here
        //             </Link>
        //         </p>
        //     </div>
        // </div>
        //);
        return (
            <div className="signup-page flex flex-col items-center justify-center min-h-screen bg-gray-900 relative">
             <NeuralNetworkAnimation /> {/* Background animation */}
             {isLoading && <SuccessAnimation onAnimationEnd={() => setIsLoading(false)} />} {/* Show success animation */}

            <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm z-10">
                <h2 className="text-2xl font-bold mb-6 text-gray-200 text-center">Sign Up</h2>

                <div className="mb-4">
                    <label className="block text-gray-400 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-400 font-medium mb-2">Password</label>
                    <input
                        type="password"
                        required
                        placeholder="Enter the password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex flex-col space-y-4">
                    <button
                        onClick={signInWithGoogle}
                        className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
                    >
                        Sign in with Google
                    </button>
                    <button
                        onClick={createUser}
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                        Sign Up
                    </button>
                </div>

                <p className="text-center text-gray-400 mt-4">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-indigo-500 hover:underline">
                        Sign in here
                    </Link>
                </p>
            </div>
        </div>
    );      
}


export default Signup;