import React from 'react';
import LineChart from './LineChart';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardsSection from './CardsSection';

class PlantsSection extends React.Component {
    render() {
        return (
            <Container id='plantsSection'>
                <h1>Rostliny</h1>
                <Row className="align-items-center">
                    <Col sm={12} lg={4}>
                        <CardsSection metric="%" apiService="flowerpots/soil/now/all"/>
                    </Col>
                    <Col sm={12} lg={8}>
                        <LineChart apiService="flowerpots/soil" min="20" max="180" title="Půdní vlhkost podle květin"/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default PlantsSection;