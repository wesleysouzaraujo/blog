# FitBlog Pro 💪

**Seu guia para treinar melhor e comprar certo.**

Blog nichado em academia/fitness com foco em monetização por marketing de afiliados. Reviews honestos, comparativos completos e guias práticos para ajudar leitores a comprar os melhores suplementos, equipamentos e acessórios de academia.

---

## Estrutura do Projeto

```
/
├── index.html                          ← Home page
├── sitemap.xml                         ← Sitemap para SEO
├── robots.txt                          ← Diretrizes para crawlers
├── assets/
│   ├── css/style.css                   ← Estilos globais (CSS Variables + componentes)
│   └── js/main.js                      ← JavaScript (menu, FAQ, formulários)
├── blog/
│   └── index.html                      ← Listagem de artigos
├── artigo/
│   └── melhor-creatina-custo-beneficio/
│       └── index.html                  ← Exemplo de artigo afiliado completo
├── categoria/
│   ├── suplementos/index.html
│   ├── treino/index.html
│   ├── hipertrofia/index.html
│   ├── emagrecimento/index.html
│   ├── equipamentos/index.html
│   ├── roupas-e-acessorios/index.html
│   ├── alimentacao-fitness/index.html
│   ├── reviews/index.html
│   ├── comparativos/index.html
│   └── guias-para-iniciantes/index.html
├── sobre/index.html                    ← Sobre o blog + 10 sugestões de nome
├── contato/index.html                  ← Formulário de contato
├── aviso-de-afiliado/index.html        ← Divulgação de afiliados (FTC/LGPD)
├── politica-de-privacidade/index.html  ← Política de Privacidade (LGPD)
└── termos-de-uso/index.html            ← Termos de Uso
```

---

## Páginas Implementadas

| Página | URL | Descrição |
|--------|-----|-----------|
| Home | `/` | Hero, artigos em destaque, reviews, comparativos, categorias, CTA de newsletter |
| Blog | `/blog/` | Listagem de artigos com filtro por categoria e sidebar |
| Artigo exemplo | `/artigo/melhor-creatina-custo-beneficio/` | Estrutura completa de artigo afiliado |
| Suplementos | `/categoria/suplementos/` | Categoria de suplementos |
| Treino | `/categoria/treino/` | Categoria de treino |
| Hipertrofia | `/categoria/hipertrofia/` | Categoria de hipertrofia |
| Emagrecimento | `/categoria/emagrecimento/` | Categoria de emagrecimento |
| Equipamentos | `/categoria/equipamentos/` | Categoria de equipamentos |
| Roupas e Acessórios | `/categoria/roupas-e-acessorios/` | Categoria de roupas e acessórios |
| Alimentação Fitness | `/categoria/alimentacao-fitness/` | Categoria de alimentação fitness |
| Reviews | `/categoria/reviews/` | Todos os reviews |
| Comparativos | `/categoria/comparativos/` | Todos os comparativos |
| Guias Iniciantes | `/categoria/guias-para-iniciantes/` | Guias para quem está começando |
| Sobre | `/sobre/` | Sobre o blog, missão e sugestões de nome |
| Contato | `/contato/` | Formulário de contato |
| Aviso de Afiliado | `/aviso-de-afiliado/` | Divulgação transparente de afiliados |
| Política de Privacidade | `/politica-de-privacidade/` | LGPD |
| Termos de Uso | `/termos-de-uso/` | Termos e condições |

---

## Componentes Implementados

### Layout
- Header sticky com navegação desktop e menu mobile hambúrguer
- Footer com 4 colunas e links institucionais
- Breadcrumb com schema markup (BreadcrumbList)

### Monetização / Afiliados
- `affiliate-cta-box` — Caixa de destaque para recomendação com CTA
- Tabela comparativa com coluna de preço e botões por produto
- Quick Summary Box no topo dos artigos (melhor geral, melhor custo-benefício, melhor premium)
- Aviso de transparência de afiliados no topo dos artigos
- Rating bars com notas numéricas para cada critério
- Botões `rel="nofollow noopener"` em todos os links de afiliado

### Conteúdo
- Hero section com badge, headline, subtítulo, 2 CTAs e estatísticas
- Cards de artigo com imagem, categoria, título, resumo e avaliação
- Cards de review com rating bars por critério
- Cards de comparativo com gradiente por categoria
- Cards de categoria com ícone e contagem
- FAQ accordion com ARIA roles e schema FAQPage
- Seção de captura de e-mail (newsletter)
- Prós/Contras em grid 2 colunas
- Table of Contents (índice do artigo)
- Sidebar com widget de posts populares, categorias, newsletter e nota do produto

### SEO
- Meta tags (title, description, robots, canonical, og:*)
- Schema markup: WebSite, Article, FAQPage, BreadcrumbList, CollectionPage
- Hierarquia de headings correta (H1 → H2 → H3)
- URLs amigáveis (slugs em português, sem acentos)
- sitemap.xml com prioridades e changefreq
- robots.txt

---

## Categorias

1. 💊 **Suplementos** — whey, creatina, pré-treino, glutamina, hipercalórico
2. 🏋️ **Treino** — divisões, programas, técnicas
3. 💪 **Hipertrofia** — estratégias, alimentação, suplementos
4. 🔥 **Emagrecimento** — cardio, déficit calórico, termogênicos
5. 🏠 **Equipamentos** — halteres, barras, esteiras, bicicletas
6. 👕 **Roupas e Acessórios** — luvas, cintos, straps, roupas fitness
7. 🥗 **Alimentação Fitness** — dietas, receitas, marmitas
8. ⭐ **Reviews** — análises individuais de produtos
9. ⚖️ **Comparativos** — produtos lado a lado
10. 📚 **Guias para Iniciantes** — primeiros passos na academia

---

## 15 Ideias de Posts com Alta Intenção de Compra

1. Melhor pré-treino para energia e foco: 7 opções para comprar
2. Whey protein vale a pena? Veja quando comprar e qual escolher
3. **Melhor creatina custo-benefício: marcas boas para investir** _(implementado)_
4. Melhores acessórios para academia que realmente ajudam no treino
5. Top roupas fitness masculinas para treinar com conforto
6. Top roupas fitness femininas para academia e treino funcional
7. Melhores tênis para musculação e treino na academia
8. Cinto de musculação vale a pena? Quando usar e qual comprar
9. Strap, luva ou munhequeira: qual acessório escolher para seu treino
10. Melhores equipamentos para treinar em casa em pouco espaço
11. Esteira ou bicicleta ergométrica: qual compensa mais para emagrecer
12. Whey concentrado ou isolado: qual é melhor para o seu objetivo
13. Melhores garrafas e coqueteleiras para academia
14. Como montar um kit básico de academia para iniciantes
15. Melhores marcas de suplementos para quem busca qualidade e preço justo

---

## Branding

### Identidade Visual

| Elemento | Valor |
|----------|-------|
| Nome atual | FitBlog Pro |
| Slogan | "Treino forte, compra inteligente." |
| Cor primária | `#0F0F0F` (near black) |
| Cor destaque | `#E63946` (red energy) |
| Cor secundária | `#1D4ED8` (blue) |
| Cor positivo | `#16a34a` (green) |
| Fundo claro | `#F8F9FA` |
| Cor texto | `#111827` |
| Fonte títulos | Poppins (700, 800) |
| Fonte corpo | Inter (400, 500, 600) |

### 10 Sugestões de Nome

1. **Projeto Maromba** — _Seu guia para treinar melhor e comprar certo_
2. **Guia Fitness Pro** — _Resultados reais começam com escolhas inteligentes_
3. **Shape em Foco** — _Fitness com informação, performance e confiança_
4. **Academia Inteligente** — _Os melhores produtos para sua evolução_
5. **Força em Dia** — _Treino forte, compra inteligente_
6. **Blog do Shape** — _Sua referência em fitness e suplementação_
7. **Evolução Fitness** — _De iniciante a avançado, nós guiamos você_
8. **Escolha Maromba** — _Reviews para quem leva o treino a sério_
9. **Rota da Hipertrofia** — _O caminho para o seu melhor shape_
10. **Universo da Academia** — _Tudo sobre musculação, suplementos e mais_

---

## Tom e Posicionamento

- **Autoridade** — baseado em evidências, critérios claros
- **Motivação** — linguagem positiva e prática
- **Credibilidade** — transparência sobre afiliados, pontos negativos nos reviews
- **Acessibilidade** — linguagem simples, estrutura clara

---

## Tecnologias

- HTML5 semântico com roles ARIA
- CSS3 com variáveis CSS (sem framework externo)
- JavaScript vanilla (ES6+, sem dependências)
- Google Fonts (Poppins + Inter) via CDN
- Schema.org structured data (JSON-LD)

---

## Como Usar

Este é um site estático. Para visualizar localmente:

```bash
# Com Python
python3 -m http.server 8080

# Com Node.js
npx serve .
```

Acesse em `http://localhost:8080`

Para publicar, faça o deploy na plataforma de sua preferência (Vercel, Netlify, GitHub Pages, etc.).
