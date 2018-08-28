const http = require('http');
const fetch = require('node-fetch');
const TransactionChain = require('./index');

// Setup a dummy api
const api = [0,1,2,3]
.map(el => ({
  path: `/${el}`,
  res: JSON.stringify({ 
    success: true, 
    data: {
      number: el,
      square: Math.sqrt(el),
      cube: el * el,
    }
  })
}));

// Setup the http server
const port = 6969;
const host = '127.0.0.1';
const server = http.createServer((req, res) => {
  const log = () => console.log('>', req.method, req.url);
  for (let ep of api) {
    if (req.url == `${ep.path}?undo` || req.url == ep.path) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(ep.res);
      return log();
    }
  }
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ success: false, error: 'Not Found' }));
  log();
}).listen(port, host, err => {
  console.log(`Test server listening on ${host}:${port}`);
});

// Test
(async function main() {
  // Initialize a transaction
  const transaction = new TransactionChain(
    // Number 4 will fail with 404 status code
    [0,1,2,3,4]
    .map(ep => ({
      // Define the action to be done
      action: async (ctx, step) => {
        // Make the request
        const res = await fetch(`http://${host}:${port}/${ep}`);
        // Check the status
        if (res.status == 200) {
          // We can save the result on the step itself
          step.result = await res.json();
          // Or use the context, which will be returned by the 'run' method
          ctx[ep] = step.result;
        } else {
          // Setup a custom error
          const error = new Error(`Invalid status: ${res.status}`);
          error.status = res.status;
          ctx.error = error;
          // And throw it
          throw error;
        }
      },
      // Setup a function to undo the do
      undo: async (ctx, step) => await fetch(`http://${host}:${port}/${ep}?undo`),
    }))
  );
  
  const result = await transaction
  // The 'error' event is any error thrown by an action
  .on('error', ({error}) => console.log('* ERROR:', error.status, error.message, error.stack))
  // The 'fatal' event is any error thrown when undoing an action
  .on('fatal', ({error}) => console.log('* FATAL:', error.status, error.message, error.stack))
  .run({});
  console.log(result);
  
  server.close();
  
})().catch(err => {
  console.error(err.message, err.stack);
  process.exit(1);
});
