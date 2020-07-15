import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PreviewCard from "../../components/PreviewCard/PreviewCard";
import CardColumns from "react-bootstrap/CardColumns";
import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//Redux
import { fetchParks } from "../../store/parks/actions";
import { selectParks } from "../../store/parks/selectors";

export default function Homepage() {
  const dispatch = useDispatch();
  const parks = useSelector(selectParks);

  useEffect(() => {
    dispatch(fetchParks());
    console.log("parks in homepage:", parks);
  }, [dispatch]);

  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <Row>
            <Col>
              <h1>Most popular parks</h1>
            </Col>
            <Col>
              <Form>
                <Form.Control type="text" placeholder="Search" />
                <Form.Text className="text-muted"></Form.Text>
              </Form>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <CardColumns>
        {parks.rows &&
          parks.rows.map((park) => {
            return (
              <PreviewCard
                title={park.title}
                description={park.description}
                imageUrl={park.image}
                country={park.country}
                type={park.type}
                id={park.id}
              />
            );
          })}
      </CardColumns>
    </div>
  );
}
