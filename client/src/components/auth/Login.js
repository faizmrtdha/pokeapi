import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { API } from "../../hooks/Api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    console.log(form);
    try {
      const users = { email, password };
      const config = { headers: { "Content-Type": "application/json" } };
      const body = JSON.stringify(users);
      const response = await API.post("/login", body, config);
      if (response.data.status === "Success") {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setMsg("Login Success");
        setValidated(true);
        setTimeout(() => {
          navigate("/listpoke");
        }, 1500);
      } else {
        setMsg(response.data.message);
      }
    } catch (e) {
      setMsg(e.response.data.message);
    }
  };

  return (
    <div>
      <Container>
        <Form
          onSubmit={handleSubmit}
          validated={validated}
          className="form-design">
          <Form.Group className="mb-3" controlId="formGroupEmail">
            {msg && <Alert variant="danger">{msg}</Alert>}{" "}
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
