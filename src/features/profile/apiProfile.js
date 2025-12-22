import toast from "react-hot-toast";
import supabase from "../../supabaseClient";


export async function getProfile() {
    // Currently logged-in user's data
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) throw new Error("Could not retrieve user session.");
    if (!userData.user) return null;

    const auth_user = userData.user;

    // Fetching the corresponding profile data of the user
    const { data: profileData, error: profileError } = await supabase
        .from('profile')
        .select('*')
        // Filter by the authenticated user's ID
        .eq('user_id', auth_user.id)
        .maybeSingle();


    if (profileError) {
        toast.error("Could not load user's profile");
        throw new Error(profileError.message);
    }

    // 3. Combine the essential data:
    const profile = {
        email: userData.user.email,
        user_id: userData.user.id,
        fullName: profileData?.full_name || 'New User',
        imageUrl: profileData?.image || '',
        number: profileData?.number || 'Add phone number',
        address: profileData?.address || 'Add address',
    }

    return profile;
}


export async function updateProfile(updatedData) {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw new Error("Not authenticated.");

    // 1. Keep existing image by default
    let finalImageUrl = updatedData.imageUrl; 

    // 2. Only run upload logic if a NEW file was selected
    const imageFile = updatedData.avatarFile?.[0];

    if (imageFile) {
        const imageName = `${Date.now()}-${imageFile.name}`.replaceAll(' ', '-');
        const imagePath = `profiles/${imageName}`;

        const { error: storageError } = await supabase.storage
            .from("jumbo")
            .upload(imagePath, imageFile, { upsert: true });

        if (storageError) {
            console.error("Image upload failed:", storageError.message);
            throw new Error("Profile image could not be uploaded");
        }

        const { data: publicUrl } = supabase.storage
            .from("jumbo")
            .getPublicUrl(imagePath);

        finalImageUrl = publicUrl.publicUrl;
    }

    // 3. Update Database (uses finalImageUrl which is either the OLD string or NEW upload)
    const { data, error } = await supabase
        .from('profile')
        .update({
            full_name: updatedData.fullName,
            number: updatedData.number,
            address: updatedData.address,
            image: finalImageUrl, 
        })
        .eq('user_id', userData.user.id)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error("Failed to update profile.");
    }

    return data;
}