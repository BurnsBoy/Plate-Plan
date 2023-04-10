const userDatabase = 'https://steep-sly-bangle.glitch.me/api/products'
export const server_calls = {
    getFood: async (searchTerm:string) => {
     const response = await fetch(`https://us.openfoodfacts.org/api/v2/search?categories_tags_en=${searchTerm}&fields=code,product_name,image_url`,
        {
            method: 'GET',
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from the server')
        }

        return await response.json()
    },
    getFoodByCode: async (code:string) => {
        const response = await fetch(`https://us.openfoodfacts.org/api/v2/products/${code}&fields=code,product_name,image_url`,
           {
               method: 'GET',
           });
   
           if (!response.ok){
               throw new Error('Failed to fetch data from the server')
           }
   
           return await response.json()
       },
    getNutrition: async(code: string) => {
        const response = await fetch(`https://us.openfoodfacts.org/api/v2/products/${code}&fields=nutriments,product_name,brand_owner`,
        {
            method: 'GET',
        });
        
        if (!response.ok){
            throw new Error('Failed to fetch data from the server')
        }

        return await response.json()
    },
    addProduct: async(data: {}, user: string) => {
        const response = await fetch(userDatabase,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',   
                'x-access-token': `Bearer ${user}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from the server')
        }

        return await response.json()
    },
    getProducts: async(user: string) => {
        const response = await fetch(userDatabase,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',   
                'x-access-token': `Bearer ${user}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from the server')
        }

        return await response.json()
    },
    getProduct: async(user: string, id: string) => {
        const response = await fetch(`${userDatabase}/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',   
                'x-access-token': `Bearer ${user}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from the server')
        }

        return await response.json()
    },
    editProduct: async(data: {}, user: string, id: string) => {
        
        const response = await fetch(`${userDatabase}/${id}`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',   
                'x-access-token': `Bearer ${user}`,  
            },
            body: JSON.stringify(data)
        })
        
        if (!response.ok){
            throw new Error('Failed to update data on server')
        }
        return await response.json()
    },
    delete: async (user: string, id:string) => {
        const response = await fetch(`${userDatabase}/${id}`,
        {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',   
                'x-access-token': `Bearer ${user}`,                
            }
        })
        if (!response.ok){
            throw new Error('Failed to delete data on server')
        }
        return;
    }

}