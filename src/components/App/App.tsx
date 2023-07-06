import moment from 'moment';

import { useState } from 'react';
import styled from 'styled-components';
import CalendarGrid from '../CalendarGrid';
import Header from '../Header';
import Monitor from '../Monitor';

const ShadowWrapper = styled.div`
  border: 1px solid #737374;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #1a1a1a, 0 8px 28px 6px #888;
`;

const App = () => {
  moment.updateLocale('en', { week: { dow: 1 } });

  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf('month').startOf('week');

  const prevHuddler = () => {
    setToday((prev) => prev.clone().subtract(1, 'month'));
  };
  const todayHuddler = () => setToday(moment());
  const nextHuddler = () => {
    setToday((prev) => prev.clone().add(1, 'month'));
  };

  return (
    <ShadowWrapper>
      <Header />
      <Monitor
        today={today}
        prevHuddler={prevHuddler}
        todayHuddler={todayHuddler}
        nextHuddler={nextHuddler}
      />
      <CalendarGrid startDay={startDay} today={today} />
    </ShadowWrapper>
  );
};

export default App;
