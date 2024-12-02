import React from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import app from '../firebase'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import NeuralNetworkAnimation from '../NeuralNetworkAnimation';
import SuccessAnimation from '../SuccessAnimation';

const auth = getAuth(app);


function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // const signInUser = () => {
    //     signInWithEmailAndPassword(auth, email, password)
    //     .then(() => {
    //         alert("Sign in success");
    //         navigate('/dashboard');
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     });
    // }
    const signInUser = () => {
        setIsLoading(true); // Show loading animation
        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            // Wait for the animation to complete before navigating
            setTimeout(() => {
              navigate('/dashboard');
            }, 1000); // Adjust the duration to match the animation duration
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false); // Hide loading animation on error
          });
      };

  return (
    // <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    //     <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
    //         <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Sign In</h2>
            
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
    //                 placeholder="Enter your password"
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 value={password}
    //                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    //             />
    //         </div>

    //         <button 
    //             onClick={signInUser}
    //             className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
    //         >
    //             Sign In
    //         </button>
    //     </div>
    // </div>
//     <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900"> {/* Dark background */}
//     <NeuralNetworkAnimation /> {/* Background animation */}
//     <div className="z-10 flex flex-col items-center justify-center">
//       <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-sm">
//         <h2 className="text-3xl font-semibold mb-6 text-white text-center">Sign In</h2>

//         <div className="mb-4">
//           <label className="block text-gray-300 font-medium mb-2">Email</label>
//           <input
//             type="email"
//             required
//             placeholder="Enter your email"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             className="w-full px-4 py-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200 bg-gray-700 text-white"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-gray-300 font-medium mb-2">Password</label>
//           <input
//             type="password"
//             required
//             placeholder="Enter your password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             className="w-full px-4 py-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200 bg-gray-700 text-white"
//           />
//         </div>

//         <button
//           onClick={signInUser}
//           className="w-full bg-cyan-600 text-white py-3 rounded-md hover:bg-cyan-700 transition duration-300 shadow-md"
//         >
//           Sign In
//         </button>

//         <p className="mt-4 text-center text-gray-400">
//           Don't have an account? <a href="/signup" className="text-cyan-400 hover:underline">Sign Up</a>
//         </p>
//       </div>
//     </div>
//   </div>
<div className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      <NeuralNetworkAnimation /> {/* Background animation */}
      {isLoading && <SuccessAnimation onAnimationEnd={() => setIsLoading(false)} />} {/* Show success animation */}

      <div className="z-10 flex flex-col items-center justify-center">
        <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-3xl font-semibold mb-6 text-white text-center">Sign In</h2>

          <div className="mb-4">
            <label className="block text-gray-300 font-medium mb-2">Email</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200 bg-gray-700 text-white"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 font-medium mb-2">Password</label>
            <input
              type="password"
              required
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200 bg-gray-700 text-white"
            />
          </div>

          <button
            onClick={signInUser}
            className="w-full bg-cyan-600 text-white py-3 rounded-md hover:bg-cyan-700 transition duration-300 shadow-md"
          >
            Sign In
          </button>

          <p className="mt-4 text-center text-gray-400">
            Don't have an account? <a href="/signup" className="text-cyan-400 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signin;
