let quizzes;
const API = 'https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes';
let tela1;
let containerPrincipal = document.querySelector('.containerprincipal');
let questions = 0;
let levels = 0;
let  meuQuizz = {}; 
let promise = 0;
let array = [];
let id = [];

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
            <div class="naocriouquizz">Voc?? n??o criou nenhum <spnan>quizz ainda :(</spnan></div>
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
                <li class="quizz" onclick="pegarId(${resposta.data[i].id})">
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

function pegarId(resposta){
    axios.get(`${API}/${resposta}`).then(chamarResponderQuizz)

}


// Quando clica nos bot??es de criar novos quizzes
function chamarTela2(){ 
    // Desktop 8 P??gina de Criar as informa????es b??sicas do Quizz (Titulo, URL..) 
    containerPrincipal.innerHTML = 
    `
        <div class="informacoes-basicas">
            <div class="frase">Comece pelo come??o</div>
            <form action="">
                <input type="text" class="titulo-form" placeholder="Titulo do seu quizz">
                <input type="url" class="url-form" placeholder="URL da imagem do seu quizz">
                <input type="text" class="qnt-perguntas-form" placeholder="Quantidade de perguntas do quizz">
                <input type="text" class="qnt-niveis-form" placeholder="Quantidade de n??veis do quizz">
            </form>
            <div class="button-form" onclick="verificarInforma????es()">Prosseguir pra criar perguntas</div>
        </div>
    `
}

function verificarInforma????es(){
    let text1 = document.querySelector('.titulo-form').value;
    let url = document.querySelector('.url-form').value;
    questions = document.querySelector('.qnt-perguntas-form').value;
    levels = document.querySelector('.qnt-niveis-form').value;

    meuQuizz = { 
        title: text1,
        image: url,
        questions:0,
        levels:0};

   
if(text1.length>=20 && text1.length<=65){
    if(true){  //condi????o da url, como verificar se ?? uma url ? n??o sei
        if(questions>=3){
            if(levels>=2){
                chamarCriarPerguntas()
            } else alert('Quantidade minima de Niveis deve ser 2');
        } else alert('Quantidade minima de perguntas deve ser 3');
      } else alert('Insira um url valida');
    } else alert("Seu titulo deve ter mais do que 20 e menos que 65 caracteres");

}

// ?? chamado quando o usuario clica
function chamarCriarPerguntas(){

    containerPrincipal.innerHTML = 
`
        <div class="desktop-9">
            <div class="frase">Crie suas perguntas</div>
            <div class="pergunta"></div>
            <div class="button-perguntas" onclick="verificarPerguntas()">Prosseguir para criar n??veis</div>
        </div> `
    
    for(i=1; i<=questions; i++){
       
    let frase = document.querySelector('.pergunta')
    frase.innerHTML += `
                
                <div class="numero-pergunta">Pergunta ${i}</div>
                <form action="">
                    <!-- Texto e cor da pergunta -->
                    <div class="mini-container">
                        <input type="text" class="question${i}" placeholder="Texto da pergunta">
                        <input type="text" class ="corFundo${i}"placeholder="Cor de fundo da pergunta">
                    </div>
                    <div class="mini-container">
                        <label for="">Resposta correta</label>
                        <input type="text" class="textoResposta${i}"placeholder="Resposta correta">
                        <input type="url" placeholder="URL da imagem">
                    </div>
                    <div class="mini-container">
                        <label for="">Respostas incorretas</label>
                        <input type="text" class="textoErradaum${i}" placeholder="Resposta incorreta 1">
                        <input type="text" placeholder="URL da imagem 1">
                    </div>
                    <div class="mini-container">
                        <input type="text" class="textoErradadois${i}" placeholder="Resposta incorreta 2">
                        <input type="text" placeholder="URL da imagem 2">
                    </div>
                    <div class="mini-container">
                        <input type="text" class="textoErradatres${i}" placeholder="Resposta incorreta 3">
                        <input type="text" placeholder="URL da imagem 3">
                    </div>
                </form>
    `}
}

function verificarPerguntas(){
    let vetor = [];
    let answers_local =[];

    for(i=1; i<=questions; i++){
        
        let textoPergunta = document.querySelector('.question'+i);
        if(textoPergunta.value.length<20){
            alert('O texto da pergunta deve ter mais que 20 caracteres');
        }else {
        textoPergunta.classList.add("checado");           
        let corFundo = document.querySelector('.corFundo'+i);

        if(corFundo.value[0]!=='#' || corFundo.value.length>7 || corFundo.value.length<7){
            alert('A cor deve ser no formato hexadecimal, come??ando com # seguida de no m??ximo 6 caracteres');
        }else{
        if(false){

        }else{
        let textoResposta = document.querySelector('.textoResposta'+i);
        if(textoResposta.value === ''){
            alert('O campo de resposta n??o pode estar vazio');
        }else { 
            textoResposta.classList.add("checado");


            let cont =0;
            
                    let textoErrada = document.querySelector('.textoErradaum'+i);             
                    if(textoErrada.value === textoResposta.value){
                        cont++;
                    answers_local.push({text: textoErrada,
                    image: "https://http.cat/411.jpg",
                    isCorrectAnswer: true});
                     }else{ answers_local.push({text: textoErrada,
                            image: "https://http.cat/411.jpg",
                            isCorrectAnswer: false});
                     }
                     let textoErrada2 = document.querySelector('.textoErradadois'+i);             
                    if(textoErrada2.value === textoResposta.value){
                        cont++;
                    answers_local.push({text: textoErrada2,
                    image: "https://http.cat/411.jpg",
                    isCorrectAnswer: true});
                     }else{ answers_local.push({text: textoErrada2,
                            image: "https://http.cat/411.jpg",
                            isCorrectAnswer: false});
                     }
                     let textoErrada3 = document.querySelector('.textoErradatres'+i);             
                    if(textoErrada3.value === textoResposta.value){
                        cont++;
                    answers_local.push({text: textoErrada3,
                    image: "https://http.cat/411.jpg",
                    isCorrectAnswer: true});
                     }else { answers_local.push({text: textoErrada3,
                             image: "https://http.cat/411.jpg",
                             isCorrectAnswer: false});
                     }                   
            
            if(cont===3){   
                alert('O quizz deve ter ao menos uma resposta incorreta')
                return;
              }
           
            
             
            vetor.push(  {
                title: textoPergunta.value,
                color: corFundo.value,
                answers: answers_local})        
            
         }

        }  
      }
     } 
       
    }
    meuQuizz.questions = vetor;   
    chamarNiveis(); 
}   


function chamarNiveis(){
    containerPrincipal.innerHTML = `
    <div class="desktop-10">
                <div class="frase">Agora, decida os n??veis</div>
                <div class="pergunta"></div>
                <div class="button-perguntas" onclick="verificarNiveis()">Finalizar Quizz</div>
            </div>
                `
                for(i=1; i<=levels; i++){
                    let level = document.querySelector('.pergunta')
                    level.innerHTML +=  
                    `<div class="numero-pergunta">N??vel ${i}</div>
                    <form action="">
                        <div class="mini-container">
                            <input type="text" class="tituloNivel${i}" placeholder="T??tulo do n??vel">
                            <input type="text" class="porcentagem${i}" placeholder="% de acerto m??nima">
                            <input type="text" placeholder="URL da imagem do n??vel">
                            <input type="text" class="descricaoNivel${i}" placeholder="Descri????o do n??vel">
                        </div>
                    </form>
                    <!-- <div class="pergunta icon">
                        <div class="numero-pergunta">N??vel 2</div>
                        <ion-icon name="create-outline" onclick="animeNiveis()"></ion-icon>
                    </div>
                    <div class="pergunta icon">
                        <div class="numero-pergunta">N??vel 3</div>
                        <ion-icon name="create-outline" onclick="animeNiveis()"></ion-icon>
                    </div>   -->       
    `
                }  
                
}   

function verificarNiveis(){
    let vetor =[];
    let cont =0;
    let tituloNivel =0;
    let porcentagem =0;
    let descricaoNivel =0;

  
    for(i=1; i<=levels; i++){
      tituloNivel = document.querySelector('.tituloNivel'+i);
        if(tituloNivel.value.length<10){
            alert('O titulo deve ter no minimo 10 caracteres')
        }else{
               porcentagem = document.querySelector('.porcentagem'+i);
            if(parseInt(porcentagem.value)<0 || parseInt(porcentagem.value)>100){
                alert('% de acerto m??nima deve ser um n??mero entre 0 e 100')
            }else{
                if(false){

                }else {
                    
                       descricaoNivel = document.querySelector('.descricaoNivel'+i);
                    if(descricaoNivel.value.length<30){
                        alert('Descri????o do n??vel deve ter no m??nimo de 30 caracteres')
                    }else {                 
                            let porcentagem2 = document.querySelector('.porcentagem'+i);
                            if(parseInt(porcentagem2.value) === 0){
                                cont++;
                            }                          
                        }
                 }
            }
        }
        vetor.push({
            title: tituloNivel.value,
            image: 0,
            text: descricaoNivel.value,
            minValue: porcentagem.value
        })
     meuQuizz.level=vetor;

    } 
    if(cont>0){
        
        chamarQuizzPronto();
     }else{
         alert('?? obrigat??rio existir pelo menos 1 n??vel cuja % de acerto m??nima seja 0%')
         return;
     }
}

function chamarQuizzPronto(){
   

    containerPrincipal.innerHTML = `
    <div class="quizz-pronto">
        <div class="frase">Seu quizz est?? pronto</div>
        <div class="capa-quizz">
            <img src="https://i.pinimg.com/originals/ca/97/0c/ca970c047555f02f4bb0a2cb73e0b013.jpg" alt="">
            <span class="titulo-quizz">O qu??o voc?? conhece de carros ?</span>
        </div>
        <div class="botao-acessar">Acessar Quizz</div>
        <div class="voltar-home" onclick="iniciarPagina()">Voltar pra home</div>
    </div>
    `
    promise = axios.post('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes',meuQuizz);
    promise.then(tratarsucesso);
    
}
//Armazenando quizzes do usuario
function tratarsucesso(retorno){
    array.push(retorno.data.id);  
    const exemploSerializado = JSON.stringify(array);
    localStorage.setItem("lista", exemploSerializado);  
}

// Fun????o de anima????o de edi????o da cria????o de perguntas
function animeNiveis(){
    tirarIcon()
    const abrirContainer = document.querySelector('.numero-pergunta');
    abrirContainer.innerHTML =
    `
    <form action="">
        <div class="mini-container">
            <input type="text" placeholder="T??tulo do n??vel">
            <input type="text" placeholder="% de acerto m??nima">
            <input type="text" placeholder="URL da imagem do n??vel">
            <input type="text" placeholder="Descri????o do n??vel">
        </div>
    </form>
    `
}



function chamarResponderQuizz(id){
    console.log(id.data)
    containerPrincipal.innerHTML = `
        <div class="caixa-destop9">
                <div class="subcaixa-tema">
                    <img src="${id.data.image}" alt="">
                    <span class="">${id.data.title}</span>
                </div>
                <div class="subcaixa-pergunta">
                    <div class="titulo-pergunta">${id.data.questions[0].title}</div>
                    <div class="perguntas">
                        <div class="imagem-pergunta">
                            <img src="https://images.adsttc.com/media/images/6238/5b71/3e4b/31a8/5c00/0049/newsletter/rodrigo-kugnharski-pdWc5wm1STw-unsplash.jpg?1647860579" alt="">
                            <span>Paris</span>
                        </div>
                        <div class="imagem-pergunta">
                            <img src="https://noomis-files-hmg.s3.amazonaws.com/content/3ad37040-6b16-11eb-8cc6-07de2463a625.jpeg" alt="">
                            <span>Suel</span>
                        </div>
                        <div class="imagem-pergunta">
                            <img src="https://www.melhoresdestinos.com.br/wp-content/uploads/2019/02/passagens-aereas-brasilia-capa2019-01-820x430.jpg" alt="">
                            <span>Brasilia</span>
                        </div>
                        <div class="imagem-pergunta">
                            <img src="https://www.melhoresdestinos.com.br/wp-content/uploads/2019/02/passagens-aereas-nova-york-capa2019-06.jpg" alt="">
                            <span>Nova York</span>
                        </div>
                    </div>
                    
        

    `
}

iniciarPagina();
