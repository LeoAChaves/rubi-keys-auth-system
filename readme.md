# 🔐 RUBI Keys - Sistema de Autenticação

<img src="images/rubikeys.png" alt="RUBI Keys Logo" width="100" height="100">

## 📋 Sobre o Projeto

RUBI Keys é um sistema completo de autenticação de usuários desenvolvido com tecnologias modernas. O projeto oferece funcionalidades essenciais como registro, login, recuperação de senha e dashboard personalizado, tudo com uma interface amigável e responsiva.

### 🎯 Funcionalidades

- ✅ **Registro de usuários** com validação em tempo real
- ✅ **Login seguro** com hash de senha (bcrypt)
- ✅ **Recuperação de senha** com código de verificação por email
- ✅ **Dashboard personalizado** após login
- ✅ **Validação de força de senha** (apenas no registro/alteracão)
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
rubi-keys/
├── index.html                 # Dashboard principal
├── login.html                 # Página de login
├── register.html              # Página de registro
├── forgotPassword.html        # Página de recuperação
├── changePassword.html        # Página de alteração
├── css/
│   ├── global.css            # Estilos globais
│   └── buttons-style.css     # Estilos de botões
├── js/
│   ├── api.js                # Comunicação com backend
│   ├── auth.js               # Gerenciamento de autenticação
│   └── validation.js         # Validações de formulário
├── php/
│   ├── api/
│   │   ├── register.php      # API de registro
│   │   ├── login.php         # API de login
│   │   ├── forgot-password.php # API de recuperação
│   │   ├── change-password.php # API de alteração
│   │   └── verify-code.php   # API de verificação
│   ├── config/
│   │   └── database.php      # Configuração do banco
│   └── utils/
│       ├── response.php      # Respostas padronizadas
│       └── email.php         # Serviço de email
├── images/                    # Imagens do projeto
└── database.sql              # Script do banco de dados
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
git clone https://github.com/LeoAChaves/Login_Authentication.git
cd Login_Authentication
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
- Importe o arquivo `database.sql`:
  - Clique na aba "SQL"
  - Copie o conteúdo do arquivo `database.sql`
  - Cole e execute

#### 4. Configure a conexão com o banco

Edite o arquivo `php/config/database.php`:

```php
private $host = "localhost";
private $db_name = "rubi_keys";
private $username = "root";     // Seu usuário do MySQL
private $password = "";          // Sua senha do MySQL
```

#### 5. Configure o serviço de email (opcional)

Para funcionamento da recuperação de senha, configure o email em `php/utils/email.php`:

```php
// Recomendado usar PHPMailer em produção
// Exemplo com PHPMailer:
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
```

**Para testes locais:**

- O sistema já vem com um fallback que exibe os códigos no log de erro
- Verifique o arquivo `php/error_log` para ver os códigos gerados

#### 6. Permissões de arquivos

Garanta que as pastas tenham permissões adequadas:

```bash
# Linux/Mac
chmod -R 755 css/ js/ images/
chmod -R 777 php/error_log

# Windows (geralmente não necessário)
```

#### 7. Acesse o projeto

Abra o navegador e acesse:

```
http://localhost/Login_Authentication/index.html
```

## 💻 Uso do Sistema

### Registro de usuário

1. Acesse a página de registro
2. Preencha nome, email e senha
3. A senha deve ter pelo menos 8 caracteres, letra maiúscula, número e caracter especial.
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
3. Aguarde o código de verificação (requer configração do serviço de email )
4. Insira o código e a nova senha
5. Confirme a nova senha

### Logout

- Clique no botão "Sair / Logout" no dashboard

## 🔒 Segurança Implementada

### Backend

- ✅ **Password Hashing**: Uso de bcrypt para hash de senhas
- ✅ **SQL Injection Protection**: Prepared Statements em todas as queries
- ✅ **XSS Protection**: Sanitização de inputs
- ✅ **CSRF Protection**: Tokens de sessão
- ✅ **Rate Limiting**: Proteção contra brute force (a implementar)
- ✅ **Secure Headers**: Headers HTTP configurados

### Frontend

- ✅ **Validação em tempo real**: Feedback imediato para o usuário
- ✅ **Sanitização de inputs**: Remoção de scripts maliciosos
- ✅ **Proteção de rotas**: Redirecionamento automático
- ✅ **Armazenamento seguro**: Uso de localStorage com validação

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:

- 💻 Desktops (1920x1080)
- 📱 Tablets (768x1024)
- 📱 Smartphones (375x667)

## 🧪 Testes

### Testando o sistema localmente

1. **Registrar um usuário:**

```bash
# Acesse register.html
# Crie um usuário de teste
teste@email.com / Senha*123
```

2. **Verificar no banco de dados:**

```sql
USE rubi_keys;
SELECT * FROM users;
```

3. **Testar recuperação de senha:**

- Verifique o arquivo `php/error_log` para ver o código gerado

## 🐛 Troubleshooting

### Problemas comuns e soluções

**1. Erro 404 - Arquivo não encontrado**

- Verifique se o projeto está na pasta correta do servidor
- Confirme os caminhos dos arquivos CSS/JS

**2. CSS não carrega**

- Use caminhos relativos: `./css/global.css`
- Limpe o cache do navegador (Ctrl+F5)

**3. Erro de conexão com banco**

- Verifique se o MySQL está rodando
- Confirme as credenciais no `database.php`
- Verifique se o banco `rubi_keys` foi criado

**4. FormValidator is not defined**

- Verifique a ordem de carregamento dos scripts
- Certifique-se que `validation.js` está sendo carregado

**5. Email não enviado**

- Em desenvolvimento, os códigos são exibidos no `error_log`
- Para produção, configure SMTP com PHPMailer

## 📦 Dependências

### Frontend

- Google Fonts (K2D)
- Fetch API (nativo)

### Backend

- PHP Extensions:
  - PDO MySQL
  - JSON
  - Sessions
  - Mail (opcional)

## 🔄 Melhorias Futuras

- [ ] PHPMailer para envio de emails em produção
- [ ] Log de atividades do usuário
- [ ] Recaptcha para prevenir bots
- [ ] Reset de senha com link (não apenas código)
- [ ] Perfil do usuário com avatar
- [ ] Dashboard com gráficos e estatísticas
- [ ] API REST documentada com Swagger
- [ ] Testes unitários com PHPUnit
- [ ] Docker container para deploy fácil

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de código

- PHP: Seguir PSR-12
- JavaScript: Seguir Airbnb Style Guide
- CSS: Seguir BEM methodology

## 👥 Autores

**RUBI Keys Team**

- Desenvolvimento: Leo Chaves
- Design: Leo Chaves
- Documentação: Leo Chaves

## 🙏 Agradecimentos

- [FontAwesome](https://fontawesome.com/) (emulados com emojis)
- [Google Fonts](https://fonts.google.com/) pela fonte K2D
- Comunidade open-source pelo suporte

## 🎯 Status do Projeto

✅ **Versão 1.0.0** - Lançamento estável

- Todas as funcionalidades básicas implementadas
- Testado em diferentes navegadores
- Documentação completa

---

<div align="center">
  Feito com ❤️ pela equipe RUBI Keys
</div>

---

## **Arquivos complementares recomendados**

### **.gitignore** (adicione na raiz do projeto)

```gitignore
# Arquivos de configuração locais
php/config/local-config.php
.htaccess

# Logs
error_log
*.log
php/error_log

# Arquivos do sistema
.DS_Store
Thumbs.db
desktop.ini

# IDE
.vscode/
.idea/
*.sublime-*

# Backup
*.bak
*.old
*.sql
```

Copyright (c) 2026 RUBI Keys - Leo Chaves
