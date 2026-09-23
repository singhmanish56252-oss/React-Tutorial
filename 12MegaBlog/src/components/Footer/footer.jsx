import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden bg-slate-900 text-slate-400 border-t border-slate-800">
            <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand Info */}
                    <div className="lg:col-span-2 flex flex-col justify-between">
                        <div>
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="auto" className="brightness-200" />
                            </div>
                            <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-6">
                                A modern, full-featured publishing platform built with React, Redux Toolkit, and Appwrite. Share your thoughts, tutorials, and stories with the world.
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">
                                &copy; {currentYear} MegaBlog. All rights reserved.
                            </p>
                        </div>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
                            Platform
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link to="/" className="hover:text-white transition-colors duration-150">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/all-posts" className="hover:text-white transition-colors duration-150">
                                    All Articles
                                </Link>
                            </li>
                            <li>
                                <Link to="/add-post" className="hover:text-white transition-colors duration-150">
                                    Write an Article
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
                            Resources
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a 
                                    href="https://appwrite.io/docs" 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="hover:text-white transition-colors duration-150"
                                >
                                    Appwrite Docs
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="https://react.dev" 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="hover:text-white transition-colors duration-150"
                                >
                                    React Docs
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="https://tailwindcss.com" 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="hover:text-white transition-colors duration-150"
                                >
                                    Tailwind CSS
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legals Column */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link to="/" className="hover:text-white transition-colors duration-150">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="hover:text-white transition-colors duration-150">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="hover:text-white transition-colors duration-150">
                                    Open Source
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
