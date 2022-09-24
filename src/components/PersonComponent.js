import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';

export default function Person(props) {
    const {
        picksArr,
        allScores,
        gameStatus,
    } = props;

    const [numCorrect, setNumCorrect] = useState(0);

    useEffect(() => {
        let numCorrectCopy = 0;
        allScores.map((matchUp, i) => {
            if (gameStatus[i] === 'STATUS_FINAL') {
                if (matchUp.winner === picksArr.find(pick => pick === matchUp.awayTeam || pick === matchUp.homeTeam)) {
                    numCorrectCopy += 1;
                }
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
                {allScores.map((matchUp, j) => {
                    const pick = picksArr.find(pick => pick === matchUp.awayTeam || pick === matchUp.homeTeam);
                    // if (!pick) {
                    //     console.log(`error: ${matchUp.awayTeam} nor ${matchUp.homeTeam}`, JSON.parse(JSON.stringify(picksArr)))
                    // }
                    return (
                        <Row key={`game ${j}`} className='border'>
                            <Col xs={2} className='d-flex justify-content-start'>{matchUp.awayTeam}</Col>
                            <Col xs={2} className=''>{matchUp.awayScore}</Col>
                            <Col xs={1} className='d-flex justify-content-center'>vs</Col>
                            <Col xs={2} className='d-flex justify-content-start'>{matchUp.homeTeam}</Col>
                            <Col xs={2} className=''>{matchUp.homeScore}</Col>
                            <Col
                                xs={3}
                                className='d-flex justify-content-center position-relative'
                                style={
                                    allScores[j].winner === picksArr.find(pick => pick === matchUp.awayTeam || pick === matchUp.homeTeam) ?     // if scores.winner matches pick
                                    {background: '#8cd98c'} :
                                    allScores[j].winner === null ?    // if scores.winner is null, game hasn't finished
                                        null : {background: '#ff6666'}       // else, scores.winner is TIE
                                }
                            >
                                {pick}
                                {gameStatus[j] === "STATUS_IN_PROGRESS" ?
                                    <span className="position-absolute translate-middle bg-danger border border-light rounded-circle" style={{padding: '5px', top: '8px', right: '-4px'}}>
                                        <span className="visually-hidden">Save Alert</span>
                                    </span>
                                    : null
                                }
                                
                            </Col>
                        </Row>
                    )
                })}
                <Row className='border'>
                    <Col className='d-flex justify-content-end'>Monday Night Total: {picksArr[picksArr.length - 1]}</Col>
                </Row>
            </Accordion.Body>
        </Accordion.Item>
    );
}