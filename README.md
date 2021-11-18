
<p align="center">

  <img alt="Github Actions" src="https://github.com/alexanderaugusto/locus-web/actions/workflows/main.yml/badge.svg" />
  
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/alexanderaugusto/locus-web?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/alexanderaugusto/locus-web">

  <a href="https://github.com/alexanderaugusto/locus-web/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/alexanderaugusto/locus-web">
  </a>

   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">

</p>

<h4 align="center">
	✅ Locus - Concluído ✅
</h4>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-como-executar-o-projeto">Como executar</a> •
 <a href="#-estrutura-de-arquivos">Estrutura de arquivos</a> •  
 <a href="#-tecnologias">Tecnologias</a> •
 <a href="#-autores">Autores</a> •
 <a href="#user-content--licença">Licença</a>
</p>


## 💻 Sobre o projeto

Locus - é uma forma de conectar clientes e proprietários, tornando a escolha de alugar ou comprar um novo imóvel mais agradável e simples.

---

## ⚙️ Funcionalidades

  - Usuário:
	  - [x] Cadastrar
	  - [x] Realizar login
	  - [x] Editar dados
  - Imóveis:
	  - [x] Cadastrar
	  - [ ] Editar dados
	  - [x] Listar
	  - [x] Favoritar
	  - [x] Pesquisar
    - [x] Deletar
---

## 🚀 Como executar o projeto

Este projeto é dividido em três partes:
1. [Backend](https://github.com/alexanderaugusto/locus-api.git)
2. [Frontend - Mobile](https://github.com/alexanderaugusto/locus-app.git)
3. Frontend - Web (Neste repositório)

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).

#### Executando o projeto

##### 🧭 Rodando a aplicação Frontend

   ```bash
    # Clone este repositório
    $ git clone https://github.com/alexanderaugusto/locus-web.git

    # Acesse a pasta do projeto no seu terminal/cmd
    $ cd locus-web

    # Instale as dependências
    $ yarn install

    # Execute a aplicação
    $ yarn start

    # Abra seu browser favorito e acesse http://localhost:3000.
   ```

##### 🧭 Rodando os testes - Cypress

   ```bash
    # Abrir cypress pela linha de comando:
    $ ./node_modules/.bin/cypress open

    # Rodar specs por linha de comando:
    $ ./node_modules/.bin/cypress run --spec 'cypress/integration/locus/**/'

   ```
   
---

## 📁 Estrutura de arquivos

Atualizado 15/11/2021


```
locus-web
├─ .editorconfig
├─ .eslintignore
├─ .eslintrc.json
├─ .gitignore
├─ babel.config.js
├─ cypress
│  ├─ fixtures
│  │  ├─ locus.json
│  │  └─ user.json
│  ├─ integration
│  │  └─ Imovel
│  │     ├─ auth.spec.js
│  │     ├─ imovel.spec.js
│  │     └─ menu_options.spec.js
│  ├─ plugins
│  │  └─ index.js
│  ├─ screenshots
│  │  └─ Imovel
│  │     ├─ auth.spec.js
│  │     │  └─ Caso de Teste Testar funcionalidades de autenticação do site Locus -- Cenario Realizar login no site com sucesso (failed).png
│  │     ├─ imovel.spec.js
│  │     └─ menu_options.spec.js
│  │        ├─ Caso de Teste Testar funcionalidades do menu de opções no header da aplicação -- Cenario Navegar até a tela de anuncio e anunciar um novo imóvel (failed).png
│  │        └─ Caso de Teste Testar funcionalidades do menu de opções no header da aplicação -- Cenario Navegar até a tela de favoritos (failed).png
│  └─ support
│     ├─ commands.js
│     └─ index.js
├─ cypress.json
├─ LICENSE
├─ next-env.d.ts
├─ next.config.js
├─ package.json
├─ prettier.config.js
├─ public
│  ├─ google-icon.png
│  ├─ icon.png
│  ├─ logo-black-mini.png
│  ├─ logo-blue-horizontal.png
│  └─ logo-blue.png
├─ README.md
├─ src
│  ├─ components
│  │  ├─ Alert.tsx
│  │  ├─ Button.tsx
│  │  ├─ Dropdown.tsx
│  │  ├─ EmptyMessage.tsx
│  │  ├─ FilterModal.tsx
│  │  ├─ Header.tsx
│  │  ├─ index.tsx
│  │  ├─ Input.tsx
│  │  ├─ InputArea.tsx
│  │  ├─ InputCheck.tsx
│  │  ├─ InputSelect.tsx
│  │  ├─ PropertyCard.tsx
│  │  └─ StepProgress.tsx
│  ├─ constants
│  │  ├─ states.ts
│  │  └─ types.ts
│  ├─ contexts
│  │  ├─ alert.tsx
│  │  └─ auth.tsx
│  ├─ pages
│  │  ├─ account.tsx
│  │  ├─ favorite.tsx
│  │  ├─ index.tsx
│  │  ├─ login.tsx
│  │  ├─ property
│  │  │  ├─ index.tsx
│  │  │  ├─ new.tsx
│  │  │  └─ [id].tsx
│  │  ├─ signup.tsx
│  │  ├─ _app.tsx
│  │  └─ _document.tsx
│  ├─ services
│  │  └─ api.ts
│  ├─ styles
│  │  ├─ components
│  │  │  ├─ Alert.css
│  │  │  ├─ Button.css
│  │  │  ├─ Dropdown.css
│  │  │  ├─ EmptyMessage.css
│  │  │  ├─ FilterModal.css
│  │  │  ├─ Header.css
│  │  │  ├─ Input.css
│  │  │  ├─ InputArea.css
│  │  │  ├─ InputCheck.css
│  │  │  ├─ InputSelect.css
│  │  │  ├─ PropertyCard.css
│  │  │  ├─ PropertyCardMedia.css
│  │  │  └─ StepProgress.css
│  │  ├─ global.css
│  │  └─ pages
│  │     ├─ Account.css
│  │     ├─ Advertise.css
│  │     ├─ AdvertiseDetails.css
│  │     ├─ AdvertiseMedia.css
│  │     ├─ Favorite.css
│  │     ├─ FavoriteMedia.css
│  │     ├─ Home.css
│  │     ├─ HomeMedia.css
│  │     ├─ Login.css
│  │     ├─ NewAdvertise.css
│  │     ├─ NewAdvertiseMedia.css
│  │     └─ SignUp.css
│  └─ utils
│     └─ inputValidation.ts
├─ tsconfig.json
├─ vercel.json
└─ yarn.lock

```
---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Web**  ([Next.js](https://nextjs.org))
- **Dependências**:
  -   **[Axios](https://github.com/axios/axios)**
  -   **[ReactJS](https://pt-br.reactjs.org)**
  -   **[React Dropzone](https://react-dropzone.js.org)**
  -   **[React Google Login](https://github.com/anthonyjgrove/react-google-login)**  -   
  -   **[Next Images](https://github.com/twopluszero/next-images)**

- **Dependências de Desenvolvimento**:
  -   **[Typescript](https://www.typescriptlang.org)**
  -   **[ESlint](https://eslint.org)**
  -   **[Prettier](https://prettier.io)**
  -   **[Cypress](https://www.cypress.io)**
  -   **[Mochawesome](https://github.com/adamgruber/mochawesome)**

Veja o arquivo  [package.json](https://github.com/alexanderaugusto/locus-web/blob/master/package.json)

---

## 🦸 Autores

<table>
  <tr>
    <td align="center"><a href="https://github.com/alexanderaugusto/"><img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/51683816?v=4" width="100px;" alt=""/><br /><sub><b>Alexander Augusto</b></sub></a></td>
    <td align="center"><a href="https://github.com/pedroblimaa"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/46970693?v=4" width="100px;" alt=""/><br /><sub><b>Pedro Bonfilio</b></sub></a></td>
    <td align="center"><a href="https://github.com/vanessaSwerts/"><img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/57146734?v=4" width="100px;" alt=""/><br /><sub><b>Vanessa Swerts</b></sub></a></td>
  </tr>
</table>

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).
