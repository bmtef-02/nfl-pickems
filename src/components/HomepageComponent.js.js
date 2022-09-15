import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Homepage() {

    const weekNum = 1;
    const nflWeeksUrl = 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/weeks?lang=en&region=us';
    const nflWeekNumUrl = `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/weeks/${weekNum}/events?lang=en&region=us`
    const [allScores, setAllScores] = useState([]);
    const nflTeamIds = [
        '', // 0
        'Atlanta Falcons', // 1
        'Buffalo Bills', // 2
        'Chicago Bears', // 3
        'Cincinnati Bengals', // 4
        'Cleveland Browns', // 5
        'Dallas Cowboys', // 6
        'Denver Broncos', // 7
        'Detroit Lions', // 8
        'Green Bay Packers', // 9
        'Tennessee Titans', // 10
        'Indianapolis Colts', // 11
        'Kansas City Chiefs', // 12
        'Las Vegas Raiders', // 13
        'Los Angeles Rams', // 14
        'Miami Dolphins', // 15
        'Minnesota Vikings', // 16
        'New England Patriots', // 17
        'New Orleans Saints', // 18
        'New York Giants', // 19
        'New York Jets', // 20
        'Philadelphia Eagles', // 21
        'Arizona Cardinals', // 22
        'Pittsburgh Steelers', // 23
        'Los Angeles Chargers', // 24
        'San Francisco 49ers', // 25
        'Seattle Seahawks', // 26
        'Tampa Bay Buccaneers', // 27
        'Washington Commanders', // 28
        'Carolina Panthers', // 29
        'Jacksonville Jaguars', // 30
        '', // 31
        '', // 32
        'Baltimore Ravens', // 33
        'Houston Texans', // 34
    ]

    useEffect(() => {
        let allScoresCopy = [];
        axios.get(nflWeekNumUrl)    // get all games for the week
        .then(resp => {
            resp.data.items.map((obj, i) => {
                axios.get(obj.$ref)     // get API Url for the game
                .then(resp => {
                    let scores = {
                        'awayTeam': '',
                        'awayScore': 0,
                        'homeTeam': '',
                        'homeScore': 0,
                        'winner': 'tie'
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
        })
        .catch(err => {
            console.error(err);
            console.log(`error getting all games for the week`)
        })
    }, [])

    console.log(allScores)

    return (
        <div>
            Hello World
        </div>
    )
}