import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';

import CharacterList from './components/Characters/CharacterList';
import FilmList from './components/Films/FilmList';

function App() {
  const [films, setFilms] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getFilms();
    getCharacters();
  }, []);

  const getFilms = async () => {
    // Add your code here!
    // 1. Get data using fetch from https://the-one-api.dev/v2/movie/ (don't forget to set your header!)
    // 2. Transform the response so that films contains nested arrays of:
    //   - the film's title
    //   - the film's title "slugified" i.e. in all lower case, with words separated with dashes,
    //   - the box office total
    //   - academy award nominations
    // NOTE: make sure you look at the response from the server - it may not be consistent
    // [["The Lord of the Rings Series", "the-lord-of-the-rings-series", 2917, 30 ], ["The Hobbit Series", "the-hobit-series", 2932, 7]...]

    // 3. Set the resulting transformation as state using setFilms
    // 4. You'll know it works if the films show up on the page
    const resp = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/films`, {
      headers: {
        apikey: process.env.REACT_APP_SUPABASE_KEY,
        Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`,
      },
    });
    const data = await resp.json();
    const filmData = data.map((film) => [
      film.title,
      film.title.toLowerCase().replace(/ /g, '-'),
      film.box_office_total,
      film.academy_award_nominations,
    ]);
    setFilms(filmData);
    return [FilmList];
  };

  const getCharacters = async () => {
    // Add your code here!
    // 1. Get data using fetch from https://the-one-api.dev/v2/character/
    // 2. Update the response data with the key `dates` which is a combination of
    //    the `birth` key and the `death key` separated with a dash. If neither date
    //    is provided, it should hold the string 'Unknown'
    //    [
    //       {name: 'Adanel', birth: "", death: "", dates: "Unknown", ...},
    //       {name: 'Adrahil I', birth: "Before , TA 1944", death: "Late , Third Age", dates: "Before , TA 1944 - Late , Third Age", ...},
    //       {name: 'Adrahil II', birth: "TA 2917", death: "TA 3010, dates: "TA 2917 - TA 3010", ...},
    //    ]
    // 3. Set the resulting transformation as state using setCharacters
    // 4. You'll know it works if the characters show up on the page
    const resp = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/characters`, {
      headers: {
        apikey: process.env.REACT_APP_SUPABASE_KEY,
        Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`,
      },
    });
    const data = await resp.json();
    const charData = data.map((char) => ({
      name: char.name,
      birth: char.birth,
      death: char.death,
      dates: char.birth === char.death ? 'Unknown' : `${char.birth} - ${char.death}`, //thank you michelle for explaining Ternary expression's to me
    }));
    setCharacters(charData);
    return [CharacterList];
  };

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <NavLink to="/films" data-testid="film-link">
            Films
          </NavLink>
          <NavLink to="/characters" data-testid="char-link">
            Characters
          </NavLink>
        </header>
        <Switch>
          <Route path="/films">
            <FilmList films={films} setFilms={setFilms} />
          </Route>
          <Route path="/characters">
            <CharacterList characters={characters} setCharacters={setCharacters} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
