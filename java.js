let quizzes;
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
pegarQuizz();
function mostrarErro(){
    alert('Deu algum erro :(');
}







