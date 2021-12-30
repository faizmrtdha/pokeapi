import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../hooks/Api";
import { PokemonContext } from "../contexts/PokemonContext";

const MyPoke = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  // const [listPoke, setListPoke] = useState([]);
  const [msg, setMsg] = useState("");

  const { listPoke } = useContext(PokemonContext);
  const local = JSON.parse(localStorage.getItem("user"));
  const id = local.user.id;
  // console.log("id", name);

  console.log("list", listPoke);

  const handleRelease = async (e) => {
    try {
      const response = await API.post("/releasepoke", {
        user_id: local.user.id,
        poke_id: e.target.value,
      });
      if (response.data.status === "success") {
        setMsg("Your pokemon has been released, go catch again!");
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      }
      console.log(response);
    } catch (e) {
      alert(e.response.data.status);
    }
  };

  const handleRename = async (e) => {
    try {
      const response = await API.post(
        `renamepoke/${local.user.id}/${e.target.value}`,
        {
          name: e.target.name,
        }
      );
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
      // console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="poke-list">
      <Container>
        {listPoke.length === 0 && (
          <h3>
            You dont have any pokemon yet!{" "}
            <Link to={"/listpoke"}>Go catch now!</Link>
          </h3>
        )}
        <Row>
          {listPoke.map((poke, index) => (
            <Col xl={3} xs={12} md={6} lg={4} key={index}>
              <Card className="poke-card">
                <Card.Img variant="top" src={poke.image} />
                <Card.Header>
                  <Card.Title className="text-center text-white">
                    {poke.user_poke.name}
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <h3>Height</h3>
                  <Card.Text>Height: {poke.height}</Card.Text>
                  <Card.Text>Weight: {poke.weight}</Card.Text>
                </Card.Body>
                <Button
                  className="mb-3"
                  variant="outline-danger"
                  onClick={handleRelease}
                  value={poke.id}
                  name={poke.user_poke.name}>
                  Release {poke.user_poke.name}
                </Button>
                <Button
                  onClick={handleRename}
                  variant="outline-dark"
                  value={poke.id}
                  name={poke.user_poke.name}>
                  Rename {poke.user_poke.name}
                </Button>
              </Card>
            </Col>
          ))}
          {/* <Card>{listPoke.pokes.name}</Card> */}
        </Row>
      </Container>
    </div>
  );
};

export default MyPoke;
