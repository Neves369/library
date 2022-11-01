import api from "../api/api";
import exceptionHandler from "../utils/ExceptionHandler";


const login = async (cliente: object) => {
    try {
        return await api.get(`/cliente/login`, {
            headers: {
                Token: "77f04b5e-60af-40ac-9063-6bbebdfac8e8",
                email: `${cliente.email}`,
                senha: `${cliente.senha}`
            }
        })
       
    } catch (error) {
        return exceptionHandler(error);
    }
}

const salvarCliente = async (cliente: object) => {
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

const getCliente = async (clienteId: string) => {
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

const atualizarCliente = async (cliente: object) => {
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

const inativarCliente = async (cliente: object) => {
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
    getCliente,
    salvarCliente,
    atualizarCliente,
    atualizarSenha,
    recuperarSenha,
    inativarCliente
}