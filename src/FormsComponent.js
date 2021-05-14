import React, { useState } from "react";
import Title from "./Title";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const InputBox = ({ type, name, label, placeholder, id }) => {
  const [value, SetValue] = useState("");

  const updateValue = e => {
    SetValue(e.target.value);
  };

  const ClearValue = () => {
    SetValue("");
  };

  const InputElement = (
    <Form.Group controlId={id}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type={type}
        placeholder={placeholder}
        onChange={updateValue}
        value={value}
      />
    </Form.Group>
  );

  return [value, ClearValue, InputElement];
};

const SelectionButtonBox = ({ name, type, options }) => {
  const [value, SetValue] = useState([]);

  const ClearValue = () => {
    SetValue([]);
  };

  const updateValue = selectedOption => {
    SetValue(
      type === "radio"
        ? [selectedOption]
        : value.indexOf(selectedOption) !== -1
        ? value.filter(v => v !== selectedOption)
        : value.concat([selectedOption])
    );
  };

  const isSelected = selectedOption =>
    value.indexOf(selectedOption) !== -1 ? true : false;

  const SelectionElement = options.map((option, index) => (
    <Form.Check
      type={type}
      key={index}
      onChange={() => updateValue(option)}
      label={option}
      id={`${type}-${option}`}
      name={name}
      checked={isSelected(option)}
      inline
    />
  ));

  return [value, ClearValue, SelectionElement];
};

const DropDownBox = ({ type, options, label }) => {
  const [value, SetValue] = useState("");
  const updateValue = e => {
    SetValue(e.target.value);
  };

  const ClearValue = () => {
    SetValue("");
  };

  const DropDownElement = (
    <Form>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>{label}</Form.Label>
        <Form.Control as={type} onChange={updateValue}>
          <option value="">Select an Option</option>
          {options.map((option, index) => (
            <option label={option} key={index} id={`${type}-${option}`}>
              {option}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Form>
  );
  return [value, ClearValue, DropDownElement];
};

export default function FormsComponent() {
  const [UserName, ClearUserName, UserNameComponent] = InputBox({
    type: "text",
    label: "Username",
    placeholder: "Enter Username",
    id: "username_input"
  });

  const [Password, ClearPassword, PasswordComponent] = InputBox({
    type: "password",
    label: "Password",
    placeholder: "Enter Password",
    id: "password_input"
  });

  const [Radio, ClearRadioSelection, RadioComponent] = SelectionButtonBox({
    options: ["option-1", "option-2"],
    name: "Radio Options",
    id: "radio_input",
    type: "radio"
  });

  const [DropDown, ClearDropDown, DropDownComponent] = DropDownBox({
    options: ["option-1", "option-2", "option-3", "option-4"],
    name: "DropDown Options",
    id: "dropdown_input",
    type: "select",
    label: "DropDown Box"
  });

  const [
    Checkbox,
    ClearCheckboxSelection,
    CheckboxComponent
  ] = SelectionButtonBox({
    options: ["option-1", "option-2"],
    name: "Checkbox Options",
    id: "password_input",
    type: "checkbox"
  });

  const ClearFormValues = () => {
    ClearUserName();
    ClearPassword();
    ClearRadioSelection();
    ClearCheckboxSelection();
    ClearDropDown();
  };

  return (
    <Container fluid>
      <Row className="p-4">
        <Col>
          <Title title="React Form Component" />
        </Col>
        <Col>
          <Button
            className="float-end"
            variant="dark"
            onClick={ClearFormValues}
          >
            Reset Form
          </Button>
        </Col>
      </Row>
      <Container fluid className="m-3">
        <Row className="mb-3">
          <Col>{UserNameComponent}</Col>
          <Col>{PasswordComponent}</Col>
          <Col>
            <Row>
              <Col xs={12} md={12} lg={12} sm={12} className="mb-3">
                Select an Option
              </Col>
              <Col xs={12} md={12} lg={12} sm={12}>
                {RadioComponent}
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col xs={12} md={12} lg={12} sm={12} className="mb-3">
                Select an Option
              </Col>
              <Col xs={12} md={12} lg={12} sm={12}>
                {CheckboxComponent}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12} md={4} lg={3} sm={6}>
            {DropDownComponent}
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>{UserName}</Col>
          <Col>{Password}</Col>
          <Col>{Radio.toString()}</Col>
          <Col>{Checkbox.toString()}</Col>
          <Col>{DropDown}</Col>
        </Row>
      </Container>
    </Container>
  );
}

export const InputBoxElement = InputBox;
