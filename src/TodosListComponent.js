import React, { useState } from "react";

import { Container, ListGroup, Button, Row, Col, Form } from "react-bootstrap";
import Title from "./Title";
import { BsFillTrash2Fill } from "react-icons/bs";

export default function TodoListComponent() {
  const [todos, updateTodos] = useState([]);

  const addNewTodo = () => {
    if (Todo) {
      updateTodos([].concat(todos, Todo));
      ClearTodo();
    }
  };

  const deleteTodo = todoIndex => {
    updateTodos(todos.filter((t, i) => i !== todoIndex));
  };

  const IconButtonElement = ({ icon, cssClasses, variant, onClickHandler }) => (
    <Button className={cssClasses} variant={variant} onClick={onClickHandler}>
      {icon}
    </Button>
  );

  const ListGroupItems = ({ items }) => {
    return (
      <ListGroup>
        {items.map((todo, index) => (
          <ListGroup.Item key={index} action>
            <Container>
              <Row className="justify-content-center align-items-center">
                <Col>{todo}</Col>
                <Col>
                  <IconButtonElement
                    cssClasses="float-end"
                    variant="outline-danger"
                    onClickHandler={() => deleteTodo(index)}
                    icon={<BsFillTrash2Fill />}
                  />
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  const TodoFormElement = () => {
    const [todoInputBox, updatetodoInputBox] = useState("");

    const captureTodoInput = e => {
      updatetodoInputBox(e.target.value);
    };

    const ClearInput = () => {
      updatetodoInputBox("");
    };

    const FormElement = (
      <Form inline>
        <Form.Group controlId="todo">
          <Form.Control
            placeholder="Enter Todo Item"
            onChange={captureTodoInput}
            value={todoInputBox}
          />
        </Form.Group>
      </Form>
    );

    return [todoInputBox, ClearInput, FormElement];
  };

  const [Todo, ClearTodo, TodoFormComponent] = TodoFormElement();

  return (
    <Container className="m-3" fluid>
      <Row>
        <Col>
          <Title title="Todos List Component" />
        </Col>
        <Col md={8} sm={12} xs={12} lg={8} className="m-auto">
          <Row className="float-end">
            <Col>{TodoFormComponent}</Col>
            <Col>
              <Button onClick={addNewTodo}>Add Todo</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Container className="mt-3">
        <Row className="m-3">
          {!todos.length && <h4 className="text-center">No Todos Present.</h4>}
        </Row>
        <Row className="mb-3">
          <Col>
            <ListGroupItems items={todos} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
