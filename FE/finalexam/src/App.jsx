import { Provider } from 'react-redux'
import HomePage from './components/HomePage'
import store from './store/store'

function App() {

  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  )
}

export default App
