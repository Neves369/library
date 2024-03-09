import axios from "axios";
import api from "../api/api";
import exceptionHandler from "../utils/ExceptionHandler";



const getBooks = async (params: any) => {
    
    try {
        return await api.get(`/books`, {
            headers: {
                permitir: `Bearer ${params.token}`,
                categoria: params.categoria
            }
        })
       
    } catch (error) {
        return exceptionHandler(error);
    }
}

// Requisição multipla usada no dashboard
const getBooksDashboard = async (params: any) => {

    
    let arr: any= [];
    
    params.categorias.map((cat: any)=>{
        arr.push(cat.categoria);
    })

    
    const fav = params.favoritos.favoritos.join(", ");
    const cat = arr.join(", ");


    try {
        let favoritos = api.get(`https://api-books.onrender.com/books`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json;charset=UTF-8",
                permitir: `Bearer ${params.token}`,
                favoritos: fav
            }
        })

        let iniciais = api.get(`https://api-books.onrender.com/books`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json;charset=UTF-8",
                permitir: `Bearer ${params.token}`,
                categorias: cat
            }
        })

        let response = await axios.all([favoritos, iniciais])
        return response;
        
    } catch (error) {
        return exceptionHandler(error);
    }
}

// Requisita o header para baixar o livro do s3
const getAuthHeader = async (ref: string, bookId: string, token: string) => {
    
    try {
        return await api.put(`/books/auth/${bookId}`, {}, {
            headers: {
                ref: ref,
                permitir: `Bearer ${token}`,
            }
        })
       
    } catch (error) {
        return exceptionHandler(error);
    }
}


export default {
    getBooks,
    getBooksDashboard,
    getAuthHeader
}