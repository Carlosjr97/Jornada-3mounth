# Guia: relógio + botão "Acordar" na tela2

Objetivo: mostrar um relógio marcando **5:29** na `tela2.html`. Ao clicar no botão
"Acordar", o relógio muda para **5:30** e a imagem `dormindo.png` é trocada por
`acordou.png`.

Você já tem a estrutura pronta (`tela2.html`, `tela2.css`) e o `<script src="script.js">`
já está linkado no fim do `tela2.html` — só falta criar esse arquivo `script.js`,
que ainda não existe no projeto.

---

## Passo 1 — HTML: adicionar o relógio

Abra `tela2.html` e adicione um elemento para o relógio. Pode ser logo acima do
botão "Acordar". Dê um `id` a ele para conseguirmos manipular pelo JavaScript
depois:

```html
<div id="relogio" class="relogio">5:29</div>

<button id="btnAcordar">
    Acordar
</button>
```

Repare que o `id="relogio"` é o que o JavaScript vai usar para achar esse elemento
e trocar o texto dele. A `class="relogio"` é só para estilizar no CSS.

Também dê um `id` para a imagem "dormindo", porque o JavaScript vai precisar trocar
o `src` dela:

```html
<img
    src="assets/dormindo.png"
    alt="Dormindo"
    class="dormindo"
    id="imgDormindo"
    >
```

---

## Passo 2 — CSS: estilizar o relógio

No `tela2.css`, adicione uma classe `.relogio` parecida com o estilo que você já
usou no botão (fonte grande, pixelada, cor branca):

```css
.relogio {
    position: absolute;
    top: 8%;

    font-size: 48px;
    font-weight: bold;
    color: white;

    image-rendering: pixelated;
}
```

Ajuste `top` / `left` / `right` como preferir para posicionar o relógio na tela
(por exemplo, no canto da janela).

---

## Passo 3 — JavaScript: criar `script.js`

Crie o arquivo `script.js` na raiz do projeto (mesma pasta do `index.html`). Ele
precisa fazer duas coisas quando o botão for clicado:

1. Trocar o texto do relógio de `5:29` para `5:30`.
2. Trocar o `src` da imagem de `assets/dormindo.png` para `assets/acordou.png`.

```javascript
// pega os elementos da tela pelo id
const relogio = document.getElementById("relogio");
const imgDormindo = document.getElementById("imgDormindo");
const btnAcordar = document.getElementById("btnAcordar");

// só roda a lógica do botão se ele existir na página (evita erro em outras telas)
if (btnAcordar) {
    btnAcordar.addEventListener("click", function () {
        relogio.textContent = "5:30";
        imgDormindo.src = "assets/acordou.png";
    });
}
```

### Explicação linha por linha

- `document.getElementById("relogio")` → busca na página o elemento com
  `id="relogio"` (o `<div>` do Passo 1) e guarda na variável `relogio`.
- `document.getElementById("imgDormindo")` → mesma ideia, mas pega a tag `<img>`
  que hoje mostra `dormindo.png`.
- `document.getElementById("btnAcordar")` → pega o botão "Acordar".
- `addEventListener("click", function () {...})` → registra uma função que só
  executa quando o botão é clicado.
- `relogio.textContent = "5:30"` → substitui o texto de dentro do `<div>` do
  relógio.
- `imgDormindo.src = "assets/acordou.png"` → troca o caminho da imagem exibida,
  então a pessoa "dormindo" passa a aparecer "acordada".

---

## Passo 4 — Linkar o `script.js` (conferir)

O `tela2.html` já tem esta linha no final do `<body>`:

```html
<script src="script.js"></script>
```

Como o arquivo `script.js` ainda não existia, é só criá-lo com o conteúdo do
Passo 3 na mesma pasta do `index.html`/`tela2.html` que o link já vai funcionar.

---

## Passo 5 — Testar

1. Abra `tela2.html` no navegador (duplo clique ou "Abrir com" → navegador).
2. Confirme que aparece o relógio marcando `5:29`.
3. Clique em "Acordar".
4. Confirme que:
   - o relógio muda para `5:30`;
   - a imagem muda de `dormindo.png` para `acordou.png`.

Se nada acontecer ao clicar, abra o Console do navegador (F12 → aba "Console")
e veja se aparece algum erro — geralmente é `id` escrito diferente entre o HTML
e o JavaScript (os nomes precisam ser idênticos, com o mesmo uso de maiúsculas
e minúsculas).

---

## Passo 6 — Esperar 2 segundos e ir para a tela3

Depois de trocar a hora e a imagem, você quer esperar 2 segundos e então navegar
para `tela3.html`. Para "esperar" sem travar a página, o JavaScript usa a função
`setTimeout`.

No `script.js`, dentro do `addEventListener("click", ...)`, adicione o
`setTimeout` **depois** das linhas que já trocam o relógio e a imagem:

```javascript
btnAcordar.addEventListener("click", function () {
    relogio.textContent = "5:30";
    imgDormindo.src = "assets/acordou.png";
    imgDormindo.classList.remove("dormindo");
    imgDormindo.classList.add("acordado");

    // espera 2000 milissegundos (2 segundos) e só depois troca de página
    setTimeout(function () {
        window.location.href = "tela3.html";
    }, 2000);
});
```

### Explicação

- `setTimeout(funcao, tempoEmMs)` → agenda a execução de `funcao` depois de
  `tempoEmMs` milissegundos. **Importante:** ele não pausa o código — as linhas
  de cima (trocar relógio e imagem) já rodam na hora; só o que está *dentro* do
  `setTimeout` fica esperando os 2 segundos.
- `2000` → é o tempo em milissegundos (1000 ms = 1 segundo, então 2000 ms = 2
  segundos).
- `window.location.href = "tela3.html"` → é o comando que troca a página atual
  pela `tela3.html`, exatamente como clicar num link.

Assim, na prática: clicou → hora e imagem mudam na mesma hora → 2 segundos depois
→ a tela muda para `tela3.html`.

### Dica opcional: evitar clique duplo

Se a pessoa clicar em "Acordar" mais de uma vez rápido, o `setTimeout` dispara
mais de uma vez (sem problema grave aqui, pois todos levam para a mesma
`tela3.html`, mas é uma boa prática). Para evitar, desative o botão assim que
for clicado:

```javascript
btnAcordar.addEventListener("click", function () {
    btnAcordar.disabled = true; // impede novos cliques

    relogio.textContent = "5:30";
    imgDormindo.src = "assets/acordou.png";
    imgDormindo.classList.remove("dormindo");
    imgDormindo.classList.add("acordado");

    setTimeout(function () {
        window.location.href = "tela3.html";
    }, 2000);
});
```

---

## Ideia extra (opcional)

Se quiser deixar mais "de jogo", dá para trocar `textContent` por um pequeno
efeito, tipo mudar a cor do relógio junto com a hora:

```javascript
btnAcordar.addEventListener("click", function () {
    relogio.textContent = "5:30";
    relogio.style.color = "yellow";
    imgDormindo.src = "assets/acordou.png";
});
```

Isso é só um extra — não é necessário para cumprir o que foi pedido.
