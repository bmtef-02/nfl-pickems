import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import WeekSelect from './WeekSelectComponent';
import Person from './PersonComponent';
import Spinner from 'react-bootstrap/Spinner';


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
    const [weeklyGames, setWeeklyGames] = useState([]);
    
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

    useEffect(() => {
        let allScoresCopy = [];
        let weeklyGamesCopy = [];

        axios.get(nflWeekNumUrl)    // get all games for the week
        .then(resp => {
            resp.data.items.map((obj, i) => {
                axios.get(obj.$ref)     // get API Url for the game
                .then(resp => {
                    weeklyGamesCopy[i] = resp.data.shortName;
                    let scores = {
                        'awayTeam': '',
                        'awayScore': 0,
                        'homeTeam': '',
                        'homeScore': 0,
                        'winner': 'TIE'
                    }
                    resp.data.competitions[0].competitors.map(obj => {
                        if (obj.winner === undefined) {     // if game hasn't finished yet
                            scores.winner = 'NONE'
                        }
                        if (obj.homeAway === 'home') {
                            scores.homeTeam = nflTeamIds[obj.id];
                            if (obj.winner === true) {
                                scores.winner = nflTeamIds[obj.id];
                            }
                            axios.get(obj.score.$ref)   // get score for home team
                            .then(resp => {
                                scores.homeScore = resp.data.value;
                            })
                            .catch(err => {
                                console.error(err);
                                console.log(`can't get home score for game #${i}`)
                            })
                        } else if (obj.homeAway === 'away') {
                            scores.awayTeam = nflTeamIds[obj.id];
                            if (obj.winner === true) {
                                scores.winner = nflTeamIds[obj.id];
                            }
                            axios.get(obj.score.$ref) // get score for away team
                            .then(resp => {
                                scores.awayScore = resp.data.value;
                            })
                            .catch(err => {
                                console.error(err);
                                console.log(`can't get away score for game #${i}`);
                            })
                        } else {
                            console.log(`game #${i} doesn't have a home or away team`);
                        }
                    })
                    allScoresCopy[i] = scores;
                })
                .catch(err => {
                    console.error(err);
                    console.log(`can't get API Url for game #${i}`)
                })
            })
            setAllScores(allScoresCopy);
            setWeeklyGames(weeklyGamesCopy);
        })
        .catch(err => {
            console.error(err);
            console.log(`error getting all games for the week`)
        })

        axios.get(weeklyPicksUrl)   // getting picks for the selected week
        .then(resp => {
            let weeklyPicksCopy = resp.data.find(picksArr => picksArr.week === selectedWeek);
            setWeeklyPicks(weeklyPicksCopy);
        })
        .catch(err => {
            console.error(err);
        })
    }, [nflWeekNumUrl]);

    if (weeklyPicks) {
        return (
            <React.Fragment>
                <WeekSelect 
                    selectedWeek={selectedWeek} 
                    setSelectedWeek={setSelectedWeek} 
                />
                <Container fluid>
                    {weeklyPicks.picks.map((arr, i) => {
                        return (
                            <Person
                                key={`person ${i}`}
                                arr={arr}
                                weeklyGames={weeklyGames}
                                allScores={allScores}
                            />
                        );
                    })}
                </Container>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <WeekSelect 
                    selectedWeek={selectedWeek} 
                    setSelectedWeek={setSelectedWeek} 
                />
                <Spinner animation='border' />
                {`Picks for Week ${selectedWeek} not available yet!`}
            </React.Fragment>
        )
    }
}