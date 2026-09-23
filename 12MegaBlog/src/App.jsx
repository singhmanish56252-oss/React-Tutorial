import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import './App.css';
import authService from "./appwrite/auth";
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            })
            .catch(() => {
                dispatch(logout());
            })
            .finally(() => setLoading(false));
    }, [dispatch]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 text-white animate-bounce">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        <span className="text-sm font-medium text-slate-500">Loading MegaBlog...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default App;
