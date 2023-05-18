interface IBook {
    id: string,
    nome: string, 
    capa: string,
    nota: string,
    linguagem: string,
    numeroPaginas: number,
    autor: string,
    genero: Array<string>,
    vezesLidas: string,
    descricao: string,
    data: string,
    headers: object
}

export default IBook;