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
$email = trim($data['email'] ?? '');

if (empty($code) || strlen($code) !== 6) {
    ApiResponse::error('Código de verificação inválido', 400);
}

if (empty($email)) {
    ApiResponse::error('Email é obrigatório', 400);
}

$database = new Database();
$db = $database->getConnection();

try {
    // Verificar se o código é válido e não expirou
    $query = "SELECT id, username FROM users 
              WHERE email = :email 
              AND verification_code = :code 
              AND code_expires_at > NOW()";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':code', $code);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Opcional: Marcar código como usado para evitar reuso
        // $updateQuery = "UPDATE users SET verification_code = NULL, code_expires_at = NULL WHERE id = :id";
        // $updateStmt = $db->prepare($updateQuery);
        // $updateStmt->bindParam(':id', $user['id']);
        // $updateStmt->execute();
        
        ApiResponse::success([
            'valid' => true,
            'user_id' => $user['id'],
            'username' => $user['username']
        ], 'Código válido');
    } else {
        // Verificar se o código existe mas expirou
        $checkQuery = "SELECT verification_code, code_expires_at FROM users 
                       WHERE email = :email AND verification_code IS NOT NULL";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->bindParam(':email', $email);
        $checkStmt->execute();
        
        if ($checkStmt->rowCount() > 0) {
            $codeData = $checkStmt->fetch(PDO::FETCH_ASSOC);
            $expiresAt = new DateTime($codeData['code_expires_at']);
            $now = new DateTime();
            
            if ($expiresAt < $now) {
                ApiResponse::error('Código expirado. Solicite um novo código.', 400);
            } else {
                ApiResponse::error('Código inválido. Verifique e tente novamente.', 400);
            }
        } else {
            ApiResponse::error('Nenhum código de verificação encontrado para este email.', 404);
        }
    }
} catch (PDOException $e) {
    error_log("Erro na verificação de código: " . $e->getMessage());
    ApiResponse::error('Erro ao verificar código', 500);
}
?>