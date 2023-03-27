import { Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import Home from "./pages/Home"
import Community from "./pages/Community";
import Navbar from "./components/Navbar"
import User from "./pages/User";
import Transaction from "./pages/Transaction";
import GroupTransaction from "./pages/Transaction/GroupTransaction";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Footer from "./components/Footer";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/user" component={User} />
        <ProtectedRoute exact path="/transaction" component={Transaction} />
        <ProtectedRoute exact path="/transaction/:id" component={GroupTransaction} />
        <Route path="/community" component={Community} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
