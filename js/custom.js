const tbody = document.querySelector(".listar-usuarios");
const cadForm = document.getElementById("cad-usuario-form");
const editForm = document.getElementById("edit-usuario-form");
const msgAlertaErroCad = document.getElementById("msgAlertaErroCad");
const msgAlertaErroEdit = document.getElementById("msgAlertaErroEdit");
const msgAlerta = document.getElementById("msgAlerta");
const cadModal = new bootstrap.Modal(document.getElementById("cadUsuarios"));

const listarUsuarios = async (pagina) => {
const dados = await fetch("./list.php?pagina=" + pagina);
const resposta = await dados.text();
tbody.innerHTML = resposta;

}

listarUsuarios(1);

//Quando o usuário clica no botão salvar
cadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

	document.getElementById("usuario-cad-btn").value = "Salvando...";

    if(document.getElementById("nome").value === ""){
    	msgAlertaErroCad.innerHTML = "<div class='alert alert-danger' role='alert'>Preencha o campo Nome!</div>";
    }else if(document.getElementById("email").value === ""){
    	msgAlertaErroCad.innerHTML = "<div class='alert alert-danger' role='alert'>Preencha o campo E-mail!</div>";
    }else{
    	const dadosForm = new FormData(cadForm);
		dadosForm.append("add", 1);

		const dados = await fetch("cadastrar.php", {
		method:"POST",
		body: dadosForm,
	});

		const resposta = await dados.json();
		if(resposta['erro']){
			msgAlertaErroCad.innerHTML = resposta['msg'];
		}else{
			msgAlerta.innerHTML = resposta['msg'];
			cadForm.reset();
			cadModal.hide();
			listarUsuarios(1);
		}
    }

		document.getElementById("usuario-cad-btn").value = "Cadastrar";
});

async function visUsuario(id){
	//console.log("Acessou: " + id);
	const dados = await fetch('visualizar.php?id=' + id);
	const resposta = await dados.json();
	//console.log(resposta);

	if (resposta['erro']){
		msgAlerta.innerHTML = resposta['msg'];
	}else{
		const visModal = new bootstrap.Modal(document.getElementById("visUsuariosModal"));
		visModal.show();

		document.getElementById("idUsuario").innerHTML = resposta['dados'].id;
		document.getElementById("nomeUsuario").innerHTML = resposta['dados'].nome;
		document.getElementById("emailUsuario").innerHTML = resposta['dados'].email;
	}
}

async function editUsuariodados(id){
	msgAlertaErroEdit.innerHTML = "";
	
	const dados = await fetch('visualizar.php?id=' + id);
	const resposta = await dados.json();
	//console.log(resposta);

	if(resposta['erro']){
		msgAlerta.innerHTML = resposta['msg'];
	}else{
		const editModal = new bootstrap.Modal(document.getElementById("editUsuariosModal"));
		editModal.show();
		document.getElementById("editid").value = resposta['dados'].id;
		document.getElementById("editnome").value = resposta['dados'].nome;
		document.getElementById("editemail").value = resposta['dados'].email;

	}
}

editForm.addEventListener("submit", async (e) => {
	e.preventDefault();

	document.getElementById("edit-usuario-btn").value = "Salvando...";

	const dadosForm = new FormData(editForm);
	 //console.log(dadosForm);
	/*for(var dadosFormEdit of dadosForm.entries()){
		console.log(dadosFormEdit[0] + " - " + dadosFormEdit[1]);
	}*/

	const dados = await fetch("editar.php", {
		method: "POST",
		body: dadosForm 
	});

	const resposta = await dados.json();
	//console.log(resposta);

	if(resposta['erro']){
		msgAlerta.innerHTML = resposta['msg'];
	}else{
		msgAlerta.innerHTML = resposta['msg'];
		listarUsuarios(1);
	}

	document.getElementById("edit-usuario-btn").value = "Salvar";
});

async function apagarUsuarioDados(id) {

    var confirmar = confirm("Tem certeza que deseja excluir o registro selecionado?");

    if(confirmar == true){
        const dados = await fetch('apagar.php?id=' + id);

        const resposta = await dados.json();
        if (resposta['erro']) {
            msgAlerta.innerHTML = resposta['msg'];
        } else {
            msgAlerta.innerHTML = resposta['msg'];
            listarUsuarios(1);
        }
    }    

}