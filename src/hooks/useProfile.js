import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../features/profile/apiProfile';



export default function useProfile() {
    const {
        data: profile,
        isPending: isLoading,
        error

    } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
    });

    const isAuthenticated = profile?.user_id ? true : false;

    return { profile, isLoading, error, isAuthenticated }
}