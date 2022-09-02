import { useEffect, useState } from 'react';
import { Character, Info } from '../@types/generated';
import { fetchApi } from '../utils/fetchApi';

interface State {
    data?: Record<string, Character>;
    error?: Error;
    loading: boolean;
}

const getAllEpisodesPages = `#graphql
    query getAllEpisodesPages {
        episodes {
            info {
                pages
            }
        }
    }
`;

const getAllEpisodesCharacters = `#graphql
query getAllEpisodesCharacters($page: Int) {
    episodes(page: $page) {
        results {
            name
            characters {
                id
                name
                origin {
                    name
                    dimension
                }
            }
        }
    }
}
`;

function useFetchCharactersFromOrigin(planet: string): State {
    const [data, setData] = useState<Record<string, Character>>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState<boolean>(false);
    const [pages, setPages] = useState<Info['pages']>();

    useEffect(() => {
        let shouldFetch = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                if (!pages) {
                    const res = await fetchApi(getAllEpisodesPages);
                    setPages(res.episodes?.info?.pages);
                } else {
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
                    }, {} as Record<string, Character>);

                    setData(characters);
                    setLoading(false);
                }
            } catch (error) {
                setError(error as Error);
                setLoading(false);
            }
        };

        if (shouldFetch) fetchData();

        return () => {
            shouldFetch = false;
        };
    }, [pages, planet]);

    return { data, loading, error };
}

export default useFetchCharactersFromOrigin;
