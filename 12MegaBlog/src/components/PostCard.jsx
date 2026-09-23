import React, { useState } from "react";
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    const [imageError, setImageError] = useState(false);
    const imageUrl = featuredImage ? appwriteService.getFilePreview(featuredImage) : "";

    return (
        <Link to={`/post/${$id}`} className="group block h-full">
            <div className="h-full bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                {/* Image Container */}
                <div className="relative aspect-video w-full bg-gradient-to-tr from-slate-100 to-indigo-50/50 overflow-hidden flex items-center justify-center">
                    {imageUrl && !imageError ? (
                        <img 
                            src={imageUrl} 
                            alt={title}
                            onError={() => setImageError(true)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                            <svg className="w-12 h-12 text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs font-medium text-slate-400">MegaBlog Article</span>
                        </div>
                    )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2.5">
                            <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700">
                                Article
                            </span>
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2 leading-snug">
                            {title}
                        </h2>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-medium text-indigo-600">
                        <span>Read full article</span>
                        <svg className="w-3.5 h-3.5 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
