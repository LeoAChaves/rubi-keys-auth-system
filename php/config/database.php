<?php
class Database {
    private $conn;

    public function getConnection() {
        $this->conn = null;
        
        // Usando as variáveis do Railway MySQL
        $host = getenv('MYSQLHOST') ?: getenv('MYSQL_HOST') ?: 'localhost';
        $port = getenv('MYSQLPORT') ?: getenv('MYSQL_PORT') ?: '3306';
        $dbname = getenv('MYSQLDATABASE') ?: getenv('MYSQL_DATABASE') ?: 'railway';
        $user = getenv('MYSQLUSER') ?: getenv('MYSQL_USER') ?: 'root';
        $password = getenv('MYSQLPASSWORD') ?: getenv('MYSQL_PASSWORD') ?: '';
        
        try {
            $this->conn = new PDO(
                "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8",
                $user,
                $password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
            
        } catch(PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false, 
                'message' => 'Erro de conexão com o banco de dados'
            ]);
            exit;
        }
        return $this->conn;
    }
}
?>