import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

function LogoutBtn({ className = "" }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            dispatch(logout());
            navigate('/login');
        }
    };

    return (
        <button
            type="button"
            className={`px-3.5 py-1.5 text-sm font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all duration-200 flex items-center gap-1.5 border border-rose-200/60 cursor-pointer ${className}`}
            onClick={handleLogout}
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
        </button>
    );
}

export default LogoutBtn;
