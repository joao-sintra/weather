//const apiKey = "3b465f1655e28cd3f0c1d9d517a22955";

//elementos da pagina dos detalhes
const dataHora = document.querySelector("#data-hora");
const queryString = window.location.search; // pega na string do url
const urlParams = new URLSearchParams(queryString); // separa os parametros da string
const cidade = urlParams.get("cidade"); // retira apenas a cidade do get
console.log(cidade);
descNomeCidade.innerHTML = cidade;

//--------------------------- Data e hora atual ------------------------//
var hoje = new Date();
const nomeMeses = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
var data = hoje.toLocaleString('pt-pt', { hour: 'numeric', minute: 'numeric' }) + " " + (nomeMeses[hoje.getMonth()] + ' ' + hoje.getDate());

dataHora.innerHTML = data;
//---------------------------------//------------------------------------//

function colocaMaiuscula(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getPontoCardial(angulo) {
  const direcoes = ['⬆️ N', '↗️ NE', '➡️ E', '↘️ SE', '⬇️ S', '↙️ SW', '⬅️ W', '↖️ NW'];
  return direcoes[Math.round(angulo / 45) % 8];//Dividi a roda dos ventos em 8 partes iguais (360/8 =45)
}

let mostraDetalhesWeather = {
  fetchWeather: function (cidade, unidades) {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      cidade +
      "&units="+unidades+"&lang=pt&appid=" +
      apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    if (data.cod == 404) {
      console.log("erro");
    }
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp } = data.main;
    const { feels_like } = data.main;
    const { humidity } = data.main;
    const { pressure } = data.main;
    const { speed } = data.wind;
    const { deg } = data.wind;
    const { all } = data.clouds;
    const { lat } = data.coord;
    const { lon } = data.coord;
    const { country } = data.sys;

    let simboloUnidadesTemperatura=" ºC";
    let simboloUnidadesVelocidade=" Km/H";
    if(unidades=="imperial"){
      simboloUnidadesTemperatura=" ºF"
      simboloUnidadesVelocidade=" Mph";
    }

    descNomeCidade.innerHTML = name + ", " + "<img src='https://flagsapi.com/" + country + "/flat/48.png'>";
    descImagem.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    descClima.innerHTML = colocaMaiuscula(description);
   
      
    descTemperatura.innerHTML = temp + simboloUnidadesTemperatura
    descSensacaoTermica.innerHTML = "Sensação térmica: " + feels_like + simboloUnidadesTemperatura
    descVento.innerHTML = speed + simboloUnidadesVelocidade;
    descDirecaoVento.innerHTML = getPontoCardial(deg);
    descPressaoAtmosferica.innerHTML = pressure + " hPa";
    descNuvens.innerHTML = all + " %"
    descHumidade.innerHTML = humidity + " %";
    descCordenadasGeograficas.innerHTML = "Latitude: " + lat + "  Longitude: " + lon;

    //descClima.innerHTML = ;
    /*document.querySelector("#cidade" + name).innerHTML = name;
      document.querySelector("#temp" + name).innerHTML = temp + " ºC";
      document.querySelector("#imagem" + name).src =
        "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      document.querySelector("#clima" + name).innerHTML =
        colocaMaiuscula(description);*/

    //-----------Caso a local storage esteja vazia, o icon do coração fica preto, else (viceversa)-------------//
    let favoritos = carregarFavoritos();
    descIcon.setAttribute("data-cidade", name + ", " + country);

    if (favoritos.indexOf(name + ", " + country) === -1) {
      descIcon.src = "img/favorito_preto.png"

    }
    else {
      descIcon.src = "img/favorito_vermelho.png";
    }
  },
};


if(cidade != null) {
  mostraDetalhesWeather.fetchWeather(cidade, unidades);
}else
mostraDetalhesWeather.fetchWeather("Lisboa", unidades);

/*-------pesquisa das cidades à escolha do utilizador, conforme o que é escrito na (#textbox)-----*/

$("#search-addon").click(function (e) {
  e.preventDefault();
  var valorPesquisa = document.querySelector("#textbox").value;
  console.log(valorPesquisa);
  //descNomeCidade.innerHTML = valorPesquisa;
  //window.location.href = "detalhes.html";

  //mostraDetalhesWeather.fetchWeather(document.querySelector("#textbox").value);
});
