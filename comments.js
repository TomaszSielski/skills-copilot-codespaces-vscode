// Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

// Create server
const server = http.createServer((req, res) => {
    // Get the URL
    const parsedUrl = url.parse(req.url, true);
    // Get the path
    let path = parsedUrl.pathname;
    // Get the method
    let method = req.method;
    // Get the query
    let query = parsedUrl.query;
    // Get the headers
    let headers = req.headers;

    // Check the path
    if (path === '/comments' && method === 'GET') {
        // Read the file
        fs.readFile('comments.json', (err, data) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ message: 'Not Found' }));
            } else {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(data);
            }
        });
    } else if (path === '/comments' && method === 'POST') {
        // Read the body
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            // Parse the body
            let parsedBody = JSON.parse(body);
            // Read the file
            fs.readFile('comments.json', (err, data) => {
                if (err) {
                    res.writeHead(404, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({ message: 'Not Found' }));
                } else {
                    // Parse the comments
                    let comments = JSON.parse(data);
                    // Add the new comment
                    comments.push(parsedBody);
                    // Write the file
                    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
                        if (err) {
                            res.writeHead(500, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify({ message: 'Internal Server Error' }));
                        } else {
                            res.writeHead(201, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify({ message: 'Created' }));
                        }
                    });
                }
            });
        });
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ message: 'Not Found'
