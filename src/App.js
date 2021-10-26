import './App.css';
import './reset.css'

import Hero from './Components/Hero'
import Gallery from './Components/Gallery'
import Artwork from './Components/Artwork'

import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">

      <Switch>
        <Route exact path="/">

          <Hero />
          <Gallery />

        </Route>
        <Route path="/artworks/:id">

          <Artwork />
          
        </Route>
      </Switch>

    </div>
  );
}

export default App;
