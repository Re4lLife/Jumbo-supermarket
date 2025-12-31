import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as LogoutApi } from "../features/authentication/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";





export function useLogOut() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();


    const { mutate: logout, isPending: isLoggingOut } = useMutation({
        mutationFn: LogoutApi,

        onSuccess: () => {
            queryClient.removeQueries();
    
            navigate('/auth/sign-in', { replace: true });

        },
        onError: () => {
            toast.error('Logout failed');
        }
    });

    return { isLoggingOut, logout }
}