import React from 'react';
import LineChart from './LineChart';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardsSection from './CardsSection';

class TemperaturesSection extends React.Component {
    render() {
        return (
            <Container id='tempSection'>
                <h1>Teplota</h1>
                <Row className="align-items-center">
                    <Col sm={12} lg={4}>
                        <CardsSection metric="°C" apiService="temp/now/all" />
                    </Col>
                    <Col sm={12} lg={8}>
                        <LineChart apiService="rooms/temp" min="15" max="30" title="Teplota podle pokojů" />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default TemperaturesSection;