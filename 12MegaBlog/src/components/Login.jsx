import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async (data) => {
        setError("");
        setLoading(true);
        try {
            const session = await authService.login(data.email, data.password);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin({ userData }));
                navigate("/");
            }
        } catch (err) {
            console.error("Login component error:", err);
            if (err?.message?.includes("project_paused") || err?.code === 403) {
                setError("The Appwrite Cloud project is currently paused due to inactivity. Please reactivate your project in the Appwrite Console.");
            } else if (err?.code === 401) {
                setError("Invalid email or password. Please verify your credentials.");
            } else {
                setError(err?.message || "Failed to sign in. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center w-full px-4 py-8'>
            <div className='mx-auto w-full max-w-md bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100'>
                <div className="mb-6 flex justify-center">
                    <Link to="/">
                        <Logo width="auto" />
                    </Link>
                </div>
                <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900">
                    Welcome Back
                </h2>
                <p className="mt-2 text-center text-sm text-slate-500">
                    Don&apos;t have an account yet?&nbsp;
                    <Link
                        to="/signup"
                        className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-colors"
                    >
                        Sign up for free
                    </Link>
                </p>

                {error && (
                    <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-2.5">
                        <svg className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit(login)} className='mt-8 space-y-5'>
                    <Input
                        label="Email Address"
                        placeholder="you@example.com"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            validate: {
                                matchPattern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Please enter a valid email address",
                            }
                        })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    <Button
                        type="submit"
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md shadow-indigo-500/20 disabled:opacity-50 cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                                Signing in...
                            </span>
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
