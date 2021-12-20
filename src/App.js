import './App.css';
import Router from './Router';
import { Provider } from 'react-redux'
import Store from './Redux/Store'






function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <Router />
      </div>
    </Provider>
  );
}

export default App;
