import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// const rooms = [{ label: 'Obývák', value: 21.5 }, { label: 'Ložnice', value: 22.5 }];
const outside = [{ label: 'Venku', value: 5.0 }];

function RoomItems(props) {
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
                <Col sm={6} key={data.label}>
                    <Card
                        border="secondary"
                        bg="light"
                        key="1"
                        text='dark'
                        style={{ width: '10rem' }}
                        className="text-center"
                    >
                        <Card.Body>
                            <Card.Title>{data.label} </Card.Title>
                            <Card.Text>
                                {data.value} {props.metric}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            )
        );
    }
}

function OutsideItems(props) {
    return (
        outside.map((data) =>
            <Col sm={6} key={data.label}>
                <Card
                    border="primary"
                    bg="light"
                    text='dark'
                    style={{ width: '10rem' }}
                    className="text-center"
                >
                    <Card.Body>
                        <Card.Title>{data.label}</Card.Title>
                        <Card.Text>
                            {data.value} {props.metric}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        )
    );
}

class CardsSection extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <RoomItems metric={this.props.metric} apiService={this.props.apiService} />
                </Row>
                <br />
                <Row>
                    <OutsideItems metric={this.props.metric} />
                </Row>
            </Container>
        );
    }
}

export default CardsSection;