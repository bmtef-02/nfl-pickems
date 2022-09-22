import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function WeekSelect(props) {

    const {
        selectedWeek,
        setSelectedWeek,
        setAllScores,
        setWeeklyPicks,
        setGameStatus,
    } = props;

    return (
        <Container fluid>
            <Row className='justify-content-center my-3'>
                <Col xs={6}>
                    <Form.Select
                        size='lg'
                        value={selectedWeek}
                        onChange={(event) => {
                            setSelectedWeek(parseInt(event.target.value));
                            setAllScores([]);
                            setWeeklyPicks(null);
                            setGameStatus([]);
                        }}
                        style={{ textAlignLast: 'center'}}
                    >
                        <option value={1}>NFL Week 1</option>
                        <option value={2}>NFL Week 2</option>
                        <option value={3}>NFL Week 3</option>
                        <option value={4}>NFL Week 4</option>
                        <option value={5}>NFL Week 5</option>
                        <option value={6}>NFL Week 6</option>
                        <option value={7}>NFL Week 7</option>
                        <option value={8}>NFL Week 8</option>
                        <option value={9}>NFL Week 9</option>
                        <option value={10}>NFL Week 10</option>
                        <option value={11}>NFL Week 11</option>
                        <option value={12}>NFL Week 12</option>
                        <option value={13}>NFL Week 13</option>
                        <option value={14}>NFL Week 14</option>
                        <option value={15}>NFL Week 15</option>
                        <option value={16}>NFL Week 16</option>
                        <option value={17}>NFL Week 17</option>
                        <option value={18}>NFL Week 18</option>
                    </Form.Select>
                </Col>
            </Row>
        </Container >
    );
}