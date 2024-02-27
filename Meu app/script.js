const key = "43ceb280f8e2b86f384be94598a77f21"

function colocardadosnatela(dados){

    document.querySelector(".clima").innerHTML = dados.weather[0].description
    document.querySelector(".umidade").innerHTML = "Umidade: "+ dados.main.humidity + "%";
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C";
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name
    document.querySelector(".img-temp").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
    console.log(dados)
}

async function buscarCidade(cidade) {

    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json());
    
    colocardadosnatela(dados)
}

function cliqueinobotao(){
    const cidade=document.querySelector(".input-cidade").value
    
    buscarCidade(cidade)
}