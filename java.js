let quizzes;
const API = 'https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes';
let tela1;

function iniciarPagina(){  
    tela1 = document.querySelector('.containerprincipal');
    console.log(tela1);
    pegarQuizz();
    tela1.innerHTML = 
    `   
        ${verificaQuizzUsuario()}
        <div class="tela1">
            
            <!-- Onde fica todos os Quizz -->
            <div class="caixa">
                <div class="textoquizzes">Todos os Quizzes</div>
                <ul class="novosQuizzes">

                </ul>
            </div>
        </div>
    `
}

function verificaQuizzUsuario(){
    if(false){
        return usuarioTemQuizz();
    }else{
        return usuarioNaoTemQuizz();
    }
}

function usuarioTemQuizz(){
    return `
        <div class="quizzCriado">
            <div class="quizzUsuario">
                <h4>Seus Quizzes</h4>
                <ion-icon name="add-circle" onclick="chamar()"></ion-icon>
            </div>
            <ul class="quizzesdoUsuario">
                <li class="quizz">
                    <img src="https://poltronanerd.com.br/wp-content/uploads/2022/02/poltrona-futura-nova-temporada.jpg">
                    <div>Futurama Muito brabo</div>
                </li> 

                <li class="quizz">
                    <img src="https://poltronanerd.com.br/wp-content/uploads/2022/02/poltrona-futura-nova-temporada.jpg">
                    <div>Futurama Muito brabo</div>
                </li> 

                <li class="quizz">
                    <img src="https://poltronanerd.com.br/wp-content/uploads/2022/02/poltrona-futura-nova-temporada.jpg">
                    <div>Futurama Muito brabo</div>
                </li> 
                    
            </ul>
        </div>
    `
}

function usuarioNaoTemQuizz(){
    return `
        <div class="inicioquizz">
            <div class="naocriouquizz">Você não criou nenhum <spnan>quizz ainda :(</spnan></div>
            <button class="criarquizz" onclick="chamarTela2()"> Criar Quizz</button>
        </div>
    `
}

function mostrarQuizz(resposta){
    const caixa = document.querySelector('.novosQuizzes');
    for(let i = 0; i < resposta.data.length; i++){
        if(i >= 6){
            return;
        }  
        caixa.innerHTML += `
                <li class="quizz">
                    <img src="${resposta.data[i].image}">
                    <div>${resposta.data[i].title}</div>
                </li>   
            `
    }
    
}

// pega os quizz salvos na API
function pegarQuizz(){
    quizzes = axios.get(API);
    quizzes.then(mostrarQuizz);
    quizzes.catch(mostrarErro);
}

function mostrarErro(){
    alert('Deu algum erro :(');
}


// Quando clica nos botões de criar novos quizzes
function chamarTela2(){
    removerTela1() 
    const tela2 = document.querySelector('.containerprincipal');
    // Desktop 8 Página de Criar as informações básicas do Quizz (Titulo, URL..) 
    tela2.innerHTML = 
    `
        <div class="informacoes-basicas">
            <div class="frase">Comece pelo começo</div>
            <form action="">
                <input type="text" class="titulo-form" placeholder="Titulo do seu quizz">
                <input type="url" class="url-form" placeholder="URL da imagem do seu quizz">
                <input type="text" class="qnt-perguntas-form" placeholder="Quantidade de perguntas do quizz">
                <input type="text" class="qnt-niveis-form" placeholder="Quantidade de níveis do quizz">
            </form>
            <div class="button-form">Prosseguir pra criar perguntas</div>
        </div>
    `
}
// É chamado sempre que executa a função chamarTela2
function removerTela1(){
    const tela1 = document.querySelector('.tela1');
    tela1.classList.add('escondido');
}





iniciarPagina();