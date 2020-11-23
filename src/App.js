import { Provider } from 'react-redux'
import Pictures from './components/Pictures'

import configureStore from './store'

const {store} = configureStore()

function App() {
  return (
    <Provider store={store}>
      <Pictures/>
    </Provider>
  );
}

export default App;
