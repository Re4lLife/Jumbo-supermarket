import toast from "react-hot-toast";

const API_URL = 'https://dummyjson.com';



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
        throw new Error(err.message);

    }
}


export async function getCategories(category) {
    const baseUrl = category === 'all' 
    ? `${API_URL}/products`
    : `${API_URL}/products/category/${category}`;


    const url = `${baseUrl}?limit=0`;

    console.log(url);

    try {
        const res = await fetch(url);

        if (!res.ok) throw new Error(`Failed to fetch categories: ${res.statusText}`);

        const data = await res.json();

        return data.products;

    } catch (err) {
        toast.error("Failed to fetch category");
        throw new Error(err.message);

    }
}
