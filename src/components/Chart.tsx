import React, { useState, useEffect } from 'react';
import { CharactersData, ChartData } from '../@types/types';
import charactersToCompare from '../utils/charactersToCompare';
import NoData from './NoData';

type Props = {
    characters?: CharactersData;
};
const Chart = (props: Props) => {
    const { characters } = props;
    const [data, setData] = useState<ChartData>();

    useEffect(() => {
        if (characters) {
            const values: number[] = charactersToCompare.map(
                (name) => characters[name]?.episode.length || 0
            );
            const maxValue = Math.max(...values);

            const chartData: ChartData = charactersToCompare.map((name, i) => [
                name,
                values[i],
                `${(values[i] / maxValue) * 100}%`,
            ]);

            setData(chartData);
        }
    }, [characters]);

    return data ? (
        <table className='Chart'>
            <tbody>
                <tr className='bars'>
                    {data?.map(([name, value, height]) => (
                        <td key={name}>
                            <div className='container'>
                                <span className='label'>{value}</span>
                                <div className='bar' style={{ height }}></div>
                            </div>
                        </td>
                    ))}
                </tr>
                <tr className='names'>
                    {data?.map(([name, value]) => (
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
    );
};
export default Chart;
