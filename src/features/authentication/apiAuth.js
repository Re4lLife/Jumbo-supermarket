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