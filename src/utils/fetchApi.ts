import axios from 'axios';
import { Query } from '../@types/generated';

const apiUrl = process.env.REACT_APP_API_URL;

const fetchApi = async (query: string, variables = {}): Promise<Query> => {
    if (!apiUrl)
        throw new Error('Environment Variable REACT_APP_API_URL is undefined');

    const res = await axios.post(apiUrl, {
        query,
        variables,
    });
    const { data, errors } = res.data;

    if (errors || !data) throw new Error(errors || `Returned no data`);

    return data;
};

export default fetchApi;
