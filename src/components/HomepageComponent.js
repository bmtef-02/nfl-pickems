import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import WeekSelect from './WeekSelectComponent';
import Person from './PersonComponent';
import Spinner from 'react-bootstrap/Spinner';
import Navbar from 'react-bootstrap/Navbar';
import Accordion from 'react-bootstrap/Accordion';
import NflLogo from '../img/nfl-logo.png'

export default function Homepage() {

    const today = new Date();
    const [selectedWeek, setSelectedWeek] = useState(() => {
        if (today.getTime() >  new Date(2023, 0, 7).getTime()) {  // 1.7.23
            console.log('week 18');
            return 18;
        } else if (today.getTime() >= new Date(2022, 11, 29).getTime()) {    // 12.29.22
            console.log('week 17');
            return 17;
        } else if (today.getTime() >= new Date(2022, 11, 22).getTime()) {    // 12.22.22
            console.log('week 16');
            return 16;
        } else if (today.getTime() >= new Date(2022, 11, 15).getTime()) {    // 12.15.22
            console.log('week 15');
            return 15;
        } else if (today.getTime() >= new Date(2022, 11, 8).getTime()) {    // 12.8.22
            console.log('week 14');
            return 14;
        } else if (today.getTime() >= new Date(2022, 11, 1).getTime()) {    // 12.1.22
            console.log('week 13');
            return 13;
        } else if (today.getTime() >= new Date(2022, 10, 24).getTime()) {    // 11.24.22
            console.log('week 12');
            return 12;
        } else if (today.getTime() >= new Date(2022, 10, 17).getTime()) {    // 11.17.22
            console.log('week 11');
            return 11;
        } else if (today.getTime() >= new Date(2022, 10, 10).getTime()) {    // 11.10.22
            console.log('week 10');
            return 10;
        } else if (today.getTime() >= new Date(2022, 10, 3).getTime()) {    // 11.3.22
            console.log('week 9')
            return 9;
        } else if (today.getTime() >= new Date(2022, 9, 27).getTime()) {    // 10.27.22
            console.log('week 8')
            return 8;
        } else if (today.getTime() >= new Date(2022, 9, 20).getTime()) {    // 10.20.22
            console.log('week 7');
            return 7;
        } else if (today.getTime() >= new Date(2022, 9, 13).getTime()) {    // 10.13.22
            console.log('week 6');
            return 6;
        } else if (today.getTime() >= new Date(2022, 9, 6).getTime()) {    // 10.6.22
            console.log('week 5');
            return 5;
        } else if (today.getTime() >= new Date(2022, 8, 29).getTime()) {    // 9.29.22
            console.log('week 4');
            return 4;
        } else if (today.getTime() >= new Date(2022, 8, 22).getTime()) {    // 9.22.22
            console.log('week 3');
            return 3;
        } else if (today.getTime() >= new Date(2022, 8, 15).getTime()) {    // 9.15.22
            console.log('week 2');
            return 2;
        } else {
            console.log('week 1');
            return 1;
        }
    });
    const nflWeeksUrl = 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/weeks?lang=en&region=us';
    const nflWeekNumUrl = `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/weeks/${selectedWeek}/events?lang=en&region=us`;
    const weeklyPicksUrl = `http://localhost:3000/weeklyPicks`;
    const [allScores, setAllScores] = useState([]);
    const [weeklyPicks, setWeeklyPicks] = useState();
    const [gameStatus, setGameStatus] = useState([]);
    const [numOfGames, setNumOfGames] = useState(0);

    const nflTeamIds = [
        '', // 0
        'ATL', // 1
        'BUF', // 2
        'CHI', // 3
        'CIN', // 4
        'CLE', // 5
        'DAL', // 6
        'DEN', // 7
        'DET', // 8
        'GB', // 9
        'TEN', // 10
        'IND', // 11
        'KC', // 12
        'LV', // 13
        'LAR', // 14
        'MIA', // 15
        'MIN', // 16
        'NE', // 17
        'NO', // 18
        'NYG', // 19
        'NYJ', // 20
        'PHI', // 21
        'ARI', // 22
        'PIT', // 23
        'LAC', // 24
        'SF', // 25
        'SEA', // 26
        'TB', // 27
        'WSH', // 28
        'CAR', // 29
        'JAX', // 30
        '', // 31
        '', // 32
        'BAL', // 33
        'HOU', // 34
    ];

    
    // getting all game data for the week from API
    useEffect(() => {
        let allScoresCopy = [];
        let gameStatusCopy = [];

        axios.get(nflWeekNumUrl)
        .then(resp => {
            setNumOfGames(resp.data.items.length)
            resp.data.items.forEach((obj, i) => {

                // setting match up data
                axios.get(obj.$ref)
                .then(resp => {
                    let matchUp = {
                        'awayTeam': '',
                        'awayScore': 0,
                        'homeTeam': '',
                        'homeScore': 0,
                        'winner': '',
                        'finished': false, 
                    };
                    let homeTeam;
                    let awayTeam;

                    if (resp.data.competitions[0].competitors[0].homeAway === 'home') {
                        homeTeam = resp.data.competitions[0].competitors[0];
                        awayTeam = resp.data.competitions[0].competitors[1];
                        matchUp.homeTeam = nflTeamIds[homeTeam.id];
                        matchUp.awayTeam = nflTeamIds[awayTeam.id];
                    } else {
                        homeTeam = resp.data.competitions[0].competitors[1];
                        awayTeam = resp.data.competitions[0].competitors[0];
                        matchUp.homeTeam = nflTeamIds[homeTeam.id];
                        matchUp.awayTeam = nflTeamIds[awayTeam.id];
                    }

                    if (homeTeam.winner === true) {
                        matchUp.winner = nflTeamIds[homeTeam.id];
                    } else if (awayTeam.winner === true) {
                        matchUp.winner = nflTeamIds[awayTeam.id];
                    } else if (homeTeam.winner === false && awayTeam.winner === false) {
                        matchUp.winner = 'TIE';
                    } else if (homeTeam.winner === undefined && awayTeam.winner === undefined) {    // game hasn't finished
                        matchUp.winner = '';
                    }

                    axios.get(homeTeam.score.$ref)
                    .then(resp => {
                        matchUp.homeScore = resp.data.value;

                        axios.get(awayTeam.score.$ref)
                        .then(resp => {
                            matchUp.awayScore = resp.data.value;
                            allScoresCopy[i] = matchUp;             // SOMETHING WRONG HERE. SOMETIMES ONE OF THE MATCUPS DOESN'T GET SET
                            setAllScores(allScoresCopy);
                        })
                        .catch(err => {
                            console.error(err);
                            console.log('cannot get awayTeam score');
                        })
                    })
                    .catch(err => {
                        console.error(err);
                        console.log('cannot get homeTeam score');
                    })

                    // setting game status
                    axios.get(resp.data.competitions[0].status.$ref)
                    .then(resp => {
                        gameStatusCopy[i] = resp.data.type.name;
                        setGameStatus(gameStatusCopy);
                    })
                    .catch(err => {
                        console.error(err);
                        console.log(`can't get game status for game #${i}`);
                    })
                })
                .catch(err => {
                    console.error(err);
                    console.log(`can't get API Url for game #${i}`);
                })
            }) 
        })
        .catch(err => {
            console.error(err);
            console.log('cannot get NFL week');
        })
    }, [nflWeekNumUrl])

    useEffect(() => {
        axios.get(weeklyPicksUrl)   // getting picks for the selected week
        .then(resp => {
            let weeklyPicksCopy = resp.data.find(picksArr => picksArr.week === selectedWeek);
            setWeeklyPicks(weeklyPicksCopy);
        })
        .catch(err => {
            console.error(err);
        })
    }, [nflWeekNumUrl])    

    if (weeklyPicks && 
        allScores.length === numOfGames && 
        !(allScores.includes(undefined)) && 
        !(gameStatus.includes(undefined)) &&
        gameStatus.length === numOfGames) {
        return (
            <React.Fragment>
                <Navbar bg='light'>
                    <Container className='justify-content-center'>
                        <Navbar.Brand>
                            <img 
                                src={NflLogo}
                                alt='nfl-logo'
                                height='50'
                                className='mx-2'
                            />
                            PICK'EMS
                        </Navbar.Brand>
                    </Container>
                </Navbar>
                <WeekSelect 
                    selectedWeek={selectedWeek} 
                    setSelectedWeek={setSelectedWeek}
                    setAllScores={setAllScores}
                    setWeeklyPicks={setWeeklyPicks}
                    setGameStatus={setGameStatus}
                />
                <Accordion alwaysOpen>
                    <Container fluid>
                        {weeklyPicks.picks.map((picksArr, i) => {
                            return (
                                <Person
                                    key={`person ${i}`}
                                    picksArr={picksArr}
                                    allScores={allScores}
                                    gameStatus={gameStatus}
                                />
                            );
                        })}
                    </Container>
                </Accordion>
            </React.Fragment>
        );
    } else if (!weeklyPicks) {
        return (
            <React.Fragment>
                <Navbar bg='light'>
                    <Container className='justify-content-center'>
                        <Navbar.Brand>
                            <img 
                                src={NflLogo}
                                alt='nfl-logo'
                                height='50'
                                className='mx-2'
                            />
                            PICK'EMS
                        </Navbar.Brand>
                    </Container>
                </Navbar>
                <WeekSelect 
                    selectedWeek={selectedWeek} 
                    setSelectedWeek={setSelectedWeek}
                    setAllScores={setAllScores}
                    setWeeklyPicks={setWeeklyPicks}
                    setGameStatus={setGameStatus}
                />
                <Container>
                    <Row className='justify-content-center my-3'>
                        <Spinner animation='border' />
                    </Row>
                    <Row className='justify-content-center'>
                        {`Picks for Week ${selectedWeek} not available yet!`}
                    </Row>
                </Container>
                
            </React.Fragment>
        )
    } else {
        console.log(
            `selectedWeek: ${selectedWeek}, 
            weeklyPicks: ${!!weeklyPicks}, 
            allScores.length: ${(allScores.length === numOfGames)}, 
            allScores.includes: ${!(allScores.includes(undefined))}, 
            gameStatus.includes: ${!(gameStatus.includes(undefined))},
            gamesStatus.length: ${(gameStatus.length === numOfGames)}`
        )
        console.log(JSON.stringify(selectedWeek))
        console.log(weeklyPicks)
        console.log(JSON.parse(JSON.stringify(allScores)))
        console.log(JSON.parse(JSON.stringify(gameStatus)))

        return (
            <React.Fragment>
                <Navbar bg='light'>
                    <Container className='justify-content-center'>
                        <Navbar.Brand>
                            <img 
                                src={NflLogo}
                                alt='nfl-logo'
                                height='50'
                                className='mx-2'
                            />
                            PICK'EMS
                        </Navbar.Brand>
                    </Container>
                </Navbar>
                <WeekSelect 
                    selectedWeek={selectedWeek} 
                    setSelectedWeek={setSelectedWeek}
                    setAllScores={setAllScores}
                    setWeeklyPicks={setWeeklyPicks}
                    setGameStatus={setGameStatus}
                />
                <Container>
                    <Row className='justify-content-center my-3'>
                        <Spinner animation='border' />
                    </Row>
                    <Row className='justify-content-center'>
                        {`Loading Data`}
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}