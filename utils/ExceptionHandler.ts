const exceptionHandler = ( error: any ) => {

    console.log("aqui", error)
    if(error.response.status != 200){
     return error.response.data;        
    }

}

export default exceptionHandler;

/*

    {
    "codigo": 500,
    "titulo": "Erro ao tentar atualizar corretor",
    "status": 500,
    "timestamp": 1625258746258,
    "mensagemDesenvolvedor": "https://ztitecnologia.com.br/api-sgb/erros/500"
    }

*/