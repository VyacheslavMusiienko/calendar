import moment from 'moment';
import styled from 'styled-components';
import {
  ButtonWrapper,
  ButtonsWrapper,
  EventBody,
  EventItemWrapper,
  EventTitle,
} from '../../containers';
import { isDayContainCurrentEvent } from '../../helpers';
import { ITEMS_TIME_DAY } from '../../helpers/constant';
import { User } from '../../type';

type DayShowComponentsProps = {
  events: User[];
  today: moment.Moment;
  selectedEvent: User | null;
  changeEventHandler: (text: string, field: 'title' | 'description') => void;
  cancelButtonHuddler: () => void;
  eventFetchHandler: () => void;
  removeEventHandler: () => void;
  method: 'Update' | 'Create' | null;
  openFormHandler: (
    methodName: 'Update' | 'Create',
    eventForUpdate?: User | null,
    dayItem?: moment.Moment
  ) => void;
};

const DayShowWrapper = styled('div')`
  display: flex;
  flex-grow: 1;
  border-top: 1px solid #464648;
`;

const EventsListWrapper = styled('div')`
  background-color: #1e1f21;
  color: #dddddd;
  flex-grow: 1;
`;

const EventFormWrapper = styled('div')`
  background-color: #27282a;
  color: #dddddd;
  width: 300px;
  position: relative;
  border-left: 1px solid #464648;
`;

const NoEventMsg = styled('div')`
  color: #565759;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;

const ScaleWrapper = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 4px;
  position: relative;
`;

const ScaleCellWrapper = styled('div')`
  flex-grow: 1;
  position: relative;
  &:not(:last-child) {
    border-bottom: 1px solid #464648;
  }
  margin-left: 32px;
`;

const ScaleCellTimeWrapper = styled('div')`
  position: absolute;
  left: -30px;
  top: -8px;
  font-size: 12px;
`;

const ScaleCellEventWrapper = styled('div')`
  min-height: 20px;
`;

const DayShowComponent = ({
  events,
  today,
  selectedEvent,
  changeEventHandler,
  cancelButtonHuddler,
  eventFetchHandler,
  removeEventHandler,
  method,
  openFormHandler,
}: DayShowComponentsProps) => {
  const eventList = events.filter((event) => isDayContainCurrentEvent(event, today));

  const cells = [...new Array(ITEMS_TIME_DAY)].map((_, index) => {
    const temp: User[] = [];

    eventList.forEach((event) => {
      const time = moment.unix(Number(event.data)).format('H');
      if (Number(time) === index) {
        temp.push(event);
      }
    });

    return temp;
  });

  return (
    <DayShowWrapper>
      <EventsListWrapper>
        <ScaleWrapper>
          {cells.map((eventsList, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ScaleCellWrapper key={index}>
              <ScaleCellTimeWrapper>
                {index ? <>{`${index}`.padStart(2, '0')}:00</> : null}
              </ScaleCellTimeWrapper>

              <ScaleCellEventWrapper>
                {eventsList.map((event) => (
                  <EventItemWrapper key={event.id} onClick={() => openFormHandler('Update', event)}>
                    {event.title}
                  </EventItemWrapper>
                ))}
              </ScaleCellEventWrapper>
            </ScaleCellWrapper>
          ))}
        </ScaleWrapper>
      </EventsListWrapper>

      <EventFormWrapper>
        {selectedEvent ? (
          <div>
            <EventTitle
              value={selectedEvent?.title}
              onChange={(e) => changeEventHandler(e.target.value, 'title')}
              placeholder="Title"
            />
            <EventBody
              value={selectedEvent?.description}
              onChange={(e) => changeEventHandler(e.target.value, 'description')}
              placeholder="Description"
            />
            <ButtonsWrapper>
              <ButtonWrapper type="button" onClick={cancelButtonHuddler}>
                Cancel
              </ButtonWrapper>

              <ButtonWrapper type="button" onClick={eventFetchHandler}>
                {method}
              </ButtonWrapper>

              {method === 'Update' ? (
                <ButtonWrapper danger type="button" onClick={removeEventHandler}>
                  Remove
                </ButtonWrapper>
              ) : null}
            </ButtonsWrapper>
          </div>
        ) : (
          <>
            <div>
              <button type="button" onClick={() => openFormHandler('Create', null, today)}>
                Create new event
              </button>
            </div>
            <NoEventMsg>No event selected</NoEventMsg>
          </>
        )}
      </EventFormWrapper>
    </DayShowWrapper>
  );
};

export default DayShowComponent;
