import supabase from '../../supabaseClient';

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

    if(error) {
        throw new Error(error.message)
    }

    return data.user;
}