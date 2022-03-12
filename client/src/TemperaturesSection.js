import React from 'react';
import { TemperatureChart } from './TemperatureChart';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardsSection from './CardsSection';

class TemperaturesSection extends React.Component {
    render() {
        return (
            <Container>
                <Row className="align-items-center">
                    <Col sm={4}>
                        <CardsSection metric="°C" />
                    </Col>
                    <Col sm={8}>
                        <TemperatureChart apiService="rooms/temp" />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default TemperaturesSection;