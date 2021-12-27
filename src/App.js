import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Contact from './components/Contact'
import Register from './components/Register';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
    
    <Router>
      
      <Navbar></Navbar>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    <Switch>
       
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/contact">
          <Contact></Contact>
          </Route>
          <Route exact path="/register">
         <Register></Register>
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
