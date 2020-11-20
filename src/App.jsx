import { Provider } from 'react-redux'
import { store } from './redux-app'
import Game from './apps/Game'
import './App.css';

const App = () => (
  <Provider store={store}>
    <Game />
  </Provider>
)

export default App
