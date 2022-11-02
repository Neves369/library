import api from "../api/api";
import IUser from "../models/IUser";
import exceptionHandler from "../utils/ExceptionHandler";


const login = async (user: IUser) => {
    try {
        return await api.get(`/auth/authenticate`, {
            headers: {
                email: `${user.email}`,
                senha: `${user.senha}`
            }
        })
       
    } catch (error) {
        console.log(error)
        return exceptionHandler(error);
    }
}

const salvarUser = async (cliente: object) => {
    try {
        return await api.post(`/cliente/salvar`, cliente, {
            headers: {
                Token: "77f04b5e-60af-40ac-9063-6bbebdfac8e8"
            }
        })
       
    } catch (error) {
        return exceptionHandler(error);
    }
}

const getUser = async (clienteId: string) => {
    try {
        return await api.get(`/cliente/id/${clienteId}`, {
            headers: {
                Token: "77f04b5e-60af-40ac-9063-6bbebdfac8e8"
            }
        })
       
    } catch (error) {
        return exceptionHandler(error);
    }
}

const atualizarUser = async (cliente: object) => {
    try {
        return await api.put(`/cliente/atualizar`, cliente, {
            headers: {
                Token: "77f04b5e-60af-40ac-9063-6bbebdfac8e8"
            }
        })
       
    } catch (error) {
        return exceptionHandler(error);
    }
}

const atualizarSenha = async (senhas: object) => {
    try {
        return await api.put(`/cliente/atualizar-senha`, senhas, {
            headers: {
                Token: "77f04b5e-60af-40ac-9063-6bbebdfac8e8"
            }
        })
       
    } catch (error) {
        return exceptionHandler(error);
    }
}

const inativarUser = async (cliente: object) => {
    try {
        return await api.put(`/cliente/inativar/${cliente.id}`, null, {
            headers: {
                Token: "77f04b5e-60af-40ac-9063-6bbebdfac8e8"
            }
        })
       
    } catch (error) {
        return exceptionHandler(error);
    }
}

const recuperarSenha = async (email: string) => {
    try {
        return await api.put(`/cliente/recuperar-senha/${email}`, null,{
            headers: {
                Token: "77f04b5e-60af-40ac-9063-6bbebdfac8e8"
            }
        })
       
    } catch (error) {
        return exceptionHandler(error);
    }
}



export default {
    login,
    getUser,
    salvarUser,
    atualizarUser,
    atualizarSenha,
    recuperarSenha,
    inativarUser
}