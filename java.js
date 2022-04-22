let quizzes;

let quizzesdoUsuario = ["lala","lalala"];
const API = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';
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

//As funções add e remove não estão funcionando como deveriam na hora de esconder as div
iniciar();

function iniciar(){
    if(quizzesdoUsuario.length===0){
       const escondido = document.querySelector(".inicioquizz");
       escondido.classList.remove("escondido"); 
      } else { 
               const escondido = document.querySelector(".quizzCriado");                
               escondido.classList.remove("escondido"); 
               console.log(escondido);

    }
    pegarQuizz();
}

function mostrarErro(){
    alert('Deu algum erro :(');s
}

function newQuizz(){
    
    escondido = document.querySelector(".inicioquizz");
    escondido.classList.remove("inicioquizz")
    escondido.classList.add("escondido");
    const caixa = document.querySelector(".caixa");    
    caixa.classList.add("escondido");
    const quizzCriado = document.querySelector(".quizzCriado");
    quizzCriado.classList.add("escondido");

}



