import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    UserPlus,
    Mail,
    Lock,
    Eye,
    EyeOff,
    AlertCircle,
} from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'
import { auth, db } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = ({ logo }) => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required';
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        if (password !== confirmPassword)
            newErrors.confirmPassword = 'Passwords do not match';
        if (!phone) newErrors.phone = 'Phone number is required';
        if (!address) newErrors.address = 'Address is required';

        // Password strength check
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (password && !passwordRegex.test(password)) {
            newErrors.password =
                'Password must be 8+ chars, include uppercase, lowercase, number & special char';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                name,
                email: user.email,
                role: 'normal',
                phone,
                address,
            });

            navigate('/profile');
        } catch (error) {
            console.error('Error signing up:', error.message);
            alert('Error signing up. Please try again.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleSignUp();
        }
    };

    const handleSignIn = () => {
        navigate('/signin');
    };

    return (
        <>
            <Navbar />
            <AuthLayout
                logo={logo}
                title="Create Account"
                subtitle="Start your journey with us"
            >
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="relative">
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className={`pl-3 py-2 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && (
                                <div className="text-red-500 text-sm mt-1 flex items-center">
                                    <AlertCircle className="mr-2 h-4 w-4" />
                                    {errors.name}
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
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

                        {/* Phone Input */}
                        <div className="relative">
                            <label htmlFor="phone" className="sr-only">
                                Phone
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                required
                                className={`pl-3 py-2 block w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                                placeholder="Phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            {errors.phone && (
                                <div className="text-red-500 text-sm mt-1 flex items-center">
                                    <AlertCircle className="mr-2 h-4 w-4" />
                                    {errors.phone}
                                </div>
                            )}
                        </div>

                        {/* Address Input */}
                        <div className="relative">
                            <label htmlFor="address" className="sr-only">
                                Address
                            </label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                required
                                className={`pl-3 py-2 block w-full border ${errors.address ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            {errors.address && (
                                <div className="text-red-500 text-sm mt-1 flex items-center">
                                    <AlertCircle className="mr-2 h-4 w-4" />
                                    {errors.address}
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

                        <div className="relative">
                            <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                            <Lock className="absolute left-3 top-3 text-gray-400" />
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                className={`pl-10 pr-10 py-2 block w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            {errors.confirmPassword && (
                                <div className="text-red-500 text-sm mt-1 flex items-center">
                                    <AlertCircle className="mr-2 h-4 w-4" />
                                    {errors.confirmPassword}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* SignUp Button */}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-gray-500 hover:from-blue-700 hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <UserPlus className="h-5 w-5 text-white group-hover:text-green-200" />
                            </span>
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <button
                            onClick={handleSignIn}
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            </AuthLayout>
            <Footer/>
        </>
    );
};

export default SignUp;
