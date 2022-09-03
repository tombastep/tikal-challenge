import React from 'react';
import { ChartData } from '../@types/types';
import NoData from './NoData';

type Props = {
    data?: ChartData;
};
const Chart = (props: Props) => {
    const { data } = props;
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
                            {name}{!value ? ' (N/A)' : ''}
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
