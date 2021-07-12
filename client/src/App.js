import './App.css';
import { ApolloProvider } from '@apollo/client'
import Home from './pages/Home'
import client from './config'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Series from './pages/Series';
import Movies from './pages/Movies';
import AddContent from './pages/AddContent';
import EditContent from './pages/EditContent';
import Navbar from './components/Navbar';
import Favorites from './pages/Favorites';
import Detail from './pages/Detail';

function App() {
  return (

    <ApolloProvider client={client}>
      <Router>
        <div className="d-flex">
          <Navbar />
          <div className="container ">
            <Switch>
              <Route exact path="/favorites" component={Favorites} />
              <Route exact path="/" component={Home} />
              <Route exact path="/series" component={Series} />
              <Route exact path="/movies" component={Movies} />
              <Route exact path="/content/add" component={AddContent} />
              <Route exact path="/:content/:id" component={Detail} />
              <Route exact path="/:content/edit/:id" component={EditContent} />
            </Switch>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
