# ADS_Senac_PI_Grupo_02

O projeto **Pacientes & Cuidadores** visa facilitar a conexão entre clientes que necessitam de cuidados domiciliares, como idosos, pessoas em recuperação pós-cirúrgica ou com necessidades especiais, e profissionais de enfermagem qualificados, como enfermeiros e técnicos.

Nosso objetivo é proporcionar uma solução prática, eficiente e segura para a contratação de serviços de saúde domiciliares, promovendo qualidade de vida para os pacientes e oportunidades justas para os cuidadores.

---

## 🌄 Landing Page

[Landing Page](https://guipmuller.github.io/ADS_Senac_PI_Grupo_02/) 

[Repositório da Landing Page](https://github.com/guipmuller/pacientes-cuidadores-LP)

---

## 📺 Video Demonstração da aplicação

[Youtube](https://youtube.com) 

---

## 🔧 Tecnologias e Arquitetura

### Backend:

- **Node.js v22.11.0**.
- Desenvolvido com **Express**, utilizando a stack **Typescript/Node.js**.
- Arquitetura baseada no padrão **MVC**.
- APIs desenvolvidas seguindo o padrão **REST**.

### Frontend:

- Desenvolvido com React + Next
- Utiliza **TypeScript** para maior confiabilidade no desenvolvimento.
- Design responsivo e intuitivo.

### Outras tecnologias utilizadas:

- Banco de dados **PostgreSQL**.
- Prototipação de interface de usuário realizada com **Figma**
- Modelo físico - DER (Diagrama Entidade-Relacionamento)via **Lucid.app**
- Autenticação de usuário com **Firebase**
- Gerenciamento de projeto com **Trello**

---

## 📂 Estrutura do Projeto

### Backend:

- **controllers/**: Arquivos que contêm a lógica do negócio.
- **database/**: Configuração da base de dados.
- **errors/**: Gerenciamento e tratamento de erros disparados ao utilizar a aplicação.
- **firebase/**: Arquivos de configuração para integração com serviço Firebase.
- **middlewares/**: Funções intermediárias com o objetivo de fazer tratativas antes de a carga de dados atingir o seu destino.
- **models/**: Modelos para interação com o banco de dados.
- **repositories/**: Definição das classes usando TypeORM.
- **services/**: Definição dos serviços providos pela API.
- **utils/**: Funções auxiliares e utilitários.
- **types/**: Definição das tipagens usadas na estruturação de dados do projeto.
- **app.ts**: Ponto de entrada para iniciar o servidor.

### Frontend:

- **app/**: Declaração das páginas criadas na aplicação, utilizando estrutura Next.js.
- **assets/**: Armazenamento de arquivos de mídia utilizados no projeto.
- **components/**: Componentes reutilizáveis da interface utilizando estrutura atômica, variando entre átomos, moléculas, organismos, templates e containers.
- **context/**: Criação de contexto para compartilhamento de dados por toda a aplicação.
- **hooks/**: Definição dos Custom Hooks do React, utilizados para melhorar o desempenho bem como a interpretabilidade da aplicação.
- **services/**: Comunicação com o backend e com Firebase via APIs.

---

## 🚀 Instalação e Configuração

### Pré-requisitos:

- Node.js (versão mínima recomendada: 20.x).
- PostgreSQL configurado e rodando.

### Passos:

#### 1. Clone o repositório:

`git clone https://github.com/guipmuller/ADS_Senac_PI_Grupo_02.git`

#### 2. Configuração do Backend:

À partir da pasta raíz do projeto, navegue até o diretório do backend:
`cd backend`

Instale as dependências:
`npm install`

Configure as variáveis de ambiente no arquivo .env conforme fornecido.

Inicie o servidor:
`npm start`

#### 3. Configuração do Frontend:

À partir da pasta raíz do projeto, navegue até o diretório do frontend:
`cd front-web`

Instale as dependências:
`npm install`

Configure as variáveis de ambiente no arquivo .env conforme fornecido.

Inicie o servidor:
`npm run dev `

---

## 🤝 Componentes e Responsabilidades

<table>
  <tr>
    <th>
      Componente
    </th>
    <th>
      Responsabilidade
    </th>
  </tr>
    <tr>
    <td>
      <a href="#" title="Monaliza Santos">
        <img src=https://avatars.githubusercontent.com/u/168979776?v=4" width="100" height="100" alt="Monaliza Santos"/>
        <br>
        <sub><b>Alexandra Santos</b></sub>
      </a>
    </td>
    <td>
      Textos e apoio.
    </td>
  </tr>
  <tr>
    <td>
      <a href="#" title="Amanda Nascimento">
        <img src="https://avatars.githubusercontent.com/u/104909894?v=4" width="100" height="100" alt="Amanda Nascimento"/>
        <br>
        <sub><b>Amanda Nascimento</b></sub>
      </a>
    </td>
    <td>
      Construção da Landing Page, desenvolvimento do front-end e apoio na apresentação.
    </td>
  </tr>
  <tr>
    <td>
      <a href="#" title="Ana Paula Lima">
        <img src="https://avatars.githubusercontent.com/u/106444181?v=4" width="100" height="100" alt="Ana Paula Lima"/>
        <br>
        <sub><b>Ana Paula Lima</b></sub>
      </a>
    </td>
    <td>
      Textos e apoio.
    </td>
  </tr>
  <tr>
    <td>
      <a href="#" title="Anderson Ferreira">
        <img src="https://avatars.githubusercontent.com/u/97910606?v=4" width="100" height="100" alt="Anderson Ferreira"/>
        <br>
        <sub><b>Anderson Ferreira</b></sub>
      </a>
    </td>
    <td>
      Desenvolvimento back-end, front-end e do banco de dados.
    </td>
  </tr>
  <tr>
    <td>
      <a href="#" title="Guilherme Muller">
        <img src="https://avatars.githubusercontent.com/u/94587505?v=4" width="100" height="100" alt="Carlos Dantas"/>
        <br>
        <sub><b>Carlos Dantas</b></sub>
      </a>
    </td>
    <td>
      Desenvolvimento back-end e front-end.
    </td>
  <tr>
  <tr>
    <td>
      <a href="#" title="Guilherme Muller">
        <img src="https://avatars.githubusercontent.com/u/14915623?v=4" width="100" height="100" alt="Guilherme P Muller"/>
        <br>
        <sub><b>Guilherme Muller</b></sub>
      </a>
    </td>
    <td>
      Criação do modelo de dados (DER), desenvolvimento back-end e front-end, desenvolvimento do readme, apresentação e video.
    </td>
  <tr>
  <tr>
    <td>
      <a href="#" title="Lucas Gauto">
        <img src="https://avatars.githubusercontent.com/u/131922918?v=4" width="100" height="100" alt="Lucas Gauto"/>
        <br>
        <sub><b>Lucas Gauto</b></sub>
      </a>
    </td>
    <td>
      Desenvolvimento front-end.
    </td>
  </tr>
</table>
