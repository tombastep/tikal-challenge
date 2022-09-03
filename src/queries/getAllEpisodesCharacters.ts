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

export default getAllEpisodesCharacters