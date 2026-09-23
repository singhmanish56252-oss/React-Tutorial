import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true,
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus,
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus,
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authStatus,
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: authStatus,
        },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all duration-200">
            <Container>
                <nav className="flex items-center justify-between py-3.5">
                    {/* Brand Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <Logo width="auto" />
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) =>
                            item.active ? (
                                <button
                                    key={item.name}
                                    onClick={() => navigate(item.slug)}
                                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-150 cursor-pointer ${
                                        location.pathname === item.slug
                                            ? 'bg-indigo-50 text-indigo-600 font-semibold'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                    }`}
                                >
                                    {item.name}
                                </button>
                            ) : null
                        )}

                        {authStatus && (
                            <div className="flex items-center gap-3 pl-2 ml-2 border-l border-slate-200">
                                {userData?.name && (
                                    <span className="text-xs font-medium text-slate-500 max-w-[120px] truncate" title={userData.name}>
                                        Hi, {userData.name}
                                    </span>
                                )}
                                <LogoutBtn />
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger Toggle */}
                    <div className="md:hidden flex items-center gap-2">
                        {authStatus && <LogoutBtn />}
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
                            aria-label="Toggle navigation menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* Mobile Dropdown Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-3 border-t border-slate-100 space-y-1">
                        {navItems.map((item) =>
                            item.active ? (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        navigate(item.slug);
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                                        location.pathname === item.slug
                                            ? 'bg-indigo-50 text-indigo-600 font-semibold'
                                            : 'text-slate-700 hover:bg-slate-100'
                                    }`}
                                >
                                    {item.name}
                                </button>
                            ) : null
                        )}
                    </div>
                )}
            </Container>
        </header>
    );
}

export default Header;
