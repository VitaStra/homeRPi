import React from 'react';
import { LineChart } from './LineChart';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardsSection from './CardsSection';

class HumiditySection extends React.Component {
    render() {
        return (
            <Container>
                <Row className="align-items-center">
                    <Col sm={4}>
                        <CardsSection metric="%" apiService="humidity/now/all"/>
                    </Col>
                    <Col sm={8}>
                        <LineChart apiService="rooms/humidity" min="30" max="80" title="Vzdušná vlhkost podle pokojů"/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default HumiditySection;