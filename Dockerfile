FROM php:7.4-fpm

RUN apt-get update && apt-get install -y nginx && \
    docker-php-ext-install pdo_mysql mysqli

RUN echo 'server { \
    listen 8000; \
    root /var/www/html; \
    index index.html index.php; \
    location / { \
        try_files $uri $uri/ =404; \
    } \
    location ~ \.php$ { \
        fastcgi_pass 127.0.0.1:9000; \
        fastcgi_index index.php; \
        include fastcgi_params; \
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name; \
    } \
}' > /etc/nginx/sites-enabled/default

WORKDIR /var/www/html

COPY . /var/www/html/

RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html

EXPOSE 8000

CMD ["sh", "-c", "php-fpm -D && nginx -g 'daemon off;'"]