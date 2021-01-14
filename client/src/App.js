import {React, useEffect, createContext,useReducer,useContext} from "react";
import {BrowserRouter as Router, Route,useHistory, Switch} from "react-router-dom";
import {reducer, initialState} from "./reducer/userReducer"
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Post  from "./components/Post";
import './App.css';

export const UserContext = createContext();

const Routing = () =>{
  const history = useHistory();
  const {state,dispatch} = useContext(UserContext);

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    
    if(user){
      dispatch({type:"USER", payload:user});
    }else{
      history.push("/login");
    }
  }, []);

  return (
    <div >
      <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/post" exact component={Post}/>
      </Switch>
    </div>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div >
      <UserContext.Provider value={{state, dispatch}}>
        <Router>
          <Navbar/>
          <Routing />
        </Router>
      </UserContext.Provider>
    </div>

  );
}

export default App;
