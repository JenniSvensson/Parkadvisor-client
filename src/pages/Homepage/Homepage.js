import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import PreviewCard from '../../components/PreviewCard/PreviewCard'
import CardColumns from "react-bootstrap/CardColumns";
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Homepage() {
    const dispatch = useDispatch();
    // const parks = useSelector(selectParks);

    // useEffect(() => {
    //     dispatch(fetchParks());
    // }, [dispatch]);


    return (
        <div>
            <Jumbotron fluid>
                <Container>
                    <Row><Col>
                        <h1>Most popular parks</h1>
                    </Col>
                        <Col>
                            <Form>
                                <Form.Control type="text" placeholder="Search" />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form>
                        </Col> </Row>
                </Container>
            </Jumbotron>
            <CardColumns>
                {/* {parks && parks.map(park => {
                    return (

                        <PreviewCard />

                    );
                })} */}

                <PreviewCard />
                <PreviewCard />
                <PreviewCard />
                <PreviewCard />
                <PreviewCard />
                <PreviewCard />
                <PreviewCard />
                <PreviewCard />

            </CardColumns>
        </div>
    )
}
