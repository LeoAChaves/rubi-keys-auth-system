<?php
require_once 'php/config/database.php';

$database = new Database();
$conn = $database->getConnection();

if ($conn) {
    echo "✅ Conectado ao banco de dados!<br><br>";
    
    // Verificar se a tabela existe
    $tables = $conn->query("SHOW TABLES")->fetchAll();
    echo "📋 Tabelas encontradas:<br>";
    foreach ($tables as $table) {
        echo "- " . implode('', $table) . "<br>";
    }
} else {
    echo "❌ Falha na conexão";
}
?>