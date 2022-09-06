import React from 'react';

import './App.css';
import CharactersChart from './components/CharactersChart';
import LeastPopular from './components/LeastPopular';

function App() {
    return (
        <div className='App'>
            <header>Rick and Morty - Tikal Code Challenge</header>
            <LeastPopular />
            <CharactersChart />
        </div>
    );
}

export default App;
