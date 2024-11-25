# ADS_Senac_PI_Grupo_04_quarto_semestre

O projeto **Pacientes & Cuidadores** visa facilitar a conexão entre clientes que necessitam de cuidados domiciliares, como idosos, pessoas em recuperação pós-cirúrgica ou com necessidades especiais, e profissionais de enfermagem qualificados, como enfermeiros e técnicos. 

Nosso objetivo é proporcionar uma solução prática, eficiente e segura para a contratação de serviços de saúde domiciliares, promovendo qualidade de vida para os pacientes e oportunidades justas para os cuidadores.

---

## 🛠️ Funcionalidades Principais

- **Cadastro de usuários**: Clientes e cuidadores podem criar perfis personalizados.
- **Busca avançada**: Clientes podem filtrar profissionais por especialização, disponibilidade e localização.
- **Agendamento de serviços**: Interface para gerenciar compromissos e histórico de serviços.
- **Chat integrado**: Comunicação direta e segura entre clientes e cuidadores.
- **Avaliação de serviços**: Sistema de feedback para garantir a qualidade do atendimento.

---

## 🔧 Tecnologias e Arquitetura

### Backend:
- **Node.js v22.11.0** (atual LTS).
- Desenvolvido com **Express**, utilizando a stack **JavaScript/Node.js**.
- Arquitetura baseada no padrão **MVC**.
- APIs desenvolvidas seguindo o padrão **REST**.
- Banco de dados **PostgreSQL** hospedado no **Render**.

### Frontend:
- Desenvolvido com React + Next
- Utiliza **TypeScript** para maior confiabilidade no desenvolvimento.
- Design responsivo e intuitivo.

---

## 📂 Estrutura do Projeto

### Backend:
- **controllers/**: Arquivos que contêm a lógica do negócio.
- **models/**: Modelos para interação com o banco de dados.
- **routes/**: Rotas da API que definem os endpoints.
- **utils/**: Funções auxiliares e utilitários.
- **index.js**: Ponto de entrada para iniciar o servidor.

### Frontend:
- **components/**: Componentes reutilizáveis da interface.
- **screens/**: Telas principais do aplicativo, como Login, Cadastro, Busca, etc.
- **services/**: Comunicação com o backend via API.

---

## 🚀 Instalação e Configuração

### Pré-requisitos:
- Node.js (versão mínima recomendada: 16.x).
- PostgreSQL configurado e rodando.

### Passos:

#### 1. Clone o repositório:
git clone ADS_Senac_PI_Grupo_04_quarto_semestre.git

#### 2. Configuração do Backend:
Navegue até o diretório do backend:
cd backend

Instale as dependências:
npm install

Configure as variáveis de ambiente no arquivo .env (baseado no .env.example).

Inicie o servidor:
npm start

#### 3. Configuração do Frontend:
Navegue até o diretório do frontend:
cd front-web

Instale as dependências:
npm run dev 


---

## 🤝 Autores


<table>
  <tr>
    <td align="center">
      <a href="#" title="Guilherme P Muller">
        <img src="https://avatars.githubusercontent.com/u/14915623?v=4" width="100" height="100" alt="Guilherme P Muller"/>
        <br>
        <sub><b>Guilherme P Muller</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="#" title="Lucas Gauto">
        <img src="https://avatars.githubusercontent.com/u/131922918?v=4" width="100" height="100" alt="Lucas Gauto"/>
        <br>
        <sub><b>Lucas Gauto</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="#" title="Ana Paula Lima">
        <img src="https://avatars.githubusercontent.com/u/106444181?v=4" width="100" height="100" alt="Ana Paula Lima"/>
        <br>
        <sub><b>Ana Paula Lima</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="#" title="Amanda Nascimento">
        <img src="https://avatars.githubusercontent.com/u/104909894?v=4" width="100" height="100" alt="Amanda Nascimento"/>
        <br>
        <sub><b>Amanda Nascimento</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="#" title="Anderson Ferreira">
        <img src="https://avatars.githubusercontent.com/u/97910606?v=4" width="100" height="100" alt="Anderson Ferreira"/>
        <br>
        <sub><b>Anderson Ferreira</b></sub>
      </a>
    </td>
     <td align="center">
      <a href="#" title="Monaliza Santos">
        <img src=https://avatars.githubusercontent.com/u/168979776?v=4" width="100" height="100" alt="Monaliza Santos"/>
        <br>
        <sub><b>Monaliza Santos</b></sub>
      </a>
    </td>
  </tr>
</table>
