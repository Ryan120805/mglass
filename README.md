# Site MGLASS

Site institucional (landing page) da MGLASS — indústria cearense (sede em Fortaleza/CE)
de espelhos decorativos, cantoneiras, prateleiras de vidro e produtos em MDF, fornecendo
para home centers, distribuidoras e lojas de material de construção em todo o Norte e
Nordeste. É um site B2B: o objetivo da página é gerar contato de potenciais parceiros
(lojas/distribuidoras), não orçamento de obra para consumidor final.

Feito em HTML + CSS + JS puro, sem backend e sem build step. Mobile-first, responsivo
e usando a identidade visual da marca (paleta e logos em `assets/logo/`).

## Como rodar localmente

Basta abrir `index.html` diretamente no navegador, ou (recomendado, para o
comportamento de fontes/scroll ficar igual ao de produção) servir a pasta com
um servidor estático simples:

```bash
npx serve .
```

ou, com Python:

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080` (ou a porta indicada pelo `serve`).

## Estrutura do projeto

```
vidro/
├── index.html          → toda a estrutura/conteúdo da página
├── css/style.css        → estilos, paleta de cores e responsividade
├── js/main.js            → menu mobile, ano no rodapé, formulário de contato
├── assets/logo/           → logos e emblemas oficiais da MGLASS (SVG + PNG)
├── assets/catalogo/        → catálogo em PDF para download (seção "Produtos")
├── assets/img/              → fotos reais de produtos e logos de parceiros
└── README.md
```

Os 6 cards da seção "Produtos" usam foto real de fundo (recortada do catálogo
fornecido pelo cliente), com um degradê escuro por cima para o texto continuar
legível. A imagem de cada card é definida via CSS custom property inline, ex.:

```html
<article class="card photo-card shine" style="--card-img: url('../assets/img/produto-cantoneiras.jpg');">
```

⚠️ Repare no `../` no caminho — como o `var(--card-img)` é consumido dentro de
`css/style.css`, o `url()` é resolvido a partir da pasta `css/`, não da raiz
do site. Usar `url('assets/img/...')` (sem o `../`) quebra a imagem.

## O que falta preencher (dados reais)

Todos os pontos abaixo estão marcados com comentários `<!-- TODO -->` (HTML) ou
`// TODO` (JS) diretamente no código, para serem fáceis de encontrar:

- **Telefone/WhatsApp**: o número `5599999999999` é placeholder. Aparece em
  5 lugares em `index.html` (header, seção de contato, rodapé, botão flutuante
  e barra fixa mobile de WhatsApp) — recomenda-se usar Localizar e Substituir.
  O link `tel:+5599999999999` (barra fixa mobile) também precisa ser atualizado.
- **E-mail**: `contato@mglass.com.br` é placeholder.
- **Endereço completo da sede** (hoje só consta "Fortaleza, CE") e horário de
  funcionamento, se aplicável: seção "Contato" (`#contato`).
- **Mapa**: há um placeholder tracejado em `.mapa-placeholder` — substitua pelo
  `<iframe>` do Google Maps (ou similar) com o endereço real.
- **Redes sociais**: links `href="#"` no rodapé (Instagram/Facebook).
- **Texto institucional** da seção "Sobre": já usa dados reais (fundação em
  2018, +20 anos de experiência familiar, sede em Fortaleza, 25 colaboradores,
  expansão para Norte/Nordeste desde 2022) extraídos da apresentação
  institucional da empresa — revisar/ajustar redação com o cliente se
  necessário.
- **Parceiros**: 3 itens em `#parceiros`, todos com logo real cedido pelo
  cliente — **Acal**, **Normatel** e **Flux** (`assets/img/parceiro-acal.jpg`,
  `parceiro-normatel.jpg`, `parceiro-flux.jpg`), com a classe extra
  `.parceiro-item.logo`. Para adicionar mais parceiros no futuro, siga o
  mesmo padrão:

  ```html
  <div class="parceiro-item logo" data-reveal>
    <img src="assets/img/parceiro-novo.jpg" alt="Nome do Parceiro" loading="lazy">
  </div>
  ```

  Salve os logos em `assets/img/` (pasta já criada).
- **Catálogo em PDF**: `assets/catalogo/MGLASS-Catalogo.pdf` (29 páginas,
  ~3,4MB) — versão comprimida de `catálogoATUALIZADO032025.pdf`, fornecido
  pelo cliente (original tinha ~48MB, pesado demais para download em site
  mobile-first; foi recomprimido a 120dpi/JPEG q55, mantendo texto e fotos
  legíveis). Quando houver uma versão mais nova, gere um PDF novo e
  substitua esse arquivo mantendo o mesmo nome, sem precisar mexer no HTML.
  O botão "Baixar Catálogo (PDF)" está na seção "Produtos" (`.catalogo-cta`).
- **Formulário de contato**: hoje só mostra uma mensagem local (não envia
  e-mail nem dados a lugar nenhum). Ver `// TODO` em `js/main.js` para
  conectar a um serviço como Formspree, ou a um backend próprio.
- **`og:url`** em `index.html`: atualizar para o domínio definitivo ao publicar.

## Identidade visual

| Uso                          | Cor       | Hex       |
|-------------------------------|-----------|-----------|
| Primária / destaque            | Vinho     | `#7C0000` |
| Secundária                     | Taupe     | `#9C715E` |
| Texto                          | Grafite   | `#2A211A` |
| Fundo                          | Creme     | `#F3ECE6` |

Variáveis CSS em `css/style.css`, bloco `:root`.

Tipografia: **Poppins** (corpo/menu, com letter-spacing generoso nos títulos
pequenos) e **Cormorant Garamond** (títulos grandes/serifados), carregadas via
Google Fonts.

Favicon gerado a partir de `assets/logo/MGLASS_emblema.svg` (com fallback PNG
e `apple-touch-icon`).

## Logos disponíveis (`assets/logo/`)

- `MGLASS_logo_horizontal` — usado no cabeçalho
- `MGLASS_logo_horizontal_mono` — versão monocromática (grafite), disponível
  para uso sobre fundos claros/neutros
- `MGLASS_logo_vertical` — usado no rodapé (aplica-se um filtro CSS para
  clarear a versão mono sobre o fundo escuro do rodapé)
- `MGLASS_emblema` / `MGLASS_badge_*` — usados como favicon e elemento
  decorativo na seção "Sobre"
