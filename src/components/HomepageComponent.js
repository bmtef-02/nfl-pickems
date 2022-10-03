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
    // const nflWeeksUrl = 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/weeks?lang=en&region=us';
    const nflWeekNumUrl = `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/weeks/${selectedWeek}/events?lang=en&region=us`;
    const weeklyPicksUrl = `https://nfl-pickems-app.herokuapp.com/weeklyPicks`;
    const [allScores, setAllScores] = useState([]);
    const [weeklyPicks, setWeeklyPicks] = useState();
    const [gameStatus, setGameStatus] = useState([]);
    const [indexOfMNF, setIndexOfMFN] = useState();
    const [doPicksExist, setDoPicksExist] = useState(true);

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

    const getApiData = () => {
        let allScoresCopy = []
        axios.get(nflWeekNumUrl)
        .then(resp => {
            Promise.all(resp.data.items.map(item => axios.get(item.$ref)))
            .then(matchUpArr => matchUpArr.map(matchUpObj => matchUpObj.data.competitions[0].competitors))
            .then(compArr => compArr.forEach((game, j) => {
                let winner = '';
                if (game[0].winner) {
                    winner = nflTeamIds[game[0].id]
                } else if (game[1].winner) {
                    winner = nflTeamIds[game[1].id]
                } else if (game[0].winner === undefined && game[1].winner === undefined) {
                    winner = null;
                } else {
                    winner = 'TIE';
                }

                Promise.all(game.map(team => axios.get(team.score.$ref)))
                .then(scoreArr => {
                    return {
                        'index': j,
                        'homeScore': scoreArr[0].data.value,
                        'awayScore': scoreArr[1].data.value,
                        'homeTeam': nflTeamIds[game[0].id],
                        'awayTeam': nflTeamIds[game[1].id],
                        'winner': winner,
                    }
                })
                .then(test => {
                    allScoresCopy[j] = test
                    if (allScoresCopy.length === compArr.length && !allScoresCopy.includes(undefined)) {
                        setAllScores(allScoresCopy)
                    }
                })
            }))
        })
    };

    const getStatusData = () => {
        axios.get(nflWeekNumUrl)
        .then(resp => {
            Promise.all(resp.data.items.map(item => axios.get(item.$ref)))
            .then(matchUpArr => matchUpArr.map(matchUpObj => matchUpObj.data.competitions[0]))
            .then(gamesArr => {
                Promise.all(gamesArr.map(game => axios.get(game.status.$ref)))
                .then(statusDataArr => statusDataArr.map(statusObj => statusObj.data.type.name))
                .then(statusArr => setGameStatus(statusArr))
            })
        })
    };

    const getGameDates = () => {
        axios.get(nflWeekNumUrl)
        .then(resp => {
            Promise.all(resp.data.items.map(item => axios.get(item.$ref)))
            .then(matchUpArr => matchUpArr.map(matchUpObj => matchUpObj.data.date))
            // .then(datesArr => setGameDates(datesArr))
            .then(datesArr => datesArr.map(date => (new Date(date)).getTime()))
            .then(timeArr => setIndexOfMFN(timeArr.indexOf(Math.max(...timeArr))))
        })
    };

    const getPicksData = () => {
        axios.get(weeklyPicksUrl)
        .then(resp => {
            if (resp.data.find(obj => obj.week === selectedWeek)) {
                setDoPicksExist(true);
                setWeeklyPicks(resp.data.find(obj => obj.week === selectedWeek));
            } else {
                setDoPicksExist(false);
            }
        })
    };

    useEffect(() => {
        getApiData();
        getStatusData();
        getPicksData();
        getGameDates();
    // eslint-disable-next-line
    }, [nflWeekNumUrl])

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
                setDoPicksExist={setDoPicksExist}
            />
            { weeklyPicks && allScores && gameStatus && (indexOfMNF >= 0) ? 
                <Accordion alwaysOpen className='mx-xxl-25 mx-xl-20 mx-lg-15 mx-md-10 mx-sm-6'>
                    <Container fluid>
                        {weeklyPicks.picks.map((picksArr, i) => {
                            return (
                                <Person
                                    key={`person ${i}`}
                                    picksArr={picksArr}
                                    allScores={allScores}
                                    gameStatus={gameStatus}
                                    indexOfMNF={indexOfMNF}
                                />
                            );
                        })}
                    </Container>
                </Accordion>
                : 
                <Container>
                    <Row className='justify-content-center my-3'>
                        <Spinner animation='border' />
                    </Row>
                    { doPicksExist ? 
                        null
                        :
                        <Row>
                            <Col xs={12} className='d-flex justify-content-center'>{`Week ${selectedWeek} picks are not available yet!`}</Col>
                            <Col xs={12} className='d-flex justify-content-center'>Please pick an earlier week.</Col>
                        </Row>
                        
                    }
                </Container>
            }
            
        </React.Fragment>
    )
}