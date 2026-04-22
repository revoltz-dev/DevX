# DevX

Toolkit completo para desenvolvedores web em formato de extensão para navegadores Chromium (Chrome, Edge, Brave, Opera).

Reúne **51 ferramentas** divididas em **11 categorias** + 3 painéis especiais (editor de imagem, interceptor de rede e gravador de tela). A ideia é substituir aquele monte de extensões separadas (color picker, font finder, screenshot, cookie editor, etc.) por um único pacote unificado.

**Repositório:** https://github.com/revoltz-dev/DevX

---

## Instalação

Ainda não publicado na Chrome Web Store. Para instalar manualmente:

1. Baixe ou clone este repositório:
   ```bash
   git clone https://github.com/revoltz-dev/DevX.git
   ```
2. Abra `chrome://extensions` no navegador
3. Ative o **Modo do desenvolvedor** (canto superior direito)
4. Clique em **Carregar sem compactação** e selecione a pasta do projeto
5. Fixe o ícone do DevX na barra de extensões

---

## Funcionalidades

### Cores
- **Color Picker** — captura a cor exata de qualquer pixel da página ou escolhe via paleta
- **Contraste WCAG** — verifica proporção de contraste entre duas cores para acessibilidade
- **Modo Escuro Forçado** — inverte as cores do site para simular dark mode
- **CSS Variables** — lista todas as custom properties (`--varname`) definidas na página

### Tipografia
- **Qual Fonte** — identifica fonte, tamanho e peso ao passar o mouse sobre o texto
- **Trocar Fonte** — substitui todas as fontes do site por outra (com favoritos e recentes)
- **Contar Palavras** — conta palavras, caracteres e linhas do conteúdo
- **Editar Textos** — torna todo o texto da página editável via `contenteditable`
- **Lorem Ipsum** — gera texto placeholder com volumes configuráveis

### Layout
- **Grid Overlay** — exibe overlay de grade de colunas personalizável
- **Régua** — mede distâncias em pixels entre dois pontos clicados
- **Box Model** — inspeciona margin, padding e border ao passar o mouse
- **Outline Elementos** — destaca bordas coloridas de elementos por tipo (div, img, etc.)
- **Visão Mobile** — emula viewport de celular (iPhone/Android)
- **Z-Index Map** — visualiza a hierarquia de elementos com z-index definido

### Mídia
- **Salvar Imagem** — exporta imagens em PNG, JPG ou WEBP, com crop e filtros no editor embutido
- **Imagem ↔ Base64** — converte URL de imagem para base64 e vice-versa
- **Capturar Print** — screenshot da área visível, página completa ou elemento específico
- **Gravador de Tela** — grava tela, janela ou aba com áudio do sistema e microfone, com pause/resume
- **Imagens sem Alt** — destaca imagens sem atributo `alt` para revisão de acessibilidade
- **Lazy Load Checker** — detecta imagens sem `loading="lazy"`
- **QR Code** — gera QR Code da URL atual para abrir no celular

### SEO
- **Meta Tags** — lista todas as meta tags (`<meta>`, Open Graph, Twitter Card)
- **Links Externos** — enumera todos os links externos da página
- **Headings** — mostra a hierarquia H1–H6 para validar estrutura semântica
- **Robots.txt** — busca e exibe o `/robots.txt` do domínio
- **Sitemap** — localiza e exibe `sitemap.xml`
- **Open Graph Preview** — simula como o link apareceria em redes sociais

### Inspeção
- **Iframes** — detecta e lista todos os iframes da página em tempo real
- **Remover Elemento** — clique para deletar elementos do DOM
- **Contagem Elementos** — quantifica cada tag (`<div>`, `<p>`, `<img>` etc.)
- **Requisições** — lista todos os recursos carregados (CSS, JS, imagens, APIs)
- **Interceptor** — intercepta XHR, Fetch e WebSocket em tempo real com detalhes de headers e body
- **Ver Código Fonte** — abre o HTML source da aba em nova janela
- **Tech Stack** — detecta frameworks (React, Vue, Angular), bibliotecas e versões

### Storage
- **Limpar Storage** — apaga localStorage, sessionStorage e cookies de uma vez
- **Storage Viewer** — visualiza, edita e deleta itens de localStorage e sessionStorage
- **Cookie Editor** — gerencia cookies (nome, valor, expiração, domínio)

### Performance
- **Page Speed** — mostra TTFB, DOM Ready, Load Time, contagem de recursos e transfer size
- **Security Headers** — verifica presença de CSP, HSTS, X-Frame-Options e dá um score de 0 a 100%
- **Disable JS** — desativa JavaScript na aba para simular cenários sem JS
- **Disable CSS** — remove todas as folhas de estilo da página
- **Unprotect** — remove proteções anti-copiar, anti-clique direito, bloqueio de seleção e devtools

### Geradores
- **Gerador de Dados** — senhas, pessoa fake (nome, CPF, RG, endereço), cartão (Visa/Master/Amex), CPF/CNPJ, UUID
- **Hash Generator** — SHA-1, SHA-256 e SHA-512 de qualquer texto
- **Timestamp** — converte unix timestamp ↔ data humana e gera ISO 8601
- **Base64 Encode/Decode** — codifica e decodifica texto em Base64
- **Console Logger** — captura e exibe `console.log` em painel próprio (log/warn/error)

### Utilidades
- **JSON Formatter** — formata e destaca JSON com tree viewer
- **Traduzir Página** — abre a página atual no Google Translate

---

## Painéis especiais

### Editor de Imagem
Painel dedicado que abre toda screenshot ou imagem capturada. Oferece:
- Crop (recorte livre e proporcional)
- Anotações (linhas, retângulos, setas)
- Zoom, undo/redo
- Exportação em PNG, download ou cópia para clipboard

### Interceptor de Rede
Painel para capturar tráfego em tempo real:
- Captura XHR, Fetch e WebSocket
- Filtros por tipo, URL e iframe
- Visualização detalhada de headers, payload e resposta com syntax highlight
- Download do log no formato HAR

### Gravador de Tela
Gravação completa com:
- Captura de tela inteira, janela ou aba
- Áudio do sistema + microfone
- Controles de pause/resume e timer HH:MM:SS
- Output em WebM, com download ou clipboard

---

## Interface

- **Popup principal** (360×520) com menu categorizado
- Busca rápida por nome de ferramenta
- Abas **Todos**, **Recentes** e **Favoritos** (marque com a estrela)
- Barra superior com favicon, título e URL da aba ativa, além de botões para abrir o popup em janela flutuante
- Configurações para ativar/desativar ferramentas e definir output padrão (editor embutido vs. download direto)

---

## Permissões

A extensão solicita as seguintes permissões, cada uma com um propósito específico:

| Permissão | Usada para |
|-----------|-----------|
| `activeTab`, `scripting` | Executar ferramentas na página atual |
| `cookies` | Cookie Editor e Limpar Storage |
| `storage` | Salvar favoritos, configurações e recentes |
| `downloads` | Exportar screenshots, gravações e arquivos |
| `tabs`, `webNavigation` | Informações da aba e navegação |
| `contextMenus` | Menus de clique direito |
| `history`, `topSites`, `bookmarks` | Funções de navegação e atalhos |
| `system.cpu`, `system.memory`, `system.display` | Info de sistema exibida no popup |
| `clipboardWrite` | Copiar cores, textos e dados gerados |
| `<all_urls>` | Funcionar em qualquer site |

---

## Stack técnica

- **Manifest V3** (Chrome Extensions)
- JavaScript puro (sem framework ou build step)
- Service Worker em `background.js`
- Content script em `content.js` injetado em `document_start`
- Páginas dedicadas: `popup.html`, `editor.html`, `interceptor.html`, `recorder.html`

---

## Estrutura do projeto

```
DevX/
├── manifest.json           # Configuração da extensão (MV3)
├── background.js           # Service worker
├── content.js              # Script injetado em todas as páginas
├── inject.js               # Script de página (world: MAIN)
├── popup.html / popup.js   # Interface principal
├── editor.html / editor.js # Editor de imagens
├── interceptor.html / interceptor.js / interceptor-inject.js
├── recorder.html / recorder.js
└── icons/
```

---

## Contribuindo

Pull requests são bem-vindos. Para mudanças grandes, abra uma issue antes para discutir o que você gostaria de mudar.

## Licença

[MIT](LICENSE) — uso livre, incluindo uso comercial, desde que o aviso de copyright seja mantido.
