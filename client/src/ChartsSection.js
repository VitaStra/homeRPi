import React from 'react';
import { SampleChart } from './SampleChart';
import { TemperatureChart } from './TemperatureChart';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ChartsSection extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col sm={4}><SampleChart /></Col>
                    <Col sm={8}><TemperatureChart apiService="rooms/temp" /></Col>
                </Row>
            </Container>
        );
    }
}

export default ChartsSection;