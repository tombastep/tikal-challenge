import React from 'react';

import NoData from './NoData';

import LoadingGate from './LoadingGate';
import useFetchLeastPopular from '../hooks/useFetchLeastPopular';
import { origin } from '../utils/global';

const LeastPopular = () => {
    const { data, loading } = useFetchLeastPopular(origin);

    return (
        <div>
            <h2>The most unpopular character from Earth C-137</h2>
            <LoadingGate loading={loading}>
                {data ? (
                    <table className='Table'>
                        <tbody>
                            {Object.entries(data).map(([field, value]) => (
                                <tr key={field}>
                                    <th>{field}</th>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <NoData />
                )}
            </LoadingGate>
        </div>
    );
};

export default LeastPopular;
