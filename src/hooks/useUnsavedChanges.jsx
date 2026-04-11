import { useEffect } from 'react';
import { useBlocker } from 'react-router-dom';

/**
 * Hook to block navigation if form has unsaved changes.
 * @param {boolean} isDirty - Indicates if the form has unsaved changes.
 */
export function useUnsavedChanges(isDirty) {
    // Blocks internal navigation
    let blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            isDirty && currentLocation.pathname !== nextLocation.pathname
    );

    useEffect(() => {
        if (blocker.state === "blocked") {
            const proceed = window.confirm("You have unsaved changes. Are you sure you want to leave?");
            if (proceed) {
                blocker.proceed();
            } else {
                blocker.reset();
            }
        }
    }, [blocker]);

    // Blocks refresh/close
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isDirty]);
}