<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

require_once '../config/database.php';
require_once '../utils/response.php';
require_once '../utils/email.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ApiResponse::error('Método não permitido', 405);
}

$data = json_decode(file_get_contents('php://input'), true);
$email = trim($data['email'] ?? '');

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    ApiResponse::error('Email inválido');
}

$database = new Database();
$db = $database->getConnection();

try {
    // Verificar se email existe
    $query = "SELECT id, username FROM users WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    
    if ($stmt->rowCount() === 0) {
        // Não revelar se o email existe por segurança
        ApiResponse::success(null, 'Se o email existir, um código será enviado');
    }
    
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Gerar código de verificação (6 dígitos)
    $verificationCode = sprintf("%06d", mt_rand(1, 999999));
    $expiresAt = date('Y-m-d H:i:s', strtotime('+15 minutes'));
    
    // Salvar código no banco
    $updateQuery = "UPDATE users SET verification_code = :code, code_expires_at = :expires WHERE email = :email";
    $updateStmt = $db->prepare($updateQuery);
    $updateStmt->bindParam(':code', $verificationCode);
    $updateStmt->bindParam(':expires', $expiresAt);
    $updateStmt->bindParam(':email', $email);
    $updateStmt->execute();
    
    // Enviar email
    $emailSent = EmailService::sendVerificationCode($email, $user['username'], $verificationCode);
    
    if ($emailSent) {
        ApiResponse::success(null, 'Código de verificação enviado para o email');
    } else {
        ApiResponse::error('Erro ao enviar email', 500);
    }
} catch (PDOException $e) {
    ApiResponse::error('Erro no servidor', 500);
}
?>