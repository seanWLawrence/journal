// @flow strict

/**
 * Package imports
 */
import { renderToNodeStream } from 'react-dom/server';

/**
 * Script imports
 */
import App from '../../views/App';
import rootReducers from '../../views/redux/reducers';

/**
 * Handles the client render for React to server side render
 */
export default function handleClientRender(req: $Request, res: $Response) {
  // Create a new Redux store instance
  const store = createStore(rootReducers);

  // // Render the component to a string
  // const html = renderToNodeStream(
  //   <Provider store={store}>
  //     <App />
  //   </Provider>,
  // );

  const html = '<h1>Hello, world!</h1>';

  // Grab the initial state from our Redux store
  const preloadedState = store.getState();

  // Send the rendered page back to the client
  res.send(renderFullPage(html));
}

function renderFullPage(html) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `;
}
