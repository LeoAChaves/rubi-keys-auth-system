<?php
class Database {
    // Usando variáveis de ambiente do Railway
    private $host;
    private $db_name;
    private $username;
    private $password;
    private $conn;

    public function __construct() {
        // Railway fornece estas variáveis automaticamente
        $this->host = getenv('MYSQL_HOST') ?: getenv('DB_HOST') ?: 'localhost';
        $this->db_name = getenv('MYSQL_DATABASE') ?: getenv('DB_DATABASE') ?: 'rubi_keys';
        $this->username = getenv('MYSQL_USER') ?: getenv('DB_USERNAME') ?: 'root';
        $this->password = getenv('MYSQL_PASSWORD') ?: getenv('DB_PASSWORD') ?: '';
        
        // Para Railway MySQL específico
        if (getenv('MYSQL_URL')) {
            $url = parse_url(getenv('MYSQL_URL'));
            $this->host = $url['host'];
            $this->username = $url['user'];
            $this->password = $url['pass'];
            $this->db_name = ltrim($url['path'], '/');
        }
    }

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8",
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        } catch(PDOException $e) {
            // Retornar erro como JSON (não apenas echo)
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false, 
                'message' => 'Erro de conexão com o banco de dados: ' . $e->getMessage()
            ]);
            exit;
        }
        return $this->conn;
    }
}
?>