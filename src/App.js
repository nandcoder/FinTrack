import { Switch, Route,Redirect } from "react-router-dom";
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import Home from "./pages/Home"
import Community from "./pages/Community";
import User from "./pages/User";
import Transaction from "./pages/Transaction";
// import Team from "./pages/Team";
import GroupTransaction from "./pages/Transaction/GroupTransaction";
import UserTransaction from "./pages/Transaction/UserTransaction";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/user" component={User} />
          <ProtectedRoute exact path="/transaction" component={Transaction} />
          <ProtectedRoute exact path="/transaction/group/:id" component={GroupTransaction} />
          <ProtectedRoute exact path="/transaction/user/:id" component={UserTransaction} />
          <ProtectedRoute path="/community" component={Community} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="*" component={() => <Redirect to={'/login'}/> } />
          {/* <Route path="/team" component={Team} /> */}
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
