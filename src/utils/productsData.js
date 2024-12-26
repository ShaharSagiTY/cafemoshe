// import axios from 'axios';

const ProductsData = {
    cachedData: null,
    async getAllItems() {
        if (this.cachedData) {
            return this.cachedData;
        }
        const endPoint = 'https://testit-nf0d.onrender.com/cards/shaharProducts';
        try {
            const response = await fetch(endPoint);
            if (response.ok){
                const jsonResponse = await response.json();
                // console.log(JSON.stringify(jsonResponse))
                this.cachedData = jsonResponse;
                console.log(this.cachedData);
                return(jsonResponse)
            }
        }catch(error){
            console.log(error)
        }
        return null;
    },
    async updateAllItems(productsList) {
        console.log(productsList);
        const sendList = productsList.map(({amount,...rest }) => rest);
        console.log(sendList);
    //     let obj = 
    //     [
    //       {
    //           "id": "10",
    //           "item": "shuhsh",
    //           "price": "20.5"
    //       },
    //       {
    //           "id": "8",
    //           "item": "tytueje",
    //           "price": "11.3"
    //       },
    //       {
    //           "id": "13",
    //           "item": "vodkattytyt",
    //           "price": "57"
    //       }
    //   ]
    

        const endPoint = 'https://testit-nf0d.onrender.com/cards/updateProductShahar';
    //     try {
    //         const {data} = await axios.post (endPoint, obj);
    //         console.log(data)
    //         // console.log(Promise.resolve(data))
    //         return Promise.resolve(data);
    //     } catch (error) {
    //         return Promise.reject (error.messgae);
    //     }
        try {
            const response = await fetch(endPoint, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(sendList),
            });
            if (response.ok){
                const jsonResponse = await response.json();
                console.log(JSON.stringify(jsonResponse))
            }
        }catch(error){
            console.log(error)
        }
        return null;
    }
}

export default ProductsData;