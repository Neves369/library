import api from "../api/api";
import exceptionHandler from "../utils/ExceptionHandler";




const teste = async (params: any) => {
    
    try {
        return await api.get(`/epubs`, {
            headers: {
                permitir: `Bearer ${params.token}`,
            }
        })
       
    } catch (error) {
        return exceptionHandler(error);
    }
}




export default {
    teste
}