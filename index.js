import { createServer } from 'http';
import { readFile } from 'node:fs/promises';

const server = createServer((req, res) => {
    if (req.url === '/styles.css') {

        const filename = '.' + req.url;

        readFile(filename).then(data => {
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.end(data);
        });
    } 

    else {
        const filename = req.url === '/'? './index.html' : '.' + req.url.split('.')[0] + '.html';

        readFile(filename).then(data => {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(data);
        }).catch(err => {
            console.error(err);
            readFile('./404.html').then(data => {
                res.writeHead(404, {'Content-Type' : 'text/html'});
                res.end(data);
            })
        })
    }
});

server.listen(8080);