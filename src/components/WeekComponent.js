import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

export default function Week(props) {
    const {
        weeklyPicks,
        weeklyGames,
    } = props;

    if (weeklyPicks) {
        return (
            <React.Fragment>
                <Container fluid>
                    <Row>
                        {/* {arr.map((pick, i) => {
                            if (i === 0 || i === arr.length - 1) {
                                return null;
                            } else {
                                return (
                                    <Col xs={3} key={`pick ${i}`}>{pick}</Col>
                                );
                            }
                        })} */}
                        {weeklyPicks[0].picks.map((arr, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <Col xs={12}>{arr[0]}</Col>
                                    <Row>
                                        {weeklyGames.map((game, j) => {
                                            return (
                                                <React.Fragment key={`game ${j}`}>
                                                    <Col xs={3}>
                                                        {game}
                                                    </Col>
                                                    <Col xs={3}>{arr[j + 1]}</Col>
                                                </React.Fragment>
                                            );
                                        })}
                                    </Row>
                                </React.Fragment>
                            );
                        })}
                    </Row>
                </Container>
            </React.Fragment>
        );
    } else {
        <Spinner animation='border' />
    }

    
}