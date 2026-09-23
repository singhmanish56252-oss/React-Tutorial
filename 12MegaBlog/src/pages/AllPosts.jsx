import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let isMounted = true;

        appwriteService.getPosts([])
            .then((response) => {
                if (isMounted) {
                    if (response && response.documents) {
                        setPosts(response.documents);
                    } else {
                        setError(true);
                    }
                }
            })
            .catch((err) => {
                console.error("AllPosts :: getPosts error", err);
                if (isMounted) setError(true);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="w-full py-10">
            <Container>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                            All Articles
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Browse every published article on the platform
                        </p>
                    </div>

                    <Link
                        to="/add-post"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-md shadow-indigo-500/20 transition-all self-start sm:self-auto"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Write New Article
                    </Link>
                </div>

                {error && (
                    <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-3">
                        <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                            <p className="font-semibold text-amber-950">Unable to load articles</p>
                            <p className="text-amber-800 mt-0.5">
                                Appwrite Cloud may be paused or unreachable. Please check your Appwrite console or connection status.
                            </p>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
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
                    <div className="py-20 px-4 text-center rounded-3xl border border-dashed border-slate-200 bg-white">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">No articles found</h3>
                        <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                            There are currently no published articles in this collection.
                        </p>
                        <Link
                            to="/add-post"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-md shadow-indigo-500/20"
                        >
                            Create First Article
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;
