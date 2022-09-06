import { Character } from '../@types/generated';

import { useEffect, useState } from 'react';

import fetchAllPages from '../utils/fetchAllResults';

type CharacterEpisodes = string[];
type Data = Record<string, CharacterEpisodes>;

interface State {
    data?: Data;
    error?: Error;
    loading: boolean;
}

const endpoint = `${process.env.REACT_APP_API_URL}/character`;

function useFetchEpisodesByCharacter(names: string[]): State {
    const [data, setData] = useState<Data>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        let shouldFetch = true;

        const fetchData = async () => {
            if (shouldFetch) {
                try {
                    setLoading(true);

                    for (const name of names) {
                        const res = await fetchAllPages<Character>(endpoint, {
                            name,
                        });

                        const episodes = res?.reduce(
                            (prv, cur) =>
                                cur?.episode ? [...prv, ...cur.episode] : prv,
                            [] as CharacterEpisodes
                        );

                        setData((prevData) => ({
                            ...prevData,
                            [name]: episodes,
                        }));
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
    }, [names]);

    useEffect(() => {
        if (error) console.log(error);
    }, [error]);

    return { data, error, loading };
}

export default useFetchEpisodesByCharacter;
