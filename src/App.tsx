import React, { useEffect, useMemo, useState } from 'react';
import { Character } from './@types/generated';
import './App.css';
import LoadingGate from './components/LoadingGate';

import useFetchCharactersFromOrigin from './hooks/useFetchCharactersFromOrigin';

function App() {
    const {
        data: characters,
        loading,
        error,
    } = useFetchCharactersFromOrigin('Earth (C-137)');
    const [leastPopular, setLeastPopular] = useState<Character>();
    const [chartValues, setChartValues] = useState<number[]>();

    const chartMaxValue = useMemo(() => {
        if (chartValues) return Math.max(...chartValues);
    }, [chartValues]);

    const chartNames = useMemo(
        () => [
            'Rick Sanchez',
            'Summer Smith',
            'Morty Smith',
            'Beth Smith',
            'Jerry Smith',
        ],
        []
    );

    useEffect(() => {
        if (characters) {
            setLeastPopular(
                Object.values(characters)?.sort(
                    (a, b) => a.episode.length || 0 - b.episode.length || 0
                )[0]
            );
            const values = chartNames.map(
                (name) => characters[name]?.episode.length || 0
            );
            setChartValues(values);
        }
    }, [characters, chartNames]);

    useEffect(() => {
        if (error) console.log(error);
    }, [error]);

    return (
        <div className='App'>
            <header>
                <h1>Rick and Morty - Tikal Code Challenge</h1>
            </header>
            <h2>The most unpopular character from Earth C-137</h2>
            <div className='table'>
                <LoadingGate loading={loading}>
                    {leastPopular && (
                        <table>
                            <tbody>
                                <tr>
                                    <th>Character name</th>
                                    <td>{leastPopular.name}</td>
                                </tr>
                                <tr>
                                    <th>Origin name</th>
                                    <td>{leastPopular.origin?.name}</td>
                                </tr>
                                <tr>
                                    <th>Origin dimension</th>
                                    <td>{leastPopular.origin?.dimension}</td>
                                </tr>
                                <tr>
                                    <th>Popularity</th>
                                    <td>{leastPopular.episode.length}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </LoadingGate>
            </div>
            <div className='chart'>
                <h2>Popularity chart for characters from Earth C-137</h2>
                <p>
                    <b>Selected characters:</b> {chartNames.join(', ')}.
                </p>
                <div>
                    <LoadingGate loading={loading}>
                        {chartValues && chartMaxValue && (
                            <table
                                className='bar-chart'
                                cellSpacing='0'
                                cellPadding='1'
                            >
                                <tbody>
                                    <tr className='bars'>
                                        {chartValues.map((value, index) => (
                                            <td
                                                key={`${chartNames[index]}-value`}
                                            >
                                                <span className='label'>
                                                    {value}
                                                </span>
                                                <div
                                                    className='bar'
                                                    style={{
                                                        height: `${
                                                            (value /
                                                                chartMaxValue) *
                                                            100
                                                        }%`,
                                                    }}
                                                ></div>
                                            </td>
                                        ))}
                                    </tr>
                                    <tr className='names'>
                                        {chartNames.map((name, index) => (
                                            <td key={name} className='name'>
                                                {name}{' '}
                                                {!chartValues[index]
                                                    ? '(N/A)'
                                                    : ''}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </LoadingGate>
                </div>
            </div>
        </div>
    );
}

export default App;
