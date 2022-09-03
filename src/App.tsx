import React, { useEffect, useState } from 'react';
import { ChartData, TableData } from './@types/types';

import './App.css';
import Chart from './components/Chart';
import LoadingGate from './components/LoadingGate';
import Table from './components/Table';

import useFetchCharactersFromOrigin from './hooks/useFetchCharactersFromOrigin';
import charactersToCompare from './utils/charactersToCompare';

function App() {
    const {
        data: characters,
        loading,
        error,
    } = useFetchCharactersFromOrigin('Earth (C-137)');

    const [tableData, setTableData] = useState<TableData>();
    const [chartData, setChartData] = useState<ChartData>();

    // Set Table Data
    useEffect(() => {
        if (characters) {
            const leastPopular = Object.values(characters)?.reduce((prv, cur) =>
                prv.episode.length || 0 < cur.episode.length || 0 ? cur : prv
            );
            const { name, origin, episode } = leastPopular;
            const data: TableData = [
                ['Character name', name || ''],
                ['Origin name', origin?.name || ''],
                ['Origin dimension', origin?.dimension || ''],
                ['Popularity', episode.length || 0],
            ];
            setTableData(data);
        }
    }, [characters]);

    // Set Chart Data
    useEffect(() => {
        if (characters) {
            const values: number[] = charactersToCompare.map(
                (name) => characters[name]?.episode.length || 0
            );
            const maxValue = Math.max(...values);
            const data: ChartData = charactersToCompare.map((name, i) => [
                name,
                values[i],
                `${(values[i] / maxValue) * 100}%`,
            ]);
            setChartData(data);
        }
    }, [characters]);

    // Error Handling
    useEffect(() => {
        if (error) console.log(error);
    }, [error]);

    return (
        <div className='App'>
            <header>Rick and Morty - Tikal Code Challenge</header>
            <h2>The most unpopular character from Earth C-137</h2>
            <div>
                <LoadingGate loading={loading}>
                    <Table data={tableData} />
                </LoadingGate>
            </div>
            <div>
                <h2>Popularity chart for characters from Earth C-137</h2>
                <p>
                    <b>Selected characters:</b> {charactersToCompare.join(', ')}
                    .
                </p>
                <LoadingGate loading={loading}>
                    <Chart data={chartData} />
                </LoadingGate>
            </div>
        </div>
    );
}

export default App;
