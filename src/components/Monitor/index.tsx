import moment from 'moment';
import styled from 'styled-components';
import { DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH } from '../../helpers/constant';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateToday } from '../../store/reducer/dateSlice';
import { updateDisplayMod } from '../../store/reducer/displayModSlice';

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

const Monitor = () => {
  const dispatch = useAppDispatch();
  const { today } = useAppSelector((state) => state.dateReducer);
  const { displayMod } = useAppSelector((state) => state.displayModeReducer);

  const prevHuddler = () => dispatch(updateToday(moment(today).subtract(1, displayMod).format()));
  const todayHuddler = () => dispatch(updateToday(moment().format()));
  const nextHuddler = () => dispatch(updateToday(moment(today).add(1, displayMod).format()));

  return (
    <DivWrapper>
      <div>
        {displayMod === DISPLAY_MODE_DAY ? (
          <TextWrapper>{moment(today).format('DD')}</TextWrapper>
        ) : null}

        <TitleWrapper>{moment(today).format('MMMM')}</TitleWrapper>

        <TextWrapper>{moment(today).format('YYYY')}</TextWrapper>
      </div>

      <ButtonsCenterWrapper>
        <ButtonWrapper
          type="button"
          unPressed={displayMod === DISPLAY_MODE_MONTH}
          onClick={() => dispatch(updateDisplayMod(DISPLAY_MODE_MONTH))}
        >
          Month
        </ButtonWrapper>

        <ButtonWrapper
          type="button"
          unPressed={displayMod === DISPLAY_MODE_DAY}
          onClick={() => dispatch(updateDisplayMod(DISPLAY_MODE_DAY))}
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
