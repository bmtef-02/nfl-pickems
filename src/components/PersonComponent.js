import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';

export default function Person(props) {
    const {
        picksArr,
        weeklyGames,
        allScores,
    } = props;

    const [numCorrect, setNumCorrect] = useState(0);

    useEffect(() => {
        let numCorrectCopy = 0;
        allScores.map((matchUp, i) => {
            if(matchUp.winner === picksArr.find(pick => pick === matchUp.awayTeam || pick === matchUp.homeTeam)) {
                numCorrectCopy += 1;
            }
        })
        setNumCorrect(numCorrectCopy);
    })

    return (
                <Accordion.Item eventKey={picksArr[0]}>
                    <Accordion.Header>
                        <h2 style={{ textAlign: 'center' }}>{picksArr[0].split(' ')[0]}'s Score: {numCorrect}</h2>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Row>
                            {allScores.map((matchUp, j) => {
                                const pick = picksArr.find(pick => pick === matchUp.awayTeam || pick === matchUp.homeTeam)
                                return (
                                    <React.Fragment key={`game ${j}`}>
                                        <Col xs={2}>{matchUp.awayTeam}</Col>
                                        <Col xs={2}>{matchUp.awayScore}</Col>
                                        <Col xs={1}>@</Col>
                                        <Col xs={2}>{matchUp.homeTeam}</Col>
                                        <Col xs={2}>{matchUp.homeScore}</Col>
                                        <Col
                                            xs={3}
                                            style={
                                                allScores[j].winner === picksArr.find(pick => pick === matchUp.awayTeam || pick === matchUp.homeTeam) ?     // if scores.winner matches pick
                                                {background: 'green'} :
                                                allScores[j].winner === 'NONE' ?    // if scores.winner is NONE, game hasn't started
                                                    null: {background: 'red'}       // else, scores.winner is TIE
                                            }
                                        >
                                            {pick}
                                        </Col>
                                    </React.Fragment>
                                )
                            })}
                        </Row>
                        <Row>
                            <Col>Monday Night Total:</Col>
                            <Col>{picksArr[picksArr.length - 1]}</Col>
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
            
   
    );
}