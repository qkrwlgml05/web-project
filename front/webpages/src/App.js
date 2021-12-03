import './App.css';
import {lazy, Suspense} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

const HomeScreen = lazy(() => import('./pages/Home.js'));
const BlogScreen = lazy(() => import('./pages/Blog.js'));
//const Dashboard = lazy(() => import('./pages/Dashboard.js'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>. . . L O A D I N G . . .</div>}>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/diary" component={BlogScreen} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
