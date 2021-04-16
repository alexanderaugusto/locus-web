
<p align="center">
  
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/alexanderaugusto/imovel-web?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/alexanderaugusto/imovel-web">
  
  <a href="https://github.com/alexanderaugusto/imovel-web/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/alexanderaugusto/imovel-web">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">  
 
</p>

<h4 align="center"> 
	🚧 IMovel - em desenvolvimento 🚧
</h4>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-layout">Layout</a> • 
 <a href="#-como-executar-o-projeto">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#-autores">Autores</a> • 
 <a href="#user-content--licença">Licença</a>
</p>


## 💻 Sobre o projeto

IMovel - é uma forma de conectar clientes e proprietários, tornando a escolha de alugar ou comprar um novo imóvel mais agradável e simples.

---

## ⚙️ Funcionalidades

  - Usuário:
	  - [x] Cadastrar  
	  - [x] Realizar login
	  - [x] Editar dados	  
  - Imóveis:
	  - [x] Cadastrar 
	  - [ ] Listar
	  - [ ] Favoritar  
	  - [ ] Pesquisar
    - [ ] Deletar  
---

## 🚀 Como executar o projeto

Este projeto é dividido em três partes:
1. [Backend](https://github.com/alexanderaugusto/imovel-api.git)
2. [Frontend - Mobile](https://github.com/alexanderaugusto/imovel-app.git)
3. Frontend - Web (Neste repositório)

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).

Caso você já tenha estas ferramentas instaladas, <a href="#executando-o-projeto">clique aqui</a> para seguir ao próximo passo.

#### Instalações

##### 1) Windows: 
  No Windows, vamos instalar com o [chocolatey](https://chocolatey.org)

- Instalar chocolatey: Primeiro, abra o powershell como administrador.

  ```bash
  # Rode esse comando para checar se você tem permissão para instalar dependências com o terminal.
  $ Get-ExecutionPolicy

  # Se o retorno for diferente de "Restricted" pule para o próximo comando. Senão, rode este comando:
  $ Set-ExecutionPolicy AllSigned

  # Finalmente, instale o chocolatey.
  $ Set-ExecutionPolicy Bypass -Scope Process -	
  Force; [System.Net.ServicePointManager]::SecurityProtocol = 
  [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex
  ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

  # Agora, teste a instalação executando no terminal (Não pode retornar nenhum erro):
  $ choco
  ```

- Instalar nodejs e yarn:
  ```bash
  # Basta executar este comando para instalar o nodejs:
  $ choco install -y nodejs-lts yarn

  # Reinicie seu terminal e tente executar (todas as dependências devem retornar a versão do pacote):
  $ node -v
  $ npm -v
  $ yarn -v
  ```

 ##### 2) Linux:
    
###### - Ubuntu (Debian):

  - Instalar Curl:  
    ```bash
     # Verifique se você instalou o Curl:
     $ sudo  apt-get  install  curl
     ```   
   
  - Instalar nodejs: Neste tutorial, a instalação é com curl, se você deseja instalar com um gerenciador de pacotes, tente isto: [nvm](https://github.com/nvm-sh/nvm#about). 
    
    ```bash 
    # Agora, se o curl estiver instalado, execute este comando:

    # Usando Ubuntu:
    $ curl -sL https://deb.nodesource.com/setup_12.x | 			
    sudo -E bash - sudo apt-get install -y nodejs

    # Usando Debian, with root 
    $ curl -sL https://deb.nodesource.com/setup_12.x | bash -
    apt-get install -y nodejs
    ```
  
- Instalar yarn:
  ```bash
  # Configure o repositório yarn em seu sistema:
  $ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - echo 
    "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

  # Execute este comando para instalar o yarn:
  $ sudo apt update && sudo apt install --no-install-recommends yarn
  
  # Agora, verifique as instalações:
  $ node -v
  $ npm -v
  $ yarn -v
  ```
  
###### - Arch Linux:

- Instalar nodejs e yarn:
  ```bash 
  $ sudo pacman -S nodejs yarn 
  
  # ou     
  
  $ sudo pacman -S nodejs npm
  ```

##### 3) Mac:
No mac, vamos instalar com o Homebrew.
	
- Instalar Homebrew:
  ```bash
  # Basta executar este comando para instalar o homebrew:
  $ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
  ```

- Instalar nodejs e yarn:
  ```bash
  # Com o homebew, vamos instalar o nodejs e yarn:
  $ brew install node
  $brew install yarn

  # Reinicie seu terminal e tente executar (todas as dependências devem retornar a versão do pacote):
  $ node -v
  $ npm -v
  $ yarn -v
  ```

#### Executando o projeto

##### 🧭 Rodando a aplicação Frontend

   ```bash
    # Clone este repositório
    $ git clone https://github.com/alexanderaugusto/imovel-web.git

    # Acesse a pasta do projeto no seu terminal/cmd
    $ cd imovel-web

    # Instale as dependências
    $ yarn install ou npm install

    # Execute a aplicação
    $ yarn start ou npm start

    # Abra seu browser favorito e acesse http://localhost:3000.
   ```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Web**  ([Next.js](https://nextjs.org))
- **Dependências**:
  -   **[ReactJS](https://pt-br.reactjs.org)**  
  -   **[Axios](https://github.com/axios/axios)**
  
- **Dependências de Desenvolvimento**:
  -   **[Typescript](https://www.typescriptlang.org)**
  -   **[ESlint](https://eslint.org)**
  -   **[Prettier](https://prettier.io)**

Veja o arquivo  [package.json](https://github.com/alexanderaugusto/imovel-web/blob/master/package.json)

---

## 🦸 Autores

<table>
  <tr>
    <td align="center"><a href="https://github.com/alexanderaugusto/"><img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/51683816?v=4" width="100px;" alt=""/><br /><sub><b>Alexander Augusto</b></sub></a></td>      
    <td align="center"><a href="https://github.com/vanessaSwerts/"><img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/57146734?v=4" width="100px;" alt=""/><br /><sub><b>Vanessa Swerts</b></sub></a></td>  
  </tr>
</table>

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).
