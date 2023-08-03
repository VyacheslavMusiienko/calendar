import moment from 'moment';
import styled from 'styled-components';
import { DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH } from '../../helpers/constant';

type MonitorProps = {
  today: moment.Moment;
  prevHuddler: () => void;
  todayHuddler: () => void;
  nextHuddler: () => void;
  setDisplayMod: React.Dispatch<React.SetStateAction<'month' | 'day'>>;
  displayMod: 'month' | 'day';
};

const DivWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  background-color: #1e1f21;
  color: #dcdddd;
  padding: 16px;
  position: relative;
`;

const TextWrapper = styled('span')`
  font-size: 32px;
`;

const TitleWrapper = styled(TextWrapper)`
  font-weight: bold;
  margin-right: 8px;
  margin-left: 8px;
`;

const ButtonsWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

const ButtonsCenterWrapper = styled(ButtonsWrapper)`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;

const ButtonWrapper = styled('button')`
  border: unset;
  background-color: ${(props: { unPressed?: boolean }) =>
    props.unPressed ? '#27282A' : '#565759'};
  border: 1px solid #565759;
  height: 20px;
  border-radius: 4px;
  color: ${(props) => (props.unPressed ? '#a4a6a9' : '#E6E6E6')};
  outline: unset;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 2px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TodayButton = styled(ButtonWrapper)`
  font-weight: bold;
`;

const Monitor = ({
  today,
  prevHuddler,
  todayHuddler,
  nextHuddler,
  setDisplayMod,
  displayMod,
}: MonitorProps) => {
  return (
    <DivWrapper>
      <div>
        {displayMod === DISPLAY_MODE_DAY ? <TextWrapper>{today.format('DD')}</TextWrapper> : null}

        <TitleWrapper>{today.format('MMMM')}</TitleWrapper>

        <TextWrapper>{today.format('YYYY')}</TextWrapper>
      </div>

      <ButtonsCenterWrapper>
        <ButtonWrapper
          type="button"
          unPressed={displayMod === DISPLAY_MODE_MONTH}
          onClick={() => setDisplayMod(DISPLAY_MODE_MONTH)}
        >
          Month
        </ButtonWrapper>

        <ButtonWrapper
          type="button"
          unPressed={displayMod === DISPLAY_MODE_DAY}
          onClick={() => setDisplayMod(DISPLAY_MODE_DAY)}
        >
          Day
        </ButtonWrapper>
      </ButtonsCenterWrapper>

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
