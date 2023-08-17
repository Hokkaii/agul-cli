module.exports = `
server {
    listen 8000;
    charset UTF-8;
    port_in_redirect off;
    server_name_in_redirect off;
    root /usr/src/app;
    index index.html;

    access_log /var/log/nginx/ids_access.log;
    error_log /var/log/nginx/ids_error.log;

    client_max_body_size 500M;
    client_body_buffer_size 500M;

    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain text/css text/javascript application/json application/javascript application/x-javascript application/xml;
    gzip_vary on;
    gzip_disable "MSIE [1-6].";
    add_header Access-Control-Allow-Origin '*';
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

    location /api {
        proxy_pass http://api2.taotie-dev.cloud.ci.iauto.com;
        proxy_set_header   Host              $proxy_host;
    }

    <%-data%>

    location ~ ^/(images|javascript|js|css|static)/  {
        root       /usr/src/app/;
        access_log  off;
        expires     30d;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
` 