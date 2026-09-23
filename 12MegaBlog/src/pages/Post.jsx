import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) setPost(fetchedPost);
                else navigate("/");
            }).catch(() => {
                navigate("/");
            }).finally(() => {
                setLoading(false);
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = async () => {
        if (!window.confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
            return;
        }

        setDeleting(true);
        try {
            const status = await appwriteService.deletePost(post.$id);
            if (status) {
                if (post.featuredImage) {
                    await appwriteService.deleteFile(post.featuredImage);
                }
                navigate("/");
            }
        } catch (error) {
            console.error("Failed to delete post:", error);
            alert("Failed to delete article. Please try again.");
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="py-20 flex justify-center items-center">
                <div className="flex flex-col items-center gap-3">
                    <svg className="animate-spin w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <p className="text-sm text-slate-500 font-medium">Loading article...</p>
                </div>
            </div>
        );
    }

    if (!post) return null;

    const imageUrl = post.featuredImage ? appwriteService.getFilePreview(post.featuredImage) : "";

    return (
        <article className="py-10">
            <Container>
                {/* Back button and author action toolbar */}
                <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </button>

                    {isAuthor && (
                        <div className="flex items-center gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-emerald-600 hover:bg-emerald-700" className="text-sm px-4 py-1.5">
                                    Edit Article
                                </Button>
                            </Link>
                            <Button 
                                bgColor="bg-rose-600 hover:bg-rose-700" 
                                className="text-sm px-4 py-1.5 disabled:opacity-50"
                                onClick={deletePost}
                                disabled={deleting}
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </Button>
                        </div>
                    )}
                </div>

                {/* Article Header Card */}
                <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
                    {/* Featured Image */}
                    {imageUrl && !imageError && (
                        <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                            <img
                                src={imageUrl}
                                alt={post.title}
                                onError={() => setImageError(true)}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="p-6 sm:p-10">
                        {/* Title and Metadata */}
                        <div className="mb-8 pb-6 border-b border-slate-100">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700">
                                    Article
                                </span>
                                {post.status && (
                                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 capitalize">
                                        {post.status}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                {post.title}
                            </h1>
                        </div>

                        {/* Article Rich Text Content */}
                        <div className="browser-css text-slate-700 leading-relaxed">
                            {parse(post.content || "")}
                        </div>
                    </div>
                </div>
            </Container>
        </article>
    );
}