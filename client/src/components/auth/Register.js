import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../hooks/Api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const users = { email, password, name };
      const config = { headers: { "Content-Type": "application/json" } };
      const body = JSON.stringify(users);
      const response = await API.post("/register", body, config);
      if (response.status === "Success") {
        setMsg(response.data.message);
        setValidated(true);
      } else {
        setMsg(response.data.message);
      }
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (e) {
      setMsg(e.response.data.message);
    }
  };
  return (
    <div>
      <Container>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="form-design">
          <Form.Group className="mb-3" controlId="formGroupName">
            {msg && <Alert variant="success">{msg}</Alert>}{" "}
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="test"
              placeholder="Enter email"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Text>
            Have an account? <Link to="/">Click here to login</Link>
          </Form.Text>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
