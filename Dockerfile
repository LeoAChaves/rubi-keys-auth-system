FROM php:7.4-fpm

RUN apt-get update && apt-get install -y nginx && \
    docker-php-ext-install pdo_mysql mysqli

# Copiar configuração do Nginx
COPY nginx.conf /etc/nginx/sites-enabled/default

WORKDIR /var/www/html

COPY . /var/www/html/

RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html

EXPOSE 8000

CMD ["sh", "-c", "php-fpm -D && nginx -g 'daemon off;'"]