export default class API {
    static #BASE_API_URL = "http://localhost:3000/"

    static register = async (registerForm) => {
        const response = await fetch(this.#BASE_API_URL + "auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registerForm),
        credentials: "include",
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return;
    }

    static login = async (loginForm) => {
        const response = await fetch(this.#BASE_API_URL + "auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
        credentials: "include",
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return;
    }

    static getProducts = async (filters) => {
        const filtersForQuery = {
            colors: filters.colors ? Object.keys(filters.colors).filter(color => filters.colors[color]) : [],
            cars: filters.cars ? Object.keys(filters.cars).filter(car => filters.cars[car]) : [],
            price: filters.price ? [filters.price.min_price, filters.price.max_price] : []
        }

    const params = new URLSearchParams();

    for (const key in filtersForQuery) {
        if (Array.isArray(filtersForQuery[key])) {
            filtersForQuery[key].forEach(value => {
                params.append(key, value); 
            });
        } else {
            params.append(key, filtersForQuery[key]); 
        }
    }

        const response = await fetch(this.#BASE_API_URL + "products?" + params.toString(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        })
       
        return await response.json();
    }

    static getFilters = async () => {
        const response = await fetch(this.#BASE_API_URL + "products/filters", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        })

        return await response.json();
    }

    static getProduct = async (id) => {
        const response = await fetch(this.#BASE_API_URL + "products/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        })

        return await response.json();
    }

    static toCart = async (id) => {
        const response = await fetch(this.#BASE_API_URL + "products/" + id + "/to-cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        })

        return;
    }

        static getCart = async (id) => {
        const response = await fetch(this.#BASE_API_URL + "cart", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        })

        return await response.json();
    }

    static clearCart = async (id) => {
        const response = await fetch(this.#BASE_API_URL + "cart", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        })

        return;
    }

        static deleteFromCart = async (id, count) => {
        const response = await fetch(this.#BASE_API_URL + "cart/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            deleteCount: count
        }),
        credentials: "include",
        })

        return;
    }

    static createOrder = async (form) => {
        const response = await fetch(this.#BASE_API_URL + "orders/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include",
        })

        return;
    }

    static getOrders = async () => {
        const response = await fetch(this.#BASE_API_URL + "orders", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        })

        return await response.json();
    }

        static getOrder = async (id) => {
        const response = await fetch(this.#BASE_API_URL + "orders/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        })

        return await response.json();
    }

    static logout = async () => {
        const response = await fetch(this.#BASE_API_URL + "auth/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        })

        return;
    }

        static changePassword = async (form) => {
        const response = await fetch(this.#BASE_API_URL + "auth/change-password", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include",
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return;
    }

    static getMe = async () => {
        const response = await fetch(this.#BASE_API_URL + "users/me", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        })

        return await response.json();
    }
}