import React, { useState, useEffect } from 'react';
import { CharactersData, TableData } from '../@types/types';
import NoData from './NoData';

type Props = {
    characters?: CharactersData;
};
const Table = (props: Props) => {
    const { characters } = props;
    const [data, setData] = useState<TableData>();

    useEffect(() => {
        if (characters) {
            const leastPopular = Object.values(characters)?.reduce((prv, cur) =>
                prv.episode.length || 0 < cur.episode.length || 0 ? cur : prv
            );
            const { name, origin, episode } = leastPopular;
            
            const tableData: TableData = [
                ['Character name', name || ''],
                ['Origin name', origin?.name || ''],
                ['Origin dimension', origin?.dimension || ''],
                ['Popularity', episode.length || 0],
            ];

            setData(tableData);
        }
    }, [characters]);

    return data ? (
        <table className='Table'>
            <tbody>
                {data?.map(([name, value]) => (
                    <tr key={name}>
                        <th>{name}</th>
                        <td>{value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) : (
        <NoData />
    );
};
export default Table;
