import React from 'react'

import ReactMarkdown from 'react-markdown';

//import the required libraries
import { useQuery, gql } from '@apollo/client';

// Our GraphQl query, stored as a varialble
const GET_NOTES = gql`
    query noteFeed($cursor: String) {
        noteFeed(cursor: $cursor) {
            cursor
            hasNextPage
            notes {
                id
                createdAt
                content
                favoriteCount
                author {
                    username
                    id
                    avatar
                }
            }
        }
    }
`;

import Button from '../components/Button'
import NoteFeed from '../components/NoteFeed'

const Home = () => {
    // query hook
    const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
    // if the data is loading, display a loading message
    if(loading) return <p>Loading...</p>;
    // if there is an error fetching the data, display an error message
    if(error) return <p>Error!</p>

    // if the data is successfull, display the data in our UI
    // return  <NoteFeed notes={data.noteFeed.notes} />;

    // if the data is successful, display the data in our UI
    return (
        // add a <React.Fragment> element to provide a parent element
        <React.Fragment>
            <NoteFeed notes={data.noteFeed.notes} />
            {data.noteFeed.hasNextPage && (
                <Button
                    onClick={() =>
                        fetchMore({
                            variables: {
                                cursor: data.noteFeed.cursor
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                return {
                                    noteFeed: {
                                        cursor: fetchMoreResult.noteFeed.cursor,
                                        hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                                        // combine the new result and the old
                                        notes: [
                                            ...previousResult.noteFeed.notes,
                                            ...fetchMoreResult.noteFeed.notes
                                        ],
                                        __typename: 'noteFeed'
                                    }
                                };
                            }
                        })
                    }
                    >
                        Load more
                </Button>
            )}
        </React.Fragment>
    );

};

export default Home;
