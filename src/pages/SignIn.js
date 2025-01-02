
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogIn,
    Mail,
    Lock,
    Eye,
    EyeOff,
    AlertCircle
} from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'
import { auth, db } from '../firebase/firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; 

const SignIn = ({ logo, onForgotPassword, onSignUpRedirect }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [authError, setAuthError] = useState('');

    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/signup');
    };
    
    const validateForm = () => {
        const newErrors = {};
        if (!email) newErrors.email = "Email is required";
        if (!password) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateForm()) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user
                const userRef = doc(db,'users',user.uid);
                const docSnap = await getDoc(userRef);
                if(docSnap.exists()) {
                    const userData = docSnap.data();
                    const role = userData.role;
                    if(role === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/profile');
                    }
                } else {
                    setAuthError('User Data not found in Firestore Database');
                }

            } catch (error) {
                setAuthError('Invalid Email or Password');
                console.log('Error signing in: ',error.message);
            }
        }
    };
    return (
        <>
        <Navbar />
        <AuthLayout
            logo={logo}
            title="Welcome Back"
            subtitle="Sign in to continue to your account"
        >
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div className="relative">
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <Mail className="absolute left-3 top-3 text-gray-400" />
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className={`pl-10 pr-3 py-2 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                } rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                            <div className="text-red-500 text-sm mt-1 flex items-center">
                                <AlertCircle className="mr-2 h-4 w-4" />
                                {errors.email}
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <Lock className="absolute left-3 top-3 text-gray-400" />
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            className={`pl-10 pr-10 py-2 block w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                } rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        {errors.password && (
                            <div className="text-red-500 text-sm mt-1 flex items-center">
                                <AlertCircle className="mr-2 h-4 w-4" />
                                {errors.password}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>

                    <div className="text-sm">
                        <button
                            type="button"
                            onClick={onForgotPassword}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Forgot password?
                        </button>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-gray-500 hover:from-blue-700 hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"          >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <LogIn className="h-5 w-5 text-white group-hover:text-indigo-200" />
                        </span>
                        Sign In
                    </button>
                </div>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                        onClick={handleSignUp}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </AuthLayout>
        <Footer/>
        </>
    );
};


export default SignIn;