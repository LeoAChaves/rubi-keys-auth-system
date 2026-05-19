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

$code = trim($data['code'] ?? '');
$newPassword = $data['newPassword'] ?? '';
$confirmPassword = $data['confirmPassword'] ?? '';

$errors = [];

if (empty($code) || strlen($code) !== 6) {
    $errors[] = 'Código de verificação inválido';
}

if (empty($newPassword)) {
    $errors[] = 'Nova senha é obrigatória';
} elseif (strlen($newPassword) < 6) {
    $errors[] = 'Senha deve ter pelo menos 6 caracteres';
}

if ($newPassword !== $confirmPassword) {
    $errors[] = 'Senhas não conferem';
}

if (!empty($errors)) {
    ApiResponse::error(implode(', ', $errors), 400);
}

$database = new Database();
$db = $database->getConnection();

try {
    // Verificar código
    $query = "SELECT id, email FROM users WHERE verification_code = :code AND code_expires_at > NOW()";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':code', $code);
    $stmt->execute();
    
    if ($stmt->rowCount() === 0) {
        ApiResponse::error('Código inválido ou expirado', 400);
    }
    
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Atualizar senha e limpar código
    $passwordHash = password_hash($newPassword, PASSWORD_DEFAULT);
    $updateQuery = "UPDATE users SET password_hash = :password, verification_code = NULL, code_expires_at = NULL WHERE id = :id";
    $updateStmt = $db->prepare($updateQuery);
    $updateStmt->bindParam(':password', $passwordHash);
    $updateStmt->bindParam(':id', $user['id']);
    
    if ($updateStmt->execute()) {
        ApiResponse::success(null, 'Senha alterada com sucesso!');
    } else {
        ApiResponse::error('Erro ao alterar senha', 500);
    }
} catch (PDOException $e) {
    ApiResponse::error('Erro no servidor', 500);
}
?>