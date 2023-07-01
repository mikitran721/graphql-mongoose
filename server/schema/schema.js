// suon cua database
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    id: ID
    name: String
    genre: String
    author: Author
  }

  #AUTHOR
  type Author {
    id: ID!
    name: String
    age: Int
    books: [Book]
  }

  #ROOT TYPE
  type Query {
    books: [Book]
    book(id: ID!): Book
    authors: [Author]
    author(id: ID!): Author
  }

  type Mutation {
    createAuthor(name: String, age: Int): Author
    createBook(name: String, genre: String, authorId: ID!): Book
  }
`;
// ID! id ko la null - bat buoc
// mongoDB tu tao ID -> ko truyen ID vo query

/* Mutation: Tuong tac data voi DB */

module.exports = typeDefs;
