import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supaBaseClient';
import LoadingScreen from './LoadingScreen';

/**
 * Wraps admin routes. Checks for an active Supabase session and
 * verifies the user's role matches the required role before rendering children.
 * Redirects to /access if unauthenticated or unauthorised.
 *
 * Usage in router:
 *   element: <ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>
 */
export default function ProtectedRoute({ children, requiredRole }) {
    const [status, setStatus] = useState('loading'); // 'loading' | 'authorized' | 'unauthorized'

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                setStatus('unauthorized');
                return;
            }
            if (requiredRole && session.user.user_metadata?.role !== requiredRole) {
                setStatus('unauthorized');
                return;
            }
            setStatus('authorized');
        });
    }, [requiredRole]);

    if (status === 'loading') return <LoadingScreen />;
    if (status === 'unauthorized') return <Navigate to="/access" replace />;
    return children;
}
