import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Week from './WeekComponent';

export default function Homepage() {

    const weekNum = 1;
    const nflWeeksUrl = 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/weeks?lang=en&region=us';
    const nflWeekNumUrl = `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/weeks/${weekNum}/events?lang=en&region=us`;
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
        'CLV', // 5
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
        'WAS', // 28
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
        axios.get(weeklyPicksUrl)
        .then(resp => {
            setWeeklyPicks(resp.data)
        })
        .catch(err => {
            console.error(err);
        })
    }, []);

    return (
        <Week
            weeklyPicks={weeklyPicks}
            weeklyGames={weeklyGames}
        />
    );
}