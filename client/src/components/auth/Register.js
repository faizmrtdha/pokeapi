import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { API } from "../../hooks/Api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    try {
      const users = { email, password, name };
      const config = { headers: { "Content-Type": "application/json" } };
      const body = JSON.stringify(users);
      const response = await API.post("/register", body, config);
      if (response.status === "success" && form.checkValidty()) {
        setMsg(response.data.message);
        setValidated(true);
      } else {
        setMsg(response.data.message);
      }
      console.log(response.data.message);
    } catch (e) {
      console.log("error", e);
    }
  };
  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="test"
            placeholder="Enter email"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback>{msg}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback>{msg}</Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
