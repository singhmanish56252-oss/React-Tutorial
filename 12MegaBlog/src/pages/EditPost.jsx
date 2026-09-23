import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setPost(fetchedPost);
                } else {
                    navigate('/');
                }
            }).catch(() => {
                navigate('/');
            }).finally(() => {
                setLoading(false);
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    if (loading) {
        return (
            <div className="py-20 flex justify-center items-center">
                <div className="flex flex-col items-center gap-3">
                    <svg className="animate-spin w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <p className="text-sm text-slate-500 font-medium">Loading post...</p>
                </div>
            </div>
        );
    }

    return post ? (
        <div className="py-10">
            <Container>
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                        Edit Article
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Update your article content and details
                    </p>
                </div>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;