import api from "../api/api";
import exceptionHandler from "../utils/ExceptionHandler";


const getBooks = async () => {
    try {
        return await api.get(`/books`, {
            headers: {
                permitir: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNWQyYTVhYjg2MGY2YmYxZjJmMDY0MyIsImlhdCI6MTY2NzA1NDEwM30.z4lb0EsHOKHBaYmG67i1Kev_wn_uxQ3-GZN05gSw0xQ"
            }
        })
       
    } catch (error) {
        return exceptionHandler(error);
    }
}


export default {
    getBooks
}