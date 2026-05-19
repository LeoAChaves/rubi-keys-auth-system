<?php
class EmailService {
    public static function sendVerificationCode($email, $username, $code) {
        $subject = "🔐 Código de Verificação - RUBI Keys";
        
        $message = "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                .container { max-width: 600px; margin: auto; padding: 20px; }
                .code { font-size: 32px; font-weight: bold; color: #4CAF50; padding: 20px; text-align: center; }
                .footer { font-size: 12px; color: #666; margin-top: 30px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <h2>Olá, $username!</h2>
                <p>Recebemos uma solicitação para redefinir sua senha na RUBI Keys.</p>
                <p>Use o código abaixo para alterar sua senha:</p>
                <div class='code'>$code</div>
                <p>Este código é válido por 15 minutos.</p>
                <p>Se você não solicitou esta alteração, ignore este email.</p>
                <div class='footer'>
                    <p>© 2024 RUBI Keys. Todos os direitos reservados.</p>
                </div>
            </div>
        </body>
        </html>
        ";
        
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: noreply@rubikeys.com" . "\r\n";
        
        // Para testes sem servidor SMTP, apenas loga o código
        // Em produção, use PHPMailer ou configure SMTP
        error_log("Código de verificação para $email: $code");
        
        // Retorna true para desenvolvimento
        return true;
        
        // Em produção, descomente a linha abaixo:
        // return mail($email, $subject, $message, $headers);
    }
}
?>