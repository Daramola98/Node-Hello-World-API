// Dependencies
const http = require('http');
const url = require('url');
const config = require('./config');

// Create an http server to handle client requests
const server = http.createServer((req, res) => {
    // Parse the incoming url
    const parsedUrl = url.parse(req.url, true);

    // Get the path 
    const path = parsedUrl.pathname;
    const route = path.replace(/^\/+|\/+$/g, '');

    // Available routes and their handler functions
    const routeHandlers = {
        hello: function(){
            return {
                "statusCode": 200,
                "message": "Hello World Welcome to My API"
            }
        },
        notFound: function(){
            return {
                "statusCode": 404,
                "message": "This route does not exist"
            }
        }
    };

    // Choose hanlder based on incoming route
    const chosenHandler = typeof(routeHandlers[route]) !== 'undefined' ? routeHandlers[route] : routeHandlers.notFound;

    // Send the client a response
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(chosenHandler().statusCode);
    res.end(JSON.stringify(chosenHandler().message));


});

// Assign Port to listen on
const PORT = config.port;

// Listen to connection on the given port
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})