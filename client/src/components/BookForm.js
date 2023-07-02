import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useQuery, useMutation } from "@apollo/client";
import { getAuthors, getBooks } from "../graphql-client/queries";
import { addSingleBook } from "../graphql-client/mutations";

const BookForm = () => {
  const [newBook, setNewBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  //destructuring
  const { name, genre, authorId } = newBook;

  const onInputChange = (event) => {
    setNewBook({
      ...newBook,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault(); //ko cho load lai page
    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooks }], //goi them query getBooks
    });

    setNewBook({
      name: "",
      genre: "",
      authorId: "",
    });
  };

  // GraphQL operations
  const { loading, error, data } = useQuery(getAuthors);

  const [addBook, dataMutation] = useMutation(addSingleBook);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          name="name"
          placeholder="Book name..."
          onChange={onInputChange}
          value={name}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          name="genre"
          placeholder="Book genre..."
          onChange={onInputChange}
          value={genre}
        />
      </Form.Group>

      <Form.Group>
        {loading ? (
          <p>Loading authors...</p>
        ) : (
          <>
            <Form.Control
              as="select"
              defaultValue="Select author"
              name="authorId"
              onChange={onInputChange}
              value={authorId}
            >
              <option value="" disabled>
                Select author
              </option>
              {data.authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </Form.Control>
          </>
        )}
      </Form.Group>

      <Button className="float-right" variant="info" type="submit">
        Add book
      </Button>
    </Form>
  );
};

export default BookForm;
