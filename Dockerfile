FROM php:7.4-apache

# Instalar extensões
RUN docker-php-ext-install pdo_mysql mysqli

# Remover todos os MPMs e instalar apenas o prefork
RUN apt-get update && \
    apt-get install -y apache2 && \
    a2dismod mpm_event mpm_worker || true && \
    a2enmod mpm_prefork rewrite

# Configurar o Apache para usar o prefork
RUN echo "LoadModule mpm_prefork_module modules/mod_mpm_prefork.so" > /etc/apache2/mods-enabled/mpm_prefork.load && \
    echo "<IfModule mpm_prefork_module>\n\tStartServers 1\n\tMinSpareServers 1\n\tMaxSpareServers 3\n\tMaxRequestWorkers 10\n\tMaxConnectionsPerChild 1000\n</IfModule>" > /etc/apache2/mods-available/mpm_prefork.conf

WORKDIR /var/www/html

COPY . /var/www/html/

RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html

EXPOSE 80

CMD ["apache2-foreground"]