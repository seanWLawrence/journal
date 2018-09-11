// @flow strict

import { createStore } from 'redux';
import { Provider } from 'react-redux';

/**
 * Script imports
 */
import rootReducers from './redux/reducers';

const store = createStore(rootReducers);

// const App = ({ store }) => (
//   <Provider store={store}>
//     <Router>
//       <Route path="/" component={App} />
//     </Router>
//   </Provider>
// );

const App = () => <h1>Hello, world!</h1>;

export default App;
