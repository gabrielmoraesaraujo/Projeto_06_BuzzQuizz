let quizzes;
const API = 'https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes';
let tela1;
let containerPrincipal = document.querySelector('.containerprincipal');

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
    if(true){
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
                <ion-icon name="add-circle" onclick="chamarTela2()"></ion-icon>
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
    // Desktop 8 Página de Criar as informações básicas do Quizz (Titulo, URL..) 
    containerPrincipal.innerHTML = 
    `
        <div class="informacoes-basicas">
            <div class="frase">Comece pelo começo</div>
            <form action="">
                <input type="text" class="titulo-form" placeholder="Titulo do seu quizz">
                <input type="url" class="url-form" placeholder="URL da imagem do seu quizz">
                <input type="text" class="qnt-perguntas-form" placeholder="Quantidade de perguntas do quizz">
                <input type="text" class="qnt-niveis-form" placeholder="Quantidade de níveis do quizz">
            </form>
            <div class="button-form" onclick="chamarCriarPerguntas()">Prosseguir pra criar perguntas</div>
        </div>
    `
}

// É chamado quando o usuario clica
function chamarCriarPerguntas(){
    containerPrincipal.innerHTML = 
`
        <div class="desktop-9">
            <div class="frase">Crie suas perguntas</div>
            <div class="pergunta">
                <div class="numero-pergunta">Pergunta 1</div>
                <form action="">
                    <!-- Texto e cor da pergunta -->
                    <div class="mini-container">
                        <input type="text" placeholder="Texto da pergunta">
                        <input type="text" placeholder="Cor de fundo da pergunta">
                    </div>
                    <div class="mini-container">
                        <label for="">Resposta correta</label>
                        <input type="text" placeholder="Resposta correta">
                        <input type="url" placeholder="URL da imagem">
                    </div>
                    <div class="mini-container">
                        <label for="">Respostas incorretas</label>
                        <input type="text" placeholder="Resposta incorreta 1">
                        <input type="text" placeholder="URL da imagem 1">
                    </div>
                    <div class="mini-container">
                        <input type="text" placeholder="Resposta incorreta 2">
                        <input type="text" placeholder="URL da imagem 2">
                    </div>
                    <div class="mini-container">
                        <input type="text" placeholder="Resposta incorreta 3">
                        <input type="text" placeholder="URL da imagem 3">
                    </div>
                </form>

            </div>
            <div class="button-perguntas" onclick="chamarQuizzPronto()">Prosseguir para criar níveis</div>
        </div>
    `
}

function chamarQuizzPronto(){
    containerPrincipal.innerHTML = `
    <div class="quizz-pronto">
        <div class="frase">Seu quizz está pronto</div>
        <div class="capa-quizz">
            <img src="https://i.pinimg.com/originals/ca/97/0c/ca970c047555f02f4bb0a2cb73e0b013.jpg" alt="">
            <span class="titulo-quizz">O quão você conhece de carros ?</span>
        </div>
        <div class="botao-acessar">Acessar Quizz</div>
        <div class="voltar-home" onclick="iniciarPagina()">Voltar pra home</div>
    </div>
    `
}


iniciarPagina();