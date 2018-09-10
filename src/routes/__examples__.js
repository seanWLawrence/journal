/**
 * Gets home page with standard hello world
 */
// app.get('/', (req, res) => res.send('Hello World!'));

/**
 * Example with query parameters
 */
// app.get('/users/:userID', function(req, res) {
//   res.send(req.params, 'yo');
// });

/**
 * Example with multiple callbacks
 */
// app.get(
//   '/multiple',
//   function(req, res, next) {
//     next();
//   },
//   function(req, res) {
//     res.send('Second callback');
//   },
// );

/**
 * Example with JSON response
 * Note: If you return a Javascript object it will automatically send it as an array
 */
// app.get('/json', function(req, res) {
//   const example = {
//     data: 'yo',
//   };

//   res.json(example);
// });

/**
 * Example with a template being rendered
 */

/**
 * Example with a download prompt
 */
// app.get('/download', function(req, res) {
//   res.download(join(__dirname, '..', 'public/portrait.jpg'));
// });

/**
 * Example of a chainable route that does mutiple things
 */
// app
//   .route('/book')
//   .get(function(req, res) {
//     res.send('Get a random book');
//   })
//   .post(function(req, res) {
//     res.send('Add a book');
//   })
//   .put(function(req, res) {
//     res.send('Update the book');
//   });

/**
 * Example of a html response
 */
// app.get('/html', function(req, res) {
//   res.send('<h1>Hello world!</h1>');
// });
