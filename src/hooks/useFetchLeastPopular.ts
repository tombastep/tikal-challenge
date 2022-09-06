import { Episode } from '../@types/generated';

import { useEffect, useState } from 'react';

import axios from 'axios';
import fetchAllPages from '../utils/fetchAllResults';

type Data = Record<string, string | number>;

interface State {
    data?: Data;
    error?: Error;
    loading: boolean;
}

interface Character {
    url: string;
    episodes: Episode[];
}

type CharactersData = Record<string, Character>;

const endpoint = `${process.env.REACT_APP_API_URL}/episode`;

function useFetchLeastPopular(fromOrigin: string): State {
    const [data, setData] = useState<Data>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        let shouldFetch = true;

        const fetchData = async () => {
            if (shouldFetch) {
                try {
                    setLoading(true);

                    const res = await fetchAllPages<Episode>(endpoint);

                    const characters = res.reduce((obj, episode) => {
                        episode?.characters?.forEach((url: string) => {
                            const id = url.split('/').pop();
                            if (obj[id!]) obj[id!].episodes.push(episode);
                            else {
                                obj[id!] = {
                                    url,
                                    episodes: [episode],
                                };
                            }
                        });

                        return obj;
                    }, {} as CharactersData);

                    const sorted = Object.values(characters)?.sort(
                        (a, b) => a.episodes.length - b.episodes.length
                    );

                    for (const next of sorted) {
                        const character = await axios.get(next.url);
                        const { name, origin, episode } = character.data;

                        if (origin?.name === fromOrigin) {
                            const location = await axios.get(origin.url);
                            const { dimension } = location.data;

                            setData({
                                'Character name': name || 'N/A',
                                'Origin name': origin?.name || 'N/A',
                                'Origin dimension': dimension || 'N/A',
                                Popularity: episode?.length || 'N/A',
                            });

                            break;
                        }
                    }
                } catch (error) {
                    setError(error as Error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            shouldFetch = false;
        };
    }, [fromOrigin]);

    useEffect(() => {
        if (error) console.log(error);
    }, [error]);

    return { data, error, loading };
}

export default useFetchLeastPopular;
