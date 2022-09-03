const getAllEpisodesPages = `#graphql
    query getAllEpisodesPages {
        episodes {
            info {
                pages
            }
        }
    }
`;

export default getAllEpisodesPages;
