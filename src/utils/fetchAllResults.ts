import axios from 'axios';
import { Info, Maybe } from '../@types/generated';

interface Query<T> {
    info: Maybe<Info>;
    results: Maybe<Array<Maybe<T>>>;
}

async function fetchAllResults<T>(endpoint: string, params = {}) {
    try {
        const firstPage = await axios.get<Query<T>>(endpoint, { params });
        const results = [firstPage.data.results];
        const pages = firstPage.data.info?.pages;

        if (pages) {
            for (let page = 2; page <= pages; page++) {
                const nextPage = await axios.get<Query<T>>(endpoint, {
                    params: { ...params, page },
                });
                results?.push(nextPage.data.results);
            }

            return results.flat();
        } else {
            throw new Error('No Data Returned');
        }
    } catch (error) {
        throw error;
    }
}

export default fetchAllResults;
