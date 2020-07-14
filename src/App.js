import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage/Homepage";
import ParkDetails from "./pages/ParkDetails/ParkDetails"
import CreatePark from "./pages/CreatePark/CreatePark";


import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import { Jumbotron } from "react-bootstrap";

const Home = () => (
  <Jumbotron>
    <h1>Home</h1>
  </Jumbotron>
);
const Other = () => (
  <Jumbotron>
    <h1>Other</h1>
  </Jumbotron>
);

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>

        <Route exact path="/" component={Homepage} />
        <Route path="/park" component={ParkDetails} />
        <Route path="/park/:id" component={Homepage} />
        <Route path="/createPark" component={CreatePark} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/other" component={Other} />
      </Switch>
    </div>
  );
}

export default App;
