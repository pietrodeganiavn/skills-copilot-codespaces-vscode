// Create web server
// Run server
// 1. Create web server
// 2. Create a route
// 3. Listen for requests
// 4. Return response

// 1. Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const server = http.createServer((req, res) => {
  // 2. Create a route
  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;
  // console.log(pathName);

  if (pathName === '/comments' && req.method === 'GET') {
    // 3. Listen for requests
    // 4. Return response
    const filePath = path.join(__dirname, 'comments.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(data);
  } else if (pathName === '/comments' && req.method === 'POST') {
    // 3. Listen for requests
    // 4. Return response
    const filePath = path.join(__dirname, 'comments.json');
    let data = fs.readFileSync(filePath, 'utf-8');
    let comments = JSON.parse(data);
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      comments.push(JSON.parse(body));
      fs.writeFileSync(filePath, JSON.stringify(comments));
      res.writeHead(201, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ status: 'success', data: comments }));
    });
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ message: 'Not found' }));
  }
});

// 3. Listen for requests
server.listen(3000, '