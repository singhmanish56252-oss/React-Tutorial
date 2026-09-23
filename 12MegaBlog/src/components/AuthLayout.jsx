import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children, authentication = true }){
     const navigate = useNavigate()
     const authStatus = useSelector(state => state.auth.status)
     const shouldRedirect = authentication ? !authStatus : authStatus

       useEffect (() =>{
        if (authentication && !authStatus) {
            navigate("/login", { replace: true })
        } else if (!authentication && authStatus) {
            navigate("/", { replace: true })
        }
       }, [authStatus, navigate ,authentication])
       return (
        shouldRedirect ? null : <>{children}</>
       )
}
