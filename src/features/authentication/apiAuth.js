import supabase from '../../supabaseClient';
import { queryClient } from '../../App';

/**
 * Handles user login with email and password.
 * @param {string} email
 * @param {string} password
 */
export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message)
    }

    return data.user;
}


/** 
* Handles user sign up with email and password.
 * @param {string} email
 * @param {string} password
 */
export async function signUp({ email, password }) {
    // ⚠️ Note: Supabase sign-up also logs the user in immediately after successful sign-up.
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message);
    }

    // data.user contains the newly created user object
    return data.user;
}

//Get current logged in user

export async function getCurrentUser() {
    // Check the currently active session
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) return null; // No active session

    // If a session exists, fetch the user data
    const { data, error } = await supabase.auth.getUser();
    

    if (error) throw new Error(error.message);

    return data?.user;
}


//SignOut functionality
export async function logout() {

    const { error } = await supabase.auth.signOut();
    
    // ⚠️ CRITICAL: Invalidate and remove the user query cache on sign-out
    queryClient.removeQueries({ queryKey: ['user'] });

    if (error) throw new Error(error.message);
}

