import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PreviewCard from "../../components/PreviewCard/PreviewCard";
import CardColumns from "react-bootstrap/CardColumns";
import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//Redux
import { selectParks } from "../../store/parks/selectors";
import { fetchParks } from "../../store/parks/actions";

export default function Homepage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  const parks = useSelector(selectParks);

  useEffect(() => {
    dispatch(fetchParks());
  }, [dispatch]);

  //search by country, park title

  let parksToDisplay;

  if (country) {
    parksToDisplay = parks.filter((park) => park.country.includes(country));
  } else if (search) {
    parksToDisplay = parks.filter((park) =>
      park.title.toLowerCase().includes(search)
    );
  } else if (search && country) {
    parksToDisplay = parks.filter(
      (park) =>
        park.country.includes(country) &&
        park.title.toLowerCase().includes(search)
    );
  } else {
    parksToDisplay = parks;
  }

  //create an array with countries to display
  const listOfCountries = [];
  if (parks) {
    parks.forEach((park) => listOfCountries.push(park.country));
  }

  const countries = [...new Set(listOfCountries)];

  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <Row>
            <Col>
              <h1>Explore the parks</h1>
            </Col>
            <Col>
              <Form>
                <Form.Control
                  type="text"
                  placeholder="Search by name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Form.Control
                  as="select"
                  placeholder="Search by name"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Select country</option>

                  {countries.map((country) => (
                    <option key={country}>{country}</option>
                  ))}
                </Form.Control>
              </Form>
            </Col>{" "}
          </Row>
        </Container>
      </Jumbotron>
      <Container>
        <Row>
          <CardColumns>
            {parksToDisplay &&
              // eslint-disable-next-line
              parksToDisplay.map((park) => {
                if (!park.hidden) {
                  return (
                    <PreviewCard
                      key={park.title}
                      title={park.title}
                      description={park.description}
                      imageUrl={park.image}
                      country={park.country}
                      type={park.type}
                      id={park.id}
                      reviews={park.reviews}
                    />
                  );
                }
              })}
          </CardColumns>{" "}
        </Row>
      </Container>
    </div>
  );
}
