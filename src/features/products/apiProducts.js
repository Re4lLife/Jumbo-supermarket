import toast from "react-hot-toast";



const API_URL = 'https://dummyjson.com';


//Gets all products initially.
export async function getProducts() {
    try {
        const res = await fetch(`${API_URL}/products?limit=0`);

        if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.statusText}`);
        }

        const data = await res.json();

        return data.products;


    } catch (err) {
        toast.error('Failed to load products data.');
        throw new Error(err);

    }
}


//Conditionally either get all categories(all products) or a specific category of products depending on user's input 
export async function getCategories(category) {
    const baseUrl = category === 'all'
        ? `${API_URL}/products`
        : `${API_URL}/products/category/${category}`;


    const url = `${baseUrl}?limit=0`;

    try {
        const res = await fetch(url);

        if (!res.ok) throw new Error(`Failed to fetch categories: ${res.statusText}`);

        const data = await res.json();

        return data.products;

    } catch (err) {
        toast.error("Failed to fetch category");
        throw new Error(err);

    }
}


//Gets product details
export async function getProduct(id) {
    if (!id) throw new Error("Product ID is required"); // Gaurd clause

    const url = `${API_URL}/products/${id}`

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch product ${id}: ${res.statusText}`);

        const data = await res.json();

        return data;


    } catch (err) {
        toast.error(`Could not load details for product`);
        throw new Error(err);

    }
}