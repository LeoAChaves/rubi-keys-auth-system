FROM php:7.4-apache

RUN apt-get update && \
    docker-php-ext-install pdo_mysql mysqli && \
    a2enmod rewrite

COPY . /var/www/html/

RUN chown -R www-data:www-data /var/www/html

EXPOSE 80

CMD ["apache2-foreground"]