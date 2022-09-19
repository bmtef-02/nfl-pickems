import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

export default function Person(props) {
    const {
        arr,
        weeklyGames,
        allScores,
    } = props;

    const [numCorrect, setNumCorrect] = useState(0);

    useEffect(() => {
        let numCorrectCopy = 0;
        allScores.map((matchUp, i) => {
            if(matchUp.winner === arr[i + 1]) {
                numCorrectCopy += 1;
            }
        })
        setNumCorrect(numCorrectCopy);
    }, [])

    return (
        <Row>
            <Col xs={12}>{arr[0]}, {numCorrect}</Col>
            <Row>
                {weeklyGames.map((game, j) => {
                    return (
                        <React.Fragment key={`game ${j}`}>
                            <Col xs={3}>{game}</Col>
                            <Col 
                                xs={3} 
                                style={allScores[j].winner === arr[j + 1] ? {background: 'green'} : {background: 'red'}}
                            >
                                {arr[j + 1]}
                            </Col>
                        </React.Fragment>
                    );
                })}
            </Row>
        </Row>
    );
}

// awayScore: 31
// awayTeam: "BUF"
// homeScore: 10
// homeTeam: "LAR"
// winner: "BUF"