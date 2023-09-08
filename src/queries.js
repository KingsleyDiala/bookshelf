import { gql } from "@apollo/client";

export const BOOKS_QUERY = gql`
  query Books {
    books {
      author
      language
      publisher
      publish_year
      subtitle
      id
      genres
      description
      pages
      price
      isbn
      shelf_number
      stage
      title
      url
      offer
      country
      id
    }
  }
`;


export const CREATE_NEW_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $author: String!
    $language: String!
    $publisher: String!
    $publish_year: String
    $subtitle: String!
    $genres: [String!]
    $description: String!
    $pages: Int
    $price: Float
    $isbn: String!
    $shelf_number: Int
    $url: String
    $offer: Float
    $country: String!
  ) {
    createBook(
      data: {
        title: $title
        author: $author
        language: $language
        publisher: $publisher
        publish_year: $publish_year
        subtitle: $subtitle
        genres: $genres
        description: $description
        pages: $pages
        price: $price
        isbn: $isbn
        shelf_number: $shelf_number
        url: $url
        offer: $offer
        country: $country
      }
    ) {
      author
      language
      publisher
      publish_year
      subtitle
      genres
      description
      pages
      price
      isbn
      shelf_number
      title
      url
      offer
      country
      id
    }
  }
`;

export const PUBLISH_BOOK = gql`
  mutation PublishBook($bookId: ID!) {
    publishBook(where: { id: $bookId }, to: PUBLISHED) {
      id
    }
  }
`;

export const BOOK_QUERY = gql`
  query Book($url: String!) {
    book(where: {url: $url}) {
      author
      language
      publisher
      publish_year
      subtitle
      id
      genres
      description
      pages
      price
      isbn
      shelf_number
      stage
      title
      url
      offer
      country
    }
  }
`;
