const httpStatus = require('http-status');
const shellJs = require('shelljs')
/**
 * configurations
 * @public
 */
exports.configurations = async (req, res, next) => {
    res.status(httpStatus.OK);

    var requestBody = req.body;
    res.status(httpStatus.OK);

    var username = shellJs.exec("whoami");

    shellJs.cd("../../");
    shellJs.mkdir("Nginx"+requestBody.upstream);
    shellJs.cd("Nginx"+requestBody.upstream);
    shellJs.mkdir("Conf");

    if(requestBody.addSSl){
        shellJs.mkdir("SSL");
        shellJs.cd("SSL");
        shellJs.echo(requestBody.sslCertificate).to("ssl.cert");
        shellJs.echo(requestBody.sslKey).to("sslKey.key");
        shellJs.cd("../");
    }

    nginxConfiguration();

    //Docker Configuration
    dockerConfiguration();

    function dockerConfiguration() {
        shellJs.cd("../");
        shellJs.mkdir("Docker");
        shellJs.cd("Docker");
        var dockerOutput = shellJs.echo(`version: "2"        
services:
  nginx:
    image: nginx
    volumes:
      - "../Conf/nginx-conf.conf:/etc/nginx/conf.d/default.conf"`).to('docker-compose.yml');
      if(requestBody.addSSl){
         shellJs.echo(`
      - "../SSL:/etc/nginx/ssl:ro"`).toEnd('docker-compose.yml');
      }

      shellJs.echo(`
    ports:
        - 80:80
    command: [nginx-debug, '-g', 'daemon off;']  
  `).toEnd('docker-compose.yml');
        shellJs.cd("../");
    }

    function nginxConfiguration() {
        shellJs.cd("Conf");
        shellJs.touch("nginx-conf.conf");
        var output = shellJs.echo(`
upstream ${requestBody.upstream} {    
    server ${requestBody.green_ip}:${requestBody.green_port} fail_timeout=10s weight=1000;
    server ${requestBody.blue_ip}:${requestBody.blue_port} fail_timeout=10s weight=100 backup;
    ip_hash;
}`).to("nginx-conf.conf");
       if(requestBody.addSSl){
           shellJs.echo(`
server {
       listen 443;
       server_name ${requestBody.server_name};
       root /usr/share/nginx/html;

       ssl on;
       ssl_certificate    /etc/nginx/ssl/ssl.cert;
       ssl_certificate_key    /etc/nginx/ssl/sslKey.key;

       ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
       ssl_prefer_server_ciphers on;
       ssl_ciphers "EECDH+ECDSA+AESGCM EECDH+aRSA+AESGCM EECDH+ECDSA+SHA384 EECDH+ECDSA+SHA256 EECDH+aRSA+SHA384 EECDH+aRSA+SHA256 EECDH+aRSA+RC4 EECDH EDH+aRSA RC4 !aNULL !eNULL !LOW !3DES !MD5 !EXP !PSK !SRP !DSS";      

       chunked_transfer_encoding on;

       location / {
           proxy_pass http://${requestBody.upstream};
       }

       client_max_body_size 4G;
       keepalive_timeout 10;
}

           `).toEnd("nginx-conf.conf");
       }
       else{
           shellJs.echo(`        
server {
    listen 80;
    server_name ${requestBody.server_name};

    location / {
        proxy_pass http://${requestBody.upstream};
    }
}`).toEnd("nginx-conf.conf");
       }
    }

    return res.json({
        output: shellJs.cat("Conf/nginx-conf.conf"),
        dockerOutput: shellJs.cat("Docker/docker-compose.yml"),
        responseMessage: requestBody
    });
}