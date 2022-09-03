import React, { useEffect } from 'react';

import './App.css';
import Chart from './components/Chart';
import LoadingGate from './components/LoadingGate';
import Table from './components/Table';

import useFetchCharactersFromOrigin from './hooks/useFetchCharactersFromOrigin';
import charactersToCompare from './utils/charactersToCompare';

function App() {
    const { data, loading, error } =
        useFetchCharactersFromOrigin('Earth (C-137)');

    useEffect(() => {
        if (error) console.log(error);
    }, [error]);

    return (
        <div className='App'>
            <header>Rick and Morty - Tikal Code Challenge</header>
            <h2>The most unpopular character from Earth C-137</h2>
            <div>
                <LoadingGate loading={loading}>
                    <Table characters={data} />
                </LoadingGate>
            </div>
            <div>
                <h2>Popularity chart for characters from Earth C-137</h2>
                <p>
                    <b>Selected characters:</b> {charactersToCompare.join(', ')}
                    .
                </p>
                <LoadingGate loading={loading}>
                    <Chart characters={data} />
                </LoadingGate>
            </div>
        </div>
    );
}

export default App;
