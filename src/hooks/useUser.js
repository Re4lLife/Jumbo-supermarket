import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../features/authentication/apiAuth'


export function useUser() {
    const { data: user, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,

        staleTime: 30 * 60 * 1000,
    });

    const isAuthenticated = user?.role === "authenticated";

    
    return { isLoading, isAuthenticated, user };
}