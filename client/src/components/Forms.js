import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Forms = () => {
  return (
    <Row>
      <Col>
        <Form>
          <Form.Group>
            <Form.Control type="text" placeholder="Book name..." />
          </Form.Group>
          <Form.Group>
            <Form.Control type="text" placeholder="Book genre..." />
          </Form.Group>
          <Form.Group>
            <Form.Control as="select" defaultValue="Select author">
              <option disabled>Select author</option>
            </Form.Control>
          </Form.Group>
          <Button className="float-right" variant="info" type="submit">
            Add book
          </Button>
        </Form>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default Forms;
