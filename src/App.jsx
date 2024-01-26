import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar/Navbar';
import MovieCard from './components/movieCard/MovieCard';
import SearchBar from './components/searchBar/SearchBar';

function App() {
  const [allMovieData, setAllMovieData] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const fetchMovieData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://omdbapi.com/?s=${searchMovie}&apikey=a1de9591`);
      const data = await res.json();

      if (data.Response === 'True') {
        setAllMovieData(data.Search);
      } else {
        setAllMovieData([]);
      }

      setLoading(false);
      setSearchPerformed(true); // Set searchPerformed to true after the search
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg">
        <SearchBar searchMovie={searchMovie} setSearchMovie={setSearchMovie} fetchMovieData={fetchMovieData} />
        <MovieCard allMovieData={allMovieData} loading={loading} searchPerformed={searchPerformed} />
      </div>
    </div>
  );
}

export default App;
