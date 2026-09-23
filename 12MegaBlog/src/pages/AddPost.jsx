import React from 'react';
import { Container, PostForm } from '../components';

function AddPost() {
    return (
        <div className="py-10">
            <Container>
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                        Create Article
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Draft and publish your article using our rich editor
                    </p>
                </div>
                <PostForm />
            </Container>
        </div>
    );
}

export default AddPost;
