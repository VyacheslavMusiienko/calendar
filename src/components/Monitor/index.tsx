import moment from 'moment';
import styled from 'styled-components';

type MonitorProps = {
  today: moment.Moment;
  prevHuddler: () => void;
  todayHuddler: () => void;
  nextHuddler: () => void;
};

const DivWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #1e1f21;
  color: #e9edf5;
  padding: 16px;
`;

const TextWrapper = styled.span`
  font-size: 32px;
`;

const TitleWrapper = styled(TextWrapper)`
  font-weight: bold;
  margin-right: 8px;
`;

const ButtonsWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled('button')`
  border: unset;
  background-color: #565759;
  height: 20px;
  margin-right: 2px;
  border-radius: 4px;
  color: #e6e6e6;
`;

const TodayButton = styled(ButtonWrapper)`
  padding-right: 16px;
  padding-left: 16px;
  font-weight: bold;
`;

const Monitor = ({ today, prevHuddler, todayHuddler, nextHuddler }: MonitorProps) => {
  return (
    <DivWrapper>
      <div>
        <TitleWrapper>{today.format('MMMM')}</TitleWrapper>

        <TextWrapper>{today.format('YYYY')}</TextWrapper>
      </div>
      <ButtonsWrapper>
        <ButtonWrapper type="button" onClick={prevHuddler}>
          &lt;
        </ButtonWrapper>
        <TodayButton type="button" onClick={todayHuddler}>
          Today
        </TodayButton>
        <ButtonWrapper type="button" onClick={nextHuddler}>
          &gt;
        </ButtonWrapper>
      </ButtonsWrapper>
    </DivWrapper>
  );
};

export default Monitor;
