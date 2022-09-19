import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    })

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
                                style={
                                    allScores[j].winner === arr[j + 1] ?    // if scores.winner matches pick
                                        {background: 'green'} :
                                        allScores[j].winner === 'NONE' ?    // if scores.winner is NONE, game hasn't started
                                            null: {background: 'red'}       // else, scores.winner is TIE
                                }
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