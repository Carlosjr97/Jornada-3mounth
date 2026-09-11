# Prompt de correção de responsividade

## Diagnóstico

O projeto já usa um padrão de "cena fixa" (1366×768) escalada por `transform: scale()` no `script.js:8`. Isso evita quebra total, mas **não é responsivo de verdade** — ele só encolhe tudo.

| Problema | Onde | Nível |
|---|---|---|
| **Nenhuma media query em nenhum CSS** (0 breakpoints) | todos os `.css` | ❌ crítico |
| **UI encolhe junto com a cena** — botão de 24px vira ~5.6px no celular 320px; relógio 17px ilegível; touch target < 44px | `style.css`, `tela2.css`... | ❌ crítico |
| **Letterbox em portrait** — cena 16:9 em celular 19.5:9 deixa barras pretas enormes | `body` + scale | ⚠️ alto |
| **`overflow: hidden` no body** mascara overflow em vez de corrigir | todos `.css:10` | ⚠️ alto |
| **`.botoes` da tela5** — `flex` row sem `wrap`, `gap:50px`, textos compridos estouram | `tela5.css:54` | ⚠️ alto |
| **`position: absolute` + px fixos em ~95% dos elementos** — frágil, risco de sobreposição (ex.: relógio em `left:19.5%` vs cômoda em `left:100px`) | todas telas | ⚠️ médio |
| **Fontes fixas em px** sem `clamp()`/unidades fluidas | todas | ⚠️ médio |
| **Bug de CSS**: `tela4.css:125` usa `#btnSubanamoto:hover` (não existe na tela 4, deveria ser `#btnEncerrar`) | `tela4.css:125` | 🔧 baixo |

---

## Prompt para o Claude

```
Você vai corrigir a responsividade de um mini-game em HTML/CSS/JS (sem framework).
Arquivos: index.html + style.css, tela2.html/tela2.css, tela3.html/tela3.css,
tela4.html/tela4.css, tela5.html/tela5.css, script.js, pasta assets/.

CONTEXTO ATUAL
- Cada tela tem um <main> com tamanho FIXO 1366x768 (cenário de pixel art),
  centralizado e com `body { overflow: hidden }`.
- O script.js:8 aplica `transform: scale(min(innerWidth/1366, innerHeight/768))`
  para encolher a cena inteira deixando-a caber na tela.
- Isso "funciona" no desktop, mas no celular a cena e TODA a UI (botões,
  relógio, textos) encolhem junto: fontes ficam ilegíveis (botão de 24px vira
  ~5-8px) e os alvos de toque ficam menores que 44px.
- NÃO existe NENHUMA media query em nenhum arquivo CSS.

OBJETIVO
Deixar o jogo usável e legível em:
  Celular: 320, 375, 390, 414px | Tablet: 768, 820px |
  Notebook: 1366, 1440px | Desktop: 1920px
de 320px a 1920px de largura, em portrait E landscape.

REGRAS DE SOLUÇÃO
1. MANTENHA a abordagem de "cena fixa escalada" para o cenário/artes de pixel
   art (é o padrão correto para esse estilo). NÃO reescreva o layout inteiro
   com flexbox fluido — o que precisa ser fluido é a UI, não a arte.
2. Adicione media queries com esses breakpoints em TODOS os .css e faça a UI
   (botões, relógio, painel de gameover, textos) ficarem legíveis mesmo quando
   a cena está escalada:
   - fontes com clamp() e valores mínimos: texto ≥ 16px (dirigível pelo
     usuário), botões ≥ 20px de fato no dispositivo (não pré-escala);
   - alvos de toque ≥ 44x44px;
   - botões em coluna no celular (flex-direction: column) quando não couberem.
3. Trate o letterboxing no celular portrait: em vez de barras pretas/barras de
   fundo, torne o fundo (body) harmônico com a cena ou aplique um tratamento
   visual aceitável. A cena pode ficar com barras, mas não pode cortar conteúdo.
4. Ajuste `script.js` se necessário para que a UI NÃO seja deformada pela
   escala (ex.: contra-escala ou unidades vw/vh para UI fora da transformação,
   ou tela cheia cobrindo o espaço da barra). Use a solução que achar mais
   robusta e documente em comentário curto.
5. Corrija overflow real: garanta que nenhum elemento gere barra horizontal
   (sem depender do `overflow: hidden` do body para esconder o problema).
   Envolva containeres com overflow-x: hidden quando fizer sentido.
6. tela5: faça `.botoes` quebrar linha (flex-wrap: wrap) centralizado para os
   textos longos ("Se candidatar para vagas compatíveis" e "Fazer contato com
   recrutadores no Linkedin") não estourarem o botão/o container.
7. tela2: o relógio (17px) e a cômoda/janela em px fixo ficam pequenos/ilegíveis
   quando escalados. Torne o texto criúvel no celular e evite sobreposição com
   os elementos absolutos nos breakpoints menores.
8. Tela 4/tela5 (gameover): o overlay e seus dois botões devem continuar
   dentro da cena e legíveis em todos os tamanhos (coluna no celular).
9. Corrija bug de CSS: em tela4.css o seletor `#btnSubanamoto:hover` não existe
   na tela 4 — troque para `#btnEncerrar:hover` (ou unifique em uma classe).
10. Use `touch-action: manipulation` nos botões e não deixe hover interferir
    no mobile. Mantenha o visual pixel art (image-rendering: pixelated).

CRITÉRIO DE ACEITE (verifique ao final)
- Testar em 320/375/390/414/768/820/1366/1440/1920px (DevTools):
  nenhum elemento sai da tela, nenhuma barra de rolagem horizontal.
- Texto e botões legíveis e tocáveis em 320px de largura.
- A cena de cada tela continua centralizada, sem corte, em cada breakpoint.
- Não quebrar o fluxo do jogo (as 5 telas + animações do script.js intactas).
Reporte o que mudou em cada arquivo no final.
```