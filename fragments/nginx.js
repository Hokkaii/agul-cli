// `${QIANKUN_HOST}/daq-collectable-ms`,
module.exports = {
    getDefault: () => ``,
    getChild: (name) => `
        location ^~ /${name}  {
            alias   /usr/src/app;
            try_files $uri $uri/ /index.html;
        }
    `,
    getMain: () => `
        location /child-ms { // 需要确认后准确配置
            proxy_pass http://child-ms-fe:8000/; // 需要确认后准确配置

            client_body_timeout 300s;
            proxy_read_timeout 300s;
            proxy_connect_timeout 300s;
            proxy_send_timeout 300s;

            proxy_set_header   Host              $proxy_host;
        }
    `
}