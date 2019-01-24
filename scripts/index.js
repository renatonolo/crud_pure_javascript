/*** Armazena os clientes ***/
var clients = [
    {
        id: 1,
        name: {
            surname: 'Henrique',
            familyname: 'Santos',
            displayName: 'Henrique Santos', // @dica, gerar
        },
        code: {
            securityCode: '99999999999' // CPF
        },
        email: 'henrique.zucareli@tibi.com.br',
        phones: [
            {
                kind: 'Residencial',
                rawNumber: '11 9999-9999',
                areaCode: '11',
                number: '99999999'
            },
            {
                kind: 'Celular',
                rawNumber: '11 98109-0638',
                areaCode: '11',
                number: '981090638'
            }
        ],
        birth: new Date,
        meta: {
            created: new Date,
            modified: new Date
        }
    }
];

/*** Inicia o programa ***/
function startApplication(contentId){
    loadNavegacao();
    loadClients();
    div_listar.style.display = "block";
}

function loadNavegacao(){
    let div_listar = document.getElementById("div_listar");

    document.body.addEventListener("keydown", (event) => {
        if(event.keyCode == 38) moveUpTable();
        else if(event.keyCode == 40) moveDownTable();
        else if(event.keyCode == 13) enterTable();
    });
}

function moveUpTable(){
    let tabIndex = document.getElementById("tabIndex");
    if(parseInt(tabIndex.value) <= 0) return;

    let tabI = parseInt(tabIndex.value) - 1;
    selectRow(tabI);
    tabIndex.value = tabI;
}

function moveDownTable(){
    let table_body = document.getElementById("table_body");
    let rows = table_body.getElementsByTagName("tr");
    let tabIndex = document.getElementById("tabIndex");
    if(parseInt(tabIndex.value) >= rows.length - 1) return;

    let tabI = parseInt(tabIndex.value) + 1;
    selectRow(tabI);
    tabIndex.value = tabI;
}

function selectRow(tabI){
    let table_body = document.getElementById("table_body");
    let rows = table_body.getElementsByTagName("tr");

    Array.from(rows).forEach(function(row, index){
        if(row.getAttribute("tabindex") == tabI){
            row.style.fontWeight = "bold";
            console.log("bold");
        } else {
            row.style.fontWeight = "normal";
            console.log("normal");
        }
    });
}

function enterTable(){
    let tabIndex = document.getElementById("tabIndex");
    let client = clients[tabIndex.value];
    if(client) mostrarCliente(JSON.stringify(client));
}

/*************************************************
Carrega a tela de listar clientes
**************************************************/
function loadClients(){
    let div_cadastrar = document.getElementById("div_cadastrar");
    let div_listar = document.getElementById("div_listar");
    let table = document.getElementById("table_body");
    let tr;
    let td;

    clearTable();

    clients.forEach(function(client, index){
        tr = document.createElement("tr");
        tr.setAttribute("onclick", "mostrarCliente('"+JSON.stringify(client)+"')");
        tr.setAttribute("tabindex", index);
        if(index == 0) tr.style.fontWeight = "bold";

        td = document.createElement("td");
        td.innerHTML = client.id;
        tr.append(td);

        td = document.createElement("td");
        td.innerHTML = client.name.displayName;
        tr.append(td);

        td = document.createElement("td");
        td.innerHTML = client.email;
        tr.append(td);

        table.append(tr);
    });

    div_cadastrar.style.display = "none";
    //div_listar.style.display = "block";
}

/*************************************************
Limpa o corpo da tabela de mostrar os clientes
*************************************************/
function clearTable(){
    let tabIndex = document.getElementById("tabIndex");
    let table = document.getElementById("table_body");
    table.innerHTML = "";
    tabIndex.value = 0;
}

/*************************************************
Esconde a tela de mostrar os cliente e mostra a
tela de cadastrar cliente.
*************************************************/
function cadastrarCliente(){
    let div_cadastrar = document.getElementById("div_cadastrar");
    let div_listar = document.getElementById("div_listar");

    clearCadastrarCliente();

    div_cadastrar.style.display = "block";
    //div_listar.style.display = "none";
}

/*************************************************
Limpa os campos e reinicia a tela de cadastrar
cliente.
*************************************************/
function clearCadastrarCliente(){
    let inputs = document.getElementsByTagName("input");

    Array.from(inputs).forEach(function(input){
        input.value = "";
    });

    let div_telefones = document.getElementById("div_telefones");
    div_telefones.innerHTML = "";

    btnAddTelefone();
}

/*************************************************
Adiciona uma nova div para cadastrar um novo
telefone para o cliente.
*************************************************/
function btnAddTelefone(){
    let div_telefones = document.getElementById("div_telefones");
    let group_telefone = document.getElementsByClassName("group_telefone");

    let divGroup = document.createElement("div");
    divGroup.className = "group_telefone";

    let divInput = document.createElement("div");
    divInput.className = "input";

    let input = document.createElement("input");
    input.type = "text";
    input.required = true;
    input.setAttribute("onblur", "(validarTipoTelefone(this.value)) ? this.style.color = 'black' : this.style.color = 'red';");

    let label = document.createElement("label");
    label.innerHTML = "Tipo do telefone " + (group_telefone.length + 1);

    divInput.append(input);
    divInput.append(label);
    divGroup.append(divInput);

    divInput = document.createElement("div");
    divInput.className = "input";

    input = document.createElement("input");
    input.type = "text";
    input.required = true;
    input.setAttribute("onkeyup", "maskTelefone(this)");
    input.setAttribute("onblur", "(validarTelefone(this.value)) ? this.style.color = 'black' : this.style.color = 'red';");

    label = document.createElement("label");
    label.innerHTML = "Telefone " + (group_telefone.length + 1);

    divInput.append(input);
    divInput.append(label);
    divGroup.append(divInput);

    div_telefones.append(divGroup);
}

/*************************************************
Adiciona a mascara de CPF no campo informado por
parâmetro.
*************************************************/
function maskCpf(campo){
    if(campo.value.length > 14) {
        campo.value = campo.value.substr(0, 14);
        return;
    }
    let data = campo.value.replace(/\D/g, "");
    data = data.replace(/(\d{3})(\d)/, "$1.$2");
    data = data.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    data = data.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})$/, "$1.$2.$3-$4");
    campo.value = data;
}

/*************************************************
Adiciona a mascara de Data (dd/mm/aaaa) no campo
informado por parâmetro.
*************************************************/
function maskData(campo){
    if(campo.value.length > 10) {
        campo.value = campo.value.substr(0, 10);
        return;
    }
    let data = campo.value.replace(/\D/g, "");
    data = data.replace(/(\d{2})(\d)/, "$1/$2");
    data = data.replace(/(\d{2})\/(\d{2})(\d{1,4})/, "$1/$2/$3");
    campo.value = data;
}

/*************************************************
Adiciona a mascara de telefone no campo informado
por parâmetro.
*************************************************/
function maskTelefone(campo){
    if(campo.value.length > 13) {
        campo.value = campo.value.substr(0, 13);
        return;
    }

    let data = campo.value.replace(/\D/g, "");
    data = data.replace(/(\d{2})(\d)/, "$1 $2");
    data = data.replace(/(\d{2}) (\d{4})(\d)/, "$1 $2-$3");

    let patt = new RegExp(/(\d{2}) (\d{4})-(\d{5})$/);
    if(patt.test(data)){
        data = campo.value.replace(/\D/g, "");
        data = data.replace(/(\d{2})(\d{5})(\d{4})/, "$1 $2-$3");
    }

    campo.value = data;
}

/*************************************************
Se o nome for vazio, então retorna false.
*************************************************/
function validarNome(nome) {
    if(!nome || nome.trim() == "") return false;
    else return true;
}

/*************************************************
Se o sobrenome for vazio, então retorna false.
*************************************************/
function validarSobrenome(sobrenome) {
    if(!sobrenome || sobrenome.trim() == "") return false;
    else return true;
}

/*************************************************
Verifica se o e-mail é válido xxx@xxx.xx
*************************************************/
function validarEmail(email){
    let patt = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return patt.test(email);
}

/*************************************************
Verifica se o CPF é válido (000.000.000-0 ou
000.000.000-00)
*************************************************/
function validarCpf(cpf){
    let patt = new RegExp(/(\d{3})\.(\d{3})\.(\d{3})-(\d{1,2})/);
    return patt.test(cpf);
}

/*************************************************
Verifica se a data é válida (dd/mm/aaaa)
*************************************************/
function validarData(data){
    let patt = new RegExp(/(\d{2})\/(\d{2})\/(\d{4})/);
    return patt.test(data);
}

/*************************************************
Verifica se o telefone é válido (00 0000-0000 ou
00 00000-0000)
*************************************************/
function validarTelefone(telefone){
    let patt1 = new RegExp(/(\d{2}) (\d{4})-(\d{4})/);
    let patt2 = new RegExp(/(\d{2}) (\d{5})-(\d{4})/);
    let valido = true;
    if(!patt1.test(telefone) && !patt2.test(telefone)) valido = false;
    return valido;
}

/*************************************************
Verifica se o tipo de telefone está vazio.
*************************************************/
function validarTipoTelefone(tipoTelefone) {
    if(!tipoTelefone || tipoTelefone.trim() == "") return false;
    else return true;
}

/*************************************************
Cria o objeto cliente com os campos inseridos
pelo usuário e verifica se esse é um novo cliente
ou uma alteração de um cliente já existente.
Dependendo do que for, então chama o método
correto.
*************************************************/
function salvarCliente(){
    let valido = true;

    let id = document.getElementById("id_client");
    let nome = document.getElementById("txtNome");
    let sobrenome = document.getElementById("txtSobrenome");
    let cpf = document.getElementById("txtCpf");
    let email = document.getElementById("txtEmail");
    let nascimento = document.getElementById("txtDataNascimento");
    let telefones = getTelefones();

    if(!validarNome(nome.value)) valido = false;
    if(!validarSobrenome(sobrenome.value)) valido = false;
    if(!validarCpf(cpf.value)) valido = false;
    if(!validarEmail(email.value)) valido = false;
    if(!validarData(nascimento.value)) valido = false;

    if(!valido) return;

    let cliente = {
        id: (id_client.value == "") ? clients.length + 1 : parseInt(id_client.value),
        name: {
            surname: nome.value,
            familyname: sobrenome.value,
            displayName: nome.value + " " + sobrenome.value, // @dica, gerar
        },
        code: {
            securityCode: cpf.value.replace(/\D/g, "") // CPF
        },
        email: email.value,
        phones: telefones,
        birth: parseData(nascimento.value),
        meta: {
            created: new Date,
            modified: new Date
        }
    };

    if(id_client.value == "") saveClient(cliente);
    else updateClient(cliente);
    loadClients();
}

/*************************************************
Pega os telefones preenchidos pelo usuário e
retorna dentro de um array de telefones, já
formatado.
*************************************************/
function getTelefones(){
    let divs = document.getElementsByClassName("group_telefone");
    let telefones = [];
    let telefone = {};
    let inputTipo = null;
    let inputTelefone = null;
    let valido = true;

    Array.from(divs).forEach(function(div){
        inputTipo = div.getElementsByClassName("input")[0].getElementsByTagName("input")[0];
        inputTelefone = div.getElementsByClassName("input")[1].getElementsByTagName("input")[0];

        if(!validarTipoTelefone(inputTipo.value)) valido = false;
        if(!validarTelefone(inputTelefone.value)) valido = false;

        if(!valido) return false;

        telefone = {};
        telefone.kind = inputTipo.value;
        telefone.rawNumber = inputTelefone.value;
        telefone.areaCode = inputTelefone.value.replace(/\D/g, "").substr(0, 2);
        telefone.number = inputTelefone.value.replace(/\D/g, "").substr(2);

        telefones.push(telefone);
    });

    return telefones;
}

/*************************************************
Transforma o texto para tipo Date.
*************************************************/
function parseData(data){
    let dia = data.substr(0, 2);
    let mes = parseInt(data.substr(3, 2))-1;
    let ano = data.substr(6, 4);

    return new Date(ano, mes, dia, 0, 0, 0);
}

/*************************************************
Transforma o tipo Date para texto (dd/mm/aaaa)
*************************************************/
function formatData(date){
    let dateObj = new Date(date);
    let dia = dateObj.getDate();
    let mes = dateObj.getMonth() + 1;
    let ano = dateObj.getFullYear();

    if(dia < 10) dia = "0" + dia;
    if(mes < 10) mes = "0" + mes;

    return dia + "/" + mes + "/" + ano;
}

/*************************************************
Recebe um cliente por parâmetro e mostra na tela
de alterar cliente.
*************************************************/
function mostrarCliente(cliente){
    let div_cadastrar = document.getElementById("div_cadastrar");
    let div_listar = document.getElementById("div_listar");
    let clienteObj = JSON.parse(cliente);

    clearCadastrarCliente();

    document.getElementById("id_client").value = clienteObj.id;
    document.getElementById("txtNome").value = clienteObj.name.surname;
    document.getElementById("txtSobrenome").value = clienteObj.name.familyname;

    document.getElementById("txtCpf").value = clienteObj.code.securityCode;
    maskCpf(document.getElementById("txtCpf"));

    document.getElementById("txtEmail").value = clienteObj.email;
    document.getElementById("txtDataNascimento").value = formatData(clienteObj.birth);

    clienteObj.phones.forEach(function(phone, index){
        let group_telefones = document.getElementsByClassName("group_telefone");
        let group_telefone = group_telefones[group_telefones.length-1];
        let inputTipo = group_telefone.getElementsByClassName("input")[0].getElementsByTagName("input")[0];
        let inputTelefone = group_telefone.getElementsByClassName("input")[1].getElementsByTagName("input")[0];

        inputTipo.value = phone.kind;
        inputTelefone.value = phone.rawNumber;

        if(clienteObj.phones.length - 1 > index) btnAddTelefone();
    });

    div_cadastrar.style.display = "block";
    //div_listar.style.display = "none";
}

/*************************************************
Salva um novo cliente que é passado por parâmetro.
*************************************************/
function saveClient(client){
    clients.push(client);
}

/*************************************************
Altera um cliente que é passado por parâmetro.
Usa o id do cliente para encontrar o registro do
mesmo na base de clientes.
*************************************************/
function updateClient(client){
    let index = clients.findIndex(c => c.id == client.id);
    if(index < 0) return;

    clients[index] = client;
}
