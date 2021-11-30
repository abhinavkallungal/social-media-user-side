import './App.css';
import Feed from './Pages/Feed/Feed';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';
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
