<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

require_once '../config/database.php';
require_once '../utils/response.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ApiResponse::error('Método não permitido', 405);
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    ApiResponse::error('Dados inválidos');
}

// Validar campos
$username = trim($data['username'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$confirmPassword = $data['confirmPassword'] ?? '';

$errors = [];

if (empty($username)) {
    $errors[] = 'Nome é obrigatório';
} elseif (strlen($username) < 3) {
    $errors[] = 'Nome deve ter pelo menos 3 caracteres';
}

if (empty($email)) {
    $errors[] = 'Email é obrigatório';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Email inválido';
}

if (empty($password)) {
    $errors[] = 'Senha é obrigatória';
} elseif (strlen($password) < 6) {
    $errors[] = 'Senha deve ter pelo menos 6 caracteres';
}

if ($password !== $confirmPassword) {
    $errors[] = 'Senhas não conferem';
}

if (!empty($errors)) {
    ApiResponse::error(implode(', ', $errors), 400);
}

$database = new Database();
$db = $database->getConnection();

try {
    // Verificar se email já existe
    $checkQuery = "SELECT id FROM users WHERE email = :email";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':email', $email);
    $checkStmt->execute();
    
    if ($checkStmt->rowCount() > 0) {
        ApiResponse::error('Email já cadastrado', 409);
    }
    
    // Hash da senha
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    
    // Inserir usuário
    $query = "INSERT INTO users (username, email, password_hash) VALUES (:username, :email, :password_hash)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password_hash', $passwordHash);
    
    if ($stmt->execute()) {
        ApiResponse::success(['id' => $db->lastInsertId()], 'Usuário cadastrado com sucesso!');
    } else {
        ApiResponse::error('Erro ao cadastrar usuário', 500);
    }
} catch (PDOException $e) {
    ApiResponse::error('Erro no servidor: ' . $e->getMessage(), 500);
}
?>