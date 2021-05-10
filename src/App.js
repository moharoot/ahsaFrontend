import React, {useEffect} from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import Main from './components/Main';
import Credits from './components/Credits';
import Debits from './components/Debits';
import TransactionReport from './components/TransactionReport';
import Customers from './components/Customers';
import ClientTransaction from './components/ClientTransaction';
import AddRate from './components/SystemSettings/AddRate';
import { useDispatch, useSelector } from 'react-redux'
import { userLoaded } from './store/actions/authActions' 
import Test from './components/Test';
import Login from './components/accounts/Login'
import PrivateRoute from './components/common/PrivateRoute'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {  
    dispatch(userLoaded());
  }, []);
  const isAuthenticated = useSelector(state => state.authR.isAuthenticated); 
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/login' component={Login} />
       { isAuthenticated && <Header/> } 
        <main>
          <Switch>     
            {/* <Route exact path='/home' component={Home} /> */}
            <PrivateRoute exact path='/' component={Main} />
            <PrivateRoute path='/customers' component={Customers} />
            <PrivateRoute path='/credits' component={Credits} />
            <PrivateRoute path='/debits' component={Debits} />
            <PrivateRoute path='/exchange-rates' component={AddRate} />
            <PrivateRoute path='/test' component={Test} />
            <PrivateRoute path='/transaction-report' component={TransactionReport} />
            <PrivateRoute path='/client-transaction' component={ClientTransaction} />
          </Switch> 
        </main> 
      </div>
    </BrowserRouter>
  );
}

export default App;
