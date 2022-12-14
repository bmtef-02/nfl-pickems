import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Spinner from 'react-bootstrap/Spinner';

export default function Person(props) {
    const {
        picksArr,
        allScores,
        gameStatus,
        indexOfMNF,
    } = props;

    const [numCorrect, setNumCorrect] = useState(0);
    const [scoreLoading, setScoreLoading] = useState(false);

    useEffect(() => {
        let numCorrectCopy = 0;
        allScores.map((matchUp, i) => {
            if (gameStatus[i] === 'STATUS_FINAL') {
                if (matchUp.winner === picksArr.find(pick => pick === matchUp.awayTeam || pick === matchUp.homeTeam)) {
                    numCorrectCopy += 1;
                }
            }
        })
        setScoreLoading(true);
        setNumCorrect(numCorrectCopy);
    })

    return (
        <Accordion.Item eventKey={picksArr[0]}>
            <Accordion.Header>
                {scoreLoading ?
                    <h2 style={{ textAlign: 'center' }}>{picksArr[0].split(' ')[0]}'s Score: {numCorrect}</h2>
                    :
                    <h2 style={{ textAlign: 'center' }}>
                        {picksArr[0].split(' ')[0]}'s Score: <Spinner animation='border'/>
                    </h2>
                }
            </Accordion.Header>
            <Accordion.Body className='mx-xxl-7 mx-xl-6 mx-lg-5 mx-md-4'>
                <Row className=''>
                    <Col xs={4} className='d-flex justify-content-center'>
                        <h6>Away Team</h6>
                    </Col>
                    <Col xs={1}></Col>
                    <Col xs={4} className='d-flex justify-content-center'>
                        <h6>Home Team</h6>
                    </Col>
                    <Col xs={3} className='d-flex justify-content-center'>
                        <h6>Pick</h6>
                    </Col>
                </Row>
                {allScores.map((matchUp, j) => {
                    const pick = picksArr.find(pick => pick === matchUp.awayTeam || pick === matchUp.homeTeam);
                    // if (!pick) {
                    //     console.log(`error: ${matchUp.awayTeam} nor ${matchUp.homeTeam}`, JSON.parse(JSON.stringify(picksArr)))
                    // }
                    return (
                        <Row key={`game ${j}`} className='border-top border-dark'>
                            <Col xs={2} className='d-flex justify-content-end bg-'>{matchUp.awayTeam}</Col>
                            <Col xs={2} className='d-flex justify-content-start bg-'>{matchUp.awayScore}</Col>
                            <Col xs={1} className='d-flex justify-content-center bg-'>vs</Col>
                            <Col xs={2} className='d-flex justify-content-end bg-'>{matchUp.homeTeam}</Col>
                            <Col xs={2} className='d-flex justify-content-start bg-'>{matchUp.homeScore}</Col>
                            <Col
                                xs={3}
                                className='d-flex justify-content-center position-relative'
                                style={
                                    allScores[j].winner === picksArr.find(pick => pick === matchUp.awayTeam || pick === matchUp.homeTeam) ?     // if scores.winner matches pick
                                    {background: '#8cd98c'} :
                                    allScores[j].winner === null ?    // if scores.winner is null, game hasn't finished
                                        {background: '#E8E8E8'} : {background: '#ff6666'}       // else, scores.winner is TIE
                                }
                            >
                                {pick}{j === indexOfMNF ? '*' : null}
                                {gameStatus[j] === "STATUS_IN_PROGRESS" || gameStatus[j] === "STATUS_END_PERIOD" || gameStatus[j] === "STATUS_HALFTIME" ?
                                    <p className='bg-danger position-absolute translate-middle' style={{ borderRadius: '1px', paddingLeft: '1px', paddingRight: '1px', top: '8px', right: '-6px', fontSize: '7px', color: 'white'}}>LIVE</p>
                                    : null
                                }
                                
                            </Col>
                        </Row>
                    )
                })}
                <Row className='border-top border-dark pt-1'>
                    <Col xs={12} className='d-flex justify-content-end px-1'>* = MNF Game</Col>
                </Row>
                <Row className='pt-2 d-flex justify-content-center'>
                    <Col xs={8} className='border-bottom border-dark d-flex justify-content-center'>
                        <h6>Tiebreaker</h6>
                    </Col>
                </Row>
                <Row className='pt-1'>
                    <Col xs={12} className='d-flex justify-content-center'>
                        MNF Total Points Scored:
                        {gameStatus[indexOfMNF] != 'STATUS_SCHEDULED' ? 
                            !allScores[indexOfMNF] ? 
                                ' ERROR' : ` ${allScores[indexOfMNF].homeScore + allScores[indexOfMNF].awayScore}`
                            : ' N/A'
                        }
                    </Col>
                    <Col xs={12} className='d-flex justify-content-center'>
                        MNF Total Points Guess: {picksArr[picksArr.length - 1]}
                    </Col>
                </Row>
            </Accordion.Body>
        </Accordion.Item>
    );
}