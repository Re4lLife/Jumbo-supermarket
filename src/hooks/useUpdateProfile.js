import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile as updateProfileApi } from "../features/profile/apiProfile";
import toast from "react-hot-toast";



export default function useUpdateProfile() {
    const queryClient = useQueryClient();

    const { mutate: updateProfile, isPending: isUpdating } = useMutation({
        mutationFn: updateProfileApi,
        onSuccess: () => {
            toast.success('Profile updated successfully')
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },

        onError: (err) => console.error(err),
    });

    return { updateProfile, isUpdating };
} 