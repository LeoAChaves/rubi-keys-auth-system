<?php
session_start();
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

$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if (empty($email) || empty($password)) {
    ApiResponse::error('Email e senha são obrigatórios');
}

$database = new Database();
$db = $database->getConnection();

try {
    $query = "SELECT id, username, email, password_hash FROM users WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    
    if ($stmt->rowCount() === 0) {
        ApiResponse::error('Email ou senha inválidos', 401);
    }
    
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (password_verify($password, $user['password_hash'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];
        
        ApiResponse::success([
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email']
        ], 'Login realizado com sucesso!');
    } else {
        ApiResponse::error('Email ou senha inválidos', 401);
    }
} catch (PDOException $e) {
    ApiResponse::error('Erro no servidor', 500);
}
?>