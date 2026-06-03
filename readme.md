# 🔐 RUBI Keys - Sistema de Autenticação

<img src="images/rubikeys.png" alt="RUBI Keys Logo" width="100" height="100">

---

[![Deployed on Railway](https://img.shields.io/badge/Railway-Deployed-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)](https://rubi-keys-auth-system-production.up.railway.app/)
[![PHP Version](https://img.shields.io/badge/PHP-7.4+-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://php.net)
[![MySQL](https://img.shields.io/badge/MySQL-5.7+-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com)

## 🚀 Demo ao Vivo

**Acesse o sistema em produção:** [https://rubi-keys-auth-system-production.up.railway.app/](https://rubi-keys-auth-system-production.up.railway.app/)

| Página                | Link                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------ |
| 🏠 **Página Inicial** | [rubi-keys.up.railway.app](https://rubi-keys-auth-system-production.up.railway.app/) |
| 📝 **Registro**       | `/html/register.html`                                                                |
| 🔐 **Login**          | `/html/login.html`                                                                   |
| 🔑 **Dashboard**      | `/html/dashboard.html` (após login)                                                  |

> ⚠️ **Nota:** O Railway free tier pode colocar o app para dormir após 15 minutos sem uso. O primeiro acesso pode levar alguns segundos para reativar.

## 📋 Sobre o Projeto

RUBI Keys é um sistema completo de autenticação de usuários desenvolvido com tecnologias modernas. O projeto oferece funcionalidades essenciais como registro, login, recuperação de senha e dashboard personalizado, tudo com uma interface amigável e responsiva.

### 🎯 Funcionalidades

- ✅ **Registro de usuários** com validação em tempo real
- ✅ **Login seguro** com hash de senha (bcrypt)
- ✅ **Recuperação de senha** com código de verificação por email
- ✅ **Dashboard personalizado** após login
- ✅ **Validação de força de senha** (apenas no registro/alteração)
- ✅ **Proteção contra SQL Injection** (Prepared Statements)
- ✅ **Sessão persistente** com localStorage
- ✅ **Design responsivo** e moderno
- ✅ **Feedback visual** para todas as ações

## 🛠️ Tecnologias Utilizadas

### Frontend

- HTML5
- CSS3 (com design responsivo)
- JavaScript (ES6+)
- Fetch API para requisições HTTP

### Backend

- PHP 7.4+
- MySQL 5.7+
- PDO (PHP Data Objects)
- Sessions

### Ferramentas de Desenvolvimento

- XAMPP / WAMP / MAMP (Ambiente local)
- Git (Controle de versão)
- VS Code (Editor recomendado)

## 📁 Estrutura do Projeto

```

rubi-keys-auth-system/
├── index.html # Página inicial
├── html/
│ ├── login.html # Página de login
│ ├── register.html # Página de registro
│ ├── dashboard.html # Dashboard do usuário
│ ├── forgotPassword.html # Página de recuperação
│ └── changePassword.html # Página de alteração
├── css/
│ ├── global.css # Estilos globais
│ ├── buttons-style.css # Estilos de botões
│ └── dashboard.css # Estilos do dashboard
├── js/
│ ├── api.js # Comunicação com backend
│ ├── auth.js # Gerenciamento de autenticação
│ ├── validation.js # Validações de formulário
│ ├── dashboard.js # Lógica do dashboard
│ └── index.js # Lógica da página inicial
├── php/
│ ├── api/
│ │ ├── register.php # API de registro
│ │ ├── login.php # API de login
│ │ ├── forgot-password.php # API de recuperação
│ │ ├── change-password.php # API de alteração
│ │ └── verify-code.php # API de verificação
│ ├── config/
│ │ └── database.php # Configuração do banco
│ └── utils/
│ ├── response.php # Respostas padronizadas
│ └── email.php # Serviço de email
├── images/ # Imagens do projeto
├── database.sql # Script do banco de dados
├── Dockerfile # Configuração Docker
├── nginx.conf # Configuração Nginx
├── railway.toml # Configuração Railway
└── README.md # Documentação

```

## 🚀 Instalação e Configuração

### Pré-requisitos

- PHP 7.4 ou superior
- MySQL 5.7 ou superior
- Servidor web (Apache recomendado)
- Navegador moderno (Chrome, Firefox, Edge)

### Passo a Passo

#### 1. Clone o repositório

```bash
git clone https://github.com/LeoAChaves/rubi-keys-auth-system.git
cd rubi-keys-auth-system
```

#### 2. Configure o ambiente de desenvolvimento

**Opção A: XAMPP (Windows)**

- Baixe e instale o [XAMPP](https://www.apachefriends.org/)
- Copie a pasta do projeto para `C:/xampp/htdocs/rubi-keys/`
- Inicie o Apache e MySQL no XAMPP Control Panel

**Opção B: WAMP (Windows)**

- Baixe e instale o [WAMP](https://www.wampserver.com/)
- Copie a pasta do projeto para `C:/wamp64/www/rubi-keys/`
- Inicie o WAMP server

**Opção C: MAMP (Mac/Windows)**

- Baixe e instale o [MAMP](https://www.mamp.info/)
- Configure o Document Root para a pasta do projeto
- Inicie o MAMP server

#### 3. Configure o banco de dados

- Acesse o phpMyAdmin: `http://localhost/phpmyadmin`
- Crie um novo banco de dados: `rubi_keys`
- Importe o arquivo `database.sql`

#### 4. Configure a conexão com o banco

Edite o arquivo `php/config/database.php`:

```php
private $host = "localhost";
private $db_name = "rubi_keys";
private $username = "root";
private $password = "";
```

#### 5. Acesse o projeto

Abra o navegador e acesse:

```
http://localhost/rubi-keys-auth-system/
```

## ☁️ Deploy no Railway

### 🌍 Produção

**Acesse o sistema em produção:**

👉 **[https://rubi-keys-auth-system-production.up.railway.app/](https://rubi-keys-auth-system-production.up.railway.app/)**

## 💻 Uso do Sistema

### Registro de usuário

1. Acesse a página de registro
2. Preencha nome, email e senha
3. A senha deve ter pelo menos 6 caracteres
4. Confirme a senha
5. Clique em "Cadastrar"

### Login

1. Acesse a página de login
2. Insira email e senha cadastrados
3. Clique em "Login"
4. Será redirecionado para o dashboard

### Recuperação de senha

1. Clique em "Esqueci a senha" na página de login
2. Insira seu email cadastrado
3. Aguarde o código de verificação
4. Insira o código e a nova senha

### Logout

- Clique no botão "Sair / Logout" no dashboard

## 🔒 Segurança Implementada

### Backend

- ✅ **Password Hashing**: Uso de bcrypt para hash de senhas
- ✅ **SQL Injection Protection**: Prepared Statements
- ✅ **XSS Protection**: Sanitização de inputs
- ✅ **CSRF Protection**: Tokens de sessão

### Frontend

- ✅ **Validação em tempo real**: Feedback imediato
- ✅ **Sanitização de inputs**: Remoção de scripts maliciosos
- ✅ **Proteção de rotas**: Redirecionamento automático
- ✅ **Armazenamento seguro**: localStorage com validação

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:

- 💻 Desktops (1920x1080)
- 📱 Tablets (768x1024)
- 📱 Smartphones (375x667)

## 🧪 Testes

### Testando o sistema localmente

1. **Registrar um usuário:**
   - Acesse `register.html`
   - Crie um usuário de teste: `teste@email.com` / `Senha*123`

2. **Verificar no banco de dados:**
   ```sql
   USE rubi_keys;
   SELECT * FROM users;
   ```

## 🐛 Troubleshooting

### Problemas comuns e soluções

**1. Erro 404 - Arquivo não encontrado**

- Verifique se o projeto está na pasta correta do servidor
- Confirme os caminhos relativos dos arquivos

**2. Erro de conexão com banco no Railway**

- Verifique se as variáveis `MYSQLHOST`, `MYSQLPORT`, etc., estão configuradas
- Certifique-se de que o MySQL foi adicionado ao projeto

**3. FormValidator is not defined**

- Verifique a ordem de carregamento dos scripts
- Certifique-se que `validation.js` está sendo carregado antes de `auth.js`

## 📦 Dependências

### Frontend

- Google Fonts (K2D)
- Fetch API (nativo)

### Backend

- PHP Extensions:
  - PDO MySQL
  - JSON
  - Sessions

## 🔄 Melhorias Futuras

- [ ] PHPMailer para envio de emails em produção
- [ ] Log de atividades do usuário
- [ ] Recaptcha para prevenir bots
- [ ] Reset de senha com link (não apenas código)
- [ ] Perfil do usuário com avatar
- [ ] Dashboard com gráficos e estatísticas
- [ ] API REST documentada com Swagger
- [ ] Testes unitários com PHPUnit

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👥 Autores

- **Leo Chaves** - _Desenvolvimento e Design_

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/leo-a-chaves/)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LeoAChaves)

---

<div align="center">
  Feito com ❤️ pela equipe RUBI Keys
  <br>
  <a href="https://rubi-keys-auth-system-production.up.railway.app/">🌐 Acesse o sistema</a>
</div>

---

Copyright (c) 2026 RUBI Keys - Leo Chaves
