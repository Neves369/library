const gerar = () =>{
	let codigo = "";
	
	for (let i = 0; i <= 5; i++) {
		codigo = codigo + Math.floor(Math.random() * 10);
	}

	return codigo;
}

export default {
	gerar
}





