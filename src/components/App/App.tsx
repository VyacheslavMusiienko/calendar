import moment from 'moment';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CalendarGrid from '../CalendarGrid';
import Monitor from '../Monitor';
import { User } from '../../type';

const ShadowWrapper = styled.div`
  border: 1px solid #737374;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #1a1a1a, 0 8px 28px 6px #888;
`;

const uri = 'http://localhost:3000';
const totalDay = 42;

const App = () => {
  moment.updateLocale('en', { week: { dow: 1 } });

  const [today, setToday] = useState<moment.Moment>(moment());
  const startDay = today.clone().startOf('month').startOf('week');

  const prevHuddler = () => {
    setToday((prev) => prev.clone().subtract(1, 'month'));
  };
  const todayHuddler = () => setToday(moment());
  const nextHuddler = () => {
    setToday((prev) => prev.clone().add(1, 'month'));
  };

  const [events, setEvents] = useState<User[]>([]);

  const startDayQuery = startDay.clone().format('X');
  const endDayQuery = startDay.clone().add(totalDay, 'days').format('X');

  useEffect(() => {
    fetch(`${uri}/events?data_gte=${startDayQuery}&data_lte=${endDayQuery}`)
      .then((res) => res.json())
      .then((res) => {
        setEvents(res);
      });
  }, [today]);

  return (
    <ShadowWrapper>
      {/* <Header /> */}
      <Monitor
        today={today}
        prevHuddler={prevHuddler}
        todayHuddler={todayHuddler}
        nextHuddler={nextHuddler}
      />
      <CalendarGrid startDay={startDay} today={today} totalDay={totalDay} events={events} />
    </ShadowWrapper>
  );
};

export default App;
