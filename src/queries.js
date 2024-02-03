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


export const USERS_QUERY = gql`
  query MyQuery {
    authorizedUsers {
      id
      name
      password
      email
    }
  }
`;


export const COMMENTS_QUERY = gql`
  query Comments {
    comments {
      author
      bookId
      content
      createdAt
      id
      updatedAt
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

export const CREATE_NEW_COMMENT = gql`
  mutation CreateComment(
    $author: String!
    $content: String!
    $bookId: String!
  ) {
    createComment(
      data: {
        author: $author
        content: $content
        bookId: $bookId
      }
    ) {
      author
      bookId
      content
      createdAt
      id
      updatedAt
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

export const PUBLISH_COMMENT= gql`
  mutation PublishComment($commentId: ID!) {
    publishComment(where: { id: $commentId }, to: PUBLISHED) {
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


export const UNPUBLISH_BOOK = gql`
  mutation UnpublishBook($bookId: ID!) {
    unpublishBook(where: { id: $bookId }, from: PUBLISHED) {
      id
    }
  }
`;

export const UNPUBLISH_COMMENT = gql`
  mutation UnpublishComment($commentId: ID!) {
    unpublishComment(where: { id: $commentId }, from: PUBLISHED) {
      id
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $title: String
    $author: String
    $language: String
    $publisher: String
    $publish_year: String
    $subtitle: String
    $genres: [String!]
    $description: String
    $pages: Int
    $price: Float
    $isbn: String
    $shelf_number: Int
    $url: String
    $offer: Float
    $country: String
    $id: ID!
  ) {
    updateBook(
      where: {id: $id },
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

export const UPDATE_COMMENT = gql`
  mutation UpdateComment(
    $author: String
    $content: String
    $bookId: String
    $id: ID!
  ) {
    updateComment(
      where: { id: $id }
      data: { author: $author, content: $content, bookId: $bookId }
    ) {
      author
      bookId
      content
      createdAt
      id
      updatedAt
    }
  }
`;