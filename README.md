<div align="center">

# 🌐 Dumpper

> Uma API RESTful para uma rede social, onde usuários podem publicar posts, seguir outras pessoas e formar conexões (amigos mútuos) através de um sistema de seguidores.

[![Java](https://img.shields.io/badge/Java-17+-orange?style=for-the-badge&logo=openjdk)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-brightgreen?style=for-the-badge&logo=spring)](https://spring.io/projects/spring-boot)
[![Hibernate](https://img.shields.io/badge/Hibernate-ORM-informational?style=for-the-badge&logo=hibernate)](https://hibernate.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

<img width="1907" height="902" alt="feed" src="https://github.com/user-attachments/assets/3657e2ae-f5f2-4795-8a4f-5166927bf046" />

---

## 💡 Sobre o Projeto

O **Dumpper** é o backend completo de uma plataforma social interativa. Mais do que um CRUD simples, a aplicação lida com regras de negócio como **relacionamentos muitos-para-muitos direcionados (sistema de seguidores)**, **feed de postagens** e **cálculo de amizades mútuas**.

O frontend é construído em **React + Vite**, consumindo essa API.

---

## ✨ Principais Funcionalidades

### 👤 Gestão de Usuários
Perfis com biografia e foto.

<img width="1908" height="907" alt="profile" src="https://github.com/user-attachments/assets/96b4192f-6a93-4e1d-920e-c97b3d512f5f" />

### 📝 Publicações & Feed
Criação e listagem de posts da comunidade.

<img width="1912" height="903" alt="feed2" src="https://github.com/user-attachments/assets/c3ce012b-4d95-4420-a1c7-191835d7eb73" />

### 🤝 Rede de Conexões (Follows)
- Seguir e deixar de seguir usuários.
- Gerenciamento automático e transacional de contadores (`followers` e `following`).
- Listagem de seguidores, seguindo e cálculo dinâmico de **amigos mútuos** (quando o follow é recíproco, vocês viram amigos).

### 🔐 Login
Verificação simples de e-mail e senha contra os dados cadastrados no banco.

---

## 🔐 Autenticação

Atualmente o login é feito por uma verificação direta: o e-mail informado é buscado no banco e a senha é comparada com o valor armazenado. Ainda não há hashing de senha, tokens de sessão (JWT) ou controle de permissões, é um mecanismo simples, pensado para a fase atual do projeto.

---

## 🗺️ Roadmap

- [ ] Hash de senha (ex: BCrypt) e autenticação mais robusta
- [ ] Autenticação baseada em token (JWT) e sessões
- [x] Estrutura de status de música tocando no perfil (`/users/{id}/listening`)
- [ ] Integração real com a API do Spotify (em avaliação, já que o modo de desenvolvimento da API limita o número de contas autorizadas a exibir dados, o que conflita com a ideia de qualquer usuário poder usar a funcionalidade)

---

## 🛠️ Tecnologias & Arquitetura

O projeto adota uma arquitetura em camadas (Controller → Service → Repository → Model), garantindo isolamento de regras de negócio e segurança transacional (`@Transactional`).

**Backend**

| Camada / Ferramenta | Tecnologia |
|---------------------|-----------|
| Linguagem | Java 17+ |
| Framework | Spring Boot |
| Persistência | Spring Data JPA / Hibernate |
| Banco de Dados | H2 (Dev) / PostgreSQL (Prod) |
| Validação & Utilitários | Bean Validation, Lombok |
| Gerenciamento de Dependências | Maven |

**Frontend**

| Camada / Ferramenta | Tecnologia |
|---------------------|-----------|
| Biblioteca | React |
| Build Tool | Vite |

---

## 📡 Endpoints da API

### Usuários (`/users`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/users` | Cria um usuário |
| GET | `/users/{id}` | Busca usuário por ID |
| PUT | `/users/{id}` | Atualiza dados do usuário |
| DELETE | `/users/{id}` | Remove um usuário |
| GET | `/users/username/{username}` | Busca perfil por username |
| PATCH | `/users/{id}/listening` | Atualiza o status de música tocando no perfil |
| POST | `/users/register` | Registra um novo usuário |
| POST | `/users/login` | Autentica um usuário |
| GET | `/users/search?query=` | Busca usuários por nome/username |

### Posts (`/post`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/post/{id}` | Busca um post por ID |
| POST | `/post` | Cria um novo post |
| GET | `/post` | Lista todos os posts |
| PUT | `/post/update/{id}` | Atualiza um post |
| DELETE | `/post/{id}` | Remove um post |

### Curtidas (`/likes`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/likes/{userId}/{postId}` | Curte um post |
| GET | `/likes/{postId}` | Lista usuários que curtiram o post |
| GET | `/likes/check/{userId}/{postId}` | Verifica se o usuário curtiu o post |

### Conexões (`/follow`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/follow?followerId=&followingId=` | Segue um usuário |
| DELETE | `/follow?followerId=&followingId=` | Deixa de seguir um usuário |
| GET | `/follow/following/{userId}` | Lista quem o usuário está seguindo |
| GET | `/follow/followers/{userId}` | Lista os seguidores do usuário |
| GET | `/follow/check?followerId=&followingId=` | Verifica se um segue o outro |
| GET | `/follow/{userId}/friends` | Lista amigos mútuos |

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos

- **Java JDK 17** ou superior
- **Maven** (ou use a própria IDE)
- **Node.js** e **npm** (para o frontend)

### Backend

```bash
# 1. Clone o repositório
git clone https://github.com/rafael-vincensi/dumpper.git

# 2. Entre na pasta do backend
cd dumpper/backend

# 3. Execute a aplicação via Maven
mvn spring-boot:run
```

### Frontend

```bash
# 1. Entre na pasta do frontend
cd dumpper/frontend

# 2. Instale as dependências
npm install

# 3. Rode em modo desenvolvimento
npm run dev
```

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
