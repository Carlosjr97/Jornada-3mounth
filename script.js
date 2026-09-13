// pegando os elementos da tela2.html pelo id
const imgCasaChegando = document.getElementById("imgCasaChegando");
const imgCorrendo = document.getElementById("imgCorrendo");
const btnEncerrar = document.getElementById("btnEncerrar");
const imgPersonagem = document.getElementById("imgPersonagem");
const imgPop = document.getElementById("imgPop");
const btnSubanamoto = document.getElementById("btnSubanamoto");
const relogio = document.getElementById("relogio"); // document.getElementById("relogio") -> busca na página tela2.html o elemento com id="relogio" e guarda na variável (relogio).
const imgDormindo = document.getElementById("imgDormindo"); // document.getElementById("imgDormindo") -> busca na página tela2.html o elemento com id="imgDormindo" pela tag <img> que mostra dormindo.png e guarda na variável (imgDormindor).
const btnAcordar = document.getElementById("btnAcordar"); // pega o botão "Acordar". addEventListener("click", function () {...}) 
// -> registra uma função que só executa quando o botão é clicado. relogio.textContent = "5:30"` -> substitui o texto de dentro da <div> do relógio. imgDormindo.src por = "assets/acordou.png" 
// -> troca o caminho da imagem exibida, então o personagem "dormindo" passa a aparecer com a img "acordado".

// só roda a lógica do botão se ele existir na página (evita erro em outras telas)
if (btnAcordar) {
    btnAcordar.addEventListener("click", function () {
        relogio.textContent = "5:30";
        imgDormindo.src = "assets/acordou.png";
        // troca a classe para poder dar um tamanho/posição próprios à imagem acordada,
        // já que ela não preenche a mesma caixa (400x150) do mesmo jeito que a dormindo
        imgDormindo.classList.remove("dormindo");
        imgDormindo.classList.add("acordado");

        setTimeout(function () {
            window.location.href = "tela3.html";
        }, 2000);
        });
    };

    // só roda essa lógica se os elementos existirem nessa página (tela3)
if (btnSubanamoto) {
    btnSubanamoto.addEventListener("click", function () {
        btnSubanamoto.disabled = true; // evita clicar de novo enquanto anda

        // posição atual do personagem e posição alvo (onde a pop está), em pixels
        let posAtual = parseFloat(getComputedStyle(imgPersonagem).left);
        const posAlvo = parseFloat(getComputedStyle(imgPop).left);

        const passo = 10;   // quantos pixels ele anda a cada "tick"
        let frame = 1;      // controla qual perna/imagem mostrar

        const andando = setInterval(function () {
            posAtual += passo;
            imgPersonagem.style.left = posAtual + "px"; // move o personagem

            // alterna entre andando1.png e andando2.png (efeito de passos)
            imgPersonagem.src = frame === 1 ? "assets/andando1.png" : "assets/andando2.png";
            frame = frame === 1 ? 2 : 1;

            // chegou (ou passou) da posição da pop?
            if (posAtual >= posAlvo) {
                clearInterval(andando); // para o loop
                window.location.href = "tela4.html"; // troca de tela
            }
        }, 150); // repete a cada 150 milissegundos
    });
}

if (btnEncerrar) {
    btnEncerrar.addEventListener("click", function () {
        btnEncerrar.disabled = true; // evita clicar de novo

        // o dia passou: fundo vira uma cor sólida
        document.body.style.background = "#AEB8C5";

        // moto continua em "correndo.png" — só troca quando a casa chegar
        imgCasaChegando.classList.add("chegou"); // dispara a transition do CSS
    });
}

// dispara quando a transition do CSS da casa termina (ela "chegou")
if (imgCasaChegando) {
    imgCasaChegando.addEventListener("transitionend", function () {
        imgCorrendo.src = "assets/pop.png"; // moto estacionada
        setTimeout(function () {
            window.location.href = "tela5.html";
        }, 2000);

    });
}

// ----- Tela 5: candidatura / contato -> gameover -----
const imgLendo = document.getElementById("imgLendo");
const btnCandidatar = document.getElementById("btnCandidatar");
const btnContato = document.getElementById("btnContato");
const gameover = document.getElementById("gameover");
const gameoverMensagem = document.getElementById("gameoverMensagem");
const btnTentarNovamente = document.getElementById("btnTentarNovamente");
const btnProximoDia = document.getElementById("btnProximoDia");

// troca a imagem para "digitando", espera 1 segundo e mostra o gameover com a mensagem recebida
function mostrarGameOver(mensagem) {
    imgLendo.src = "assets/digitando.png";

    setTimeout(function () {
        gameoverMensagem.textContent = mensagem;
        gameover.classList.add("mostrar");
    }, 1000);
}

if (btnCandidatar) {
    btnCandidatar.addEventListener("click", function () {
        mostrarGameOver("Após a análise das etapas realizadas, neste momento, não seguiremos com sua candidatura para as próximas fases do processo seletivo.");
    });
}

if (btnContato) {
    btnContato.addEventListener("click", function () {
        mostrarGameOver("Vácuo eterno");
    });
}

if (btnTentarNovamente) {
    btnTentarNovamente.addEventListener("click", function () {
        gameover.classList.remove("mostrar");
        imgLendo.src = "assets/lendo.png"; // volta pro estado inicial da tela5
    });
}

if (btnProximoDia) {
    btnProximoDia.addEventListener("click", function () {
        window.location.href = "tela2.html"; // reinicia o jogo na tela2
    });
}