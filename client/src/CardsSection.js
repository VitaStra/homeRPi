import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./CardsSection.css";

// const rooms = [{ label: 'Obývák', value: 21.5 }, { label: 'Ložnice', value: 22.5 }];
const outside = [{ label: 'Venku', value: 5.0 }];

function UpperRowItems(props) {
    const [roomData, setData] = React.useState(null);
    React.useEffect(() => {
        console.log(props.apiService);
        fetch(props.apiService)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data);
            });
    }, []);

    if (!roomData) {
        console.log('loading...');
        return null;
    } else {
        return (
            roomData.map((data) =>
                <Col sm={12} lg={6} key={data.label}>
                    <div className="Card-ctr">
                        <Card
                            border="secondary"
                            bg={data.showWarning ? "warning" : "light"}
                            key="1"
                            text='dark'
                            style={{ width: '10rem' }}
                        >
                            <Card.Body>
                                <Card.Title>{data.label} </Card.Title>
                                <Card.Text>
                                    {data.value} {props.metric}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            )
        );
    }
}

function LowerRowItems(props) {
    return (
        outside.map((data) =>
            <Col sm={12} key={data.label}>
                <div className="Card-ctr">
                    <Card
                        border="primary"
                        bg="light"
                        text='dark'
                        style={{ width: '10rem' }}
                    >
                        <Card.Body>
                            <Card.Title>{data.label}</Card.Title>
                            <Card.Text>
                                {data.value} {props.metric}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </Col>
        )
    );
}

class CardsSection extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <UpperRowItems metric={this.props.metric} apiService={this.props.apiService} />
                </Row>
                <Row>
                    <LowerRowItems metric={this.props.metric} />
                </Row>
            </Container>
        );
    }
}

export default CardsSection;