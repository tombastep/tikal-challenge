import React, { useState, useEffect } from 'react';

import useFetchEpisodesByCharacter from '../hooks/useFetchEpisodesByCharacter';

import { characters } from '../utils/global';

import LoadingGate from './LoadingGate';
import NoData from './NoData';

export type ChartData = [string, number, string][];

const CharactersChart = () => {
    const { data, loading } = useFetchEpisodesByCharacter(characters);
    const [chartData, setChartData] = useState<ChartData>();

    useEffect(() => {
        if (data) {
            const entries: [string, number][] = Object.entries(data).map(
                ([name, episodes]) => [name, episodes?.length || 0]
            );
            const maxValue = Math.max(
                ...entries.map(([_name, value]) => value)
            );

            setChartData(
                entries.map(([name, value]) => [
                    name,
                    value,
                    `${(value / maxValue) * 100}%`,
                ])
            );
        }
    }, [data]);

    return chartData ? (
        <div>
            <h2>Characters popularity chart</h2>
            <p>
                <b>Selected characters:</b> {characters.join(', ')}.
            </p>
            <LoadingGate loading={loading}>
                {chartData ? (
                    <table className='Chart'>
                        <tbody>
                            <tr className='bars'>
                                {chartData.map(([name, value, height]) => (
                                    <td key={name}>
                                        <div className='container'>
                                            <span className='label'>
                                                {value}
                                            </span>
                                            <div
                                                className='bar'
                                                style={{ height }}
                                            ></div>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                            <tr className='names'>
                                {chartData.map(([name, value]) => (
                                    <td key={name} className='name'>
                                        {name}
                                        {!value ? ' (N/A)' : ''}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <NoData />
                )}
            </LoadingGate>
        </div>
    ) : (
        <NoData />
    );
};
export default CharactersChart;
