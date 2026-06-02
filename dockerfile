FROM php:7.4-apache

# Instalar extensões PDO e MySQL
RUN docker-php-ext-install pdo_mysql mysqli

# Habilitar mod_rewrite (para rotas bonitas)
RUN a2enmod rewrite

# Configurar diretório do projeto
WORKDIR /var/www/html

# Copiar todos os arquivos
COPY . /var/www/html/

# Dar permissões
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html

# Expor porta 80 (Railway usa a variável PORT)
EXPOSE 80

# Usar porta do Railway ou 80
CMD ["sh", "-c", "apache2-foreground"]