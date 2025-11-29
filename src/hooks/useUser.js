import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../features/authentication/apiAuth'


export function useUser() {
    const { data: user, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser,
    });

    // This ensures that 'isAuthenticated' is strictly true only when the user object is valid.
     const isAuthenticated = user && user?.role === 'authenticated';

    return { user, isLoading, isAuthenticated }
}