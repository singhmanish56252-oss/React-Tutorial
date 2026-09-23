import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [serviceUnavailable, setServiceUnavailable] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        let isMounted = true;
        appwriteService.getPosts()
            .then((response) => {
                if (isMounted) {
                    if (response && response.documents) {
                        setPosts(response.documents);
                        setServiceUnavailable(false);
                    } else {
                        setServiceUnavailable(true);
                    }
                }
            })
            .catch((err) => {
                console.error("Home :: getPosts error", err);
                if (isMounted) setServiceUnavailable(true);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="w-full pb-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/60 via-white to-transparent pt-14 pb-16 md:pt-20 md:pb-24 border-b border-slate-100">
                <Container>
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-6">
                            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                            Next-Gen Blogging with React & Appwrite
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                            Ideas, Stories & <br className="hidden sm:inline" />
                            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Technical Insights
                            </span>
                        </h1>
                        <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                            A blazing fast, full-featured publishing platform. Write rich articles with TinyMCE, manage assets securely with Appwrite, and engage readers worldwide.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                            {authStatus ? (
                                <>
                                    <Link
                                        to="/add-post"
                                        className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5"
                                    >
                                        Write an Article
                                    </Link>
                                    <Link
                                        to="/all-posts"
                                        className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-slate-200 shadow-xs transition-all duration-200"
                                    >
                                        Explore All Posts
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/signup"
                                        className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5"
                                    >
                                        Get Started Free
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-slate-200 shadow-xs transition-all duration-200"
                                    >
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Appwrite Paused Warning Banner */}
            {serviceUnavailable && (
                <div className="mt-6">
                    <Container>
                        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-sm flex items-start gap-3">
                            <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div>
                                <p className="font-semibold text-amber-950">Appwrite Cloud Status Notice</p>
                                <p className="text-amber-800 mt-0.5">
                                    The configured Appwrite Cloud project appears to be paused due to inactivity (Error 403: project_paused). To view or publish live data, log into your <a href="https://cloud.appwrite.io" target="_blank" rel="noreferrer" className="underline font-semibold hover:text-amber-950">Appwrite Console</a> and resume the project.
                                </p>
                            </div>
                        </div>
                    </Container>
                </div>
            )}

            {/* Main Content Area */}
            <div className="mt-12">
                <Container>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                                Recent Articles
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">
                                Discover the latest stories and tutorials
                            </p>
                        </div>
                        {posts.length > 0 && (
                            <Link 
                                to="/all-posts"
                                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                            >
                                View all
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        )}
                    </div>

                    {/* Loading Skeletons */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((n) => (
                                <div key={n} className="rounded-2xl border border-slate-200/80 bg-white p-4 space-y-4 animate-pulse">
                                    <div className="aspect-video w-full bg-slate-200 rounded-xl"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                                        <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : posts.length === 0 ? (
                        /* Empty State */
                        <div className="py-16 px-4 text-center rounded-3xl border border-dashed border-slate-200 bg-white">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">
                                {authStatus ? "No articles published yet" : "Welcome to MegaBlog"}
                            </h3>
                            <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                                {authStatus 
                                    ? "Start by publishing your first article using the rich text editor." 
                                    : "Sign in or create an account to start reading and writing articles."}
                            </p>
                            {authStatus ? (
                                <Link
                                    to="/add-post"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-md shadow-indigo-500/20 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Create Article
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-md shadow-indigo-500/20 transition-colors"
                                >
                                    Sign In to MegaBlog
                                </Link>
                            )}
                        </div>
                    ) : (
                        /* Responsive Posts Grid */
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {posts.map((post) => (
                                <PostCard key={post.$id} {...post} />
                            ))}
                        </div>
                    )}
                </Container>
            </div>
        </div>
    );
}

export default Home;