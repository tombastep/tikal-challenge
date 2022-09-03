import { useEffect, useState } from 'react';

import { ReturnedCharacters } from '../@types/types';

import getAllEpisodesCharacters from '../queries/getAllEpisodesCharacters';
import getAllEpisodesPages from '../queries/getAllEpisodesPages';
import fetchApi from '../utils/fetchApi';

interface State {
    data?: ReturnedCharacters;
    error?: Error;
    loading: boolean;
}

function useFetchCharactersFromOrigin(planet: string): State {
    const [data, setData] = useState<ReturnedCharacters>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        let shouldFetch = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                const fetchPages = await fetchApi(getAllEpisodesPages);
                const pages = fetchPages.episodes?.info?.pages || 0;

                const promises = [];
                for (let page = 1; page <= pages; page++) {
                    promises.push(
                        fetchApi(getAllEpisodesCharacters, {
                            page,
                        })
                    );
                }

                const queries = await Promise.all(promises);

                const results = queries
                    .map((query) => query.episodes?.results)
                    .flat();

                const characters = results.reduce((obj, episode) => {
                    episode?.characters?.forEach((character) => {
                        const { name, origin } = character || {};
                        if (name && origin?.name === planet) {
                            if (obj[name]) obj[name].episode.push(episode);
                            else {
                                obj[name!] = {
                                    name,
                                    origin,
                                    episode: [episode],
                                };
                            }
                        }
                    });

                    return obj;
                }, {} as ReturnedCharacters);

                setData(characters);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        if (shouldFetch) fetchData();

        return () => {
            shouldFetch = false;
        };
    }, [planet]);

    return { data, loading, error };
}

export default useFetchCharactersFromOrigin;
