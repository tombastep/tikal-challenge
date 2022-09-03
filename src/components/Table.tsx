import React from 'react';
import { TableData } from '../@types/types';
import NoData from './NoData';

type Props = {
    data?: TableData;
};
const Table = (props: Props) => {
    const { data } = props;
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
