import './App.css';
import {lazy, Suspense} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

const HomeScreen = lazy(() => import('./pages/Home.js'));
const BlogScreen = lazy(() => import('./pages/Blog.js'));
const PostScreen = lazy(() => import('./pages/PostBlog.js'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>. . . L O A D I N G . . .</div>}>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/diary" component={BlogScreen} />
          <Route exact path="/diary/:id" component={PostScreen} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
