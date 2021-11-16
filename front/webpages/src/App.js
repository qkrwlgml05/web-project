import './App.css';
import {lazy, Suspense} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

const HomeScreen = lazy(() => import('./pages/Home.js'));
//const Dashboard = lazy(() => import('./pages/Dashboard.js'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>. . . L O A D I N G . . .</div>}>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
