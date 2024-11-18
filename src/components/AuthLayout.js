import React, { useState } from 'react';
const AuthLayout = ({ children, logo, title, subtitle }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-gray-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white shadow-2xl rounded-xl p-8">
                <div className="text-center">
                    <img
                        className="mx-auto h-16 w-auto mb-4"
                        src="UniHub.png"
                        alt="Application Logo"
                    />
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-2 text-sm text-gray-600">
                            {subtitle}
                        </p>
                    )}
                </div>
                {children}
            </div>
        </div>
    );

}

export default AuthLayout