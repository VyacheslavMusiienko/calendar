import styled from 'styled-components';
import {
  ButtonWrapper,
  ButtonsWrapper,
  EventBody,
  EventItemWrapper,
  EventListItemWrapper,
  EventListWrapper,
  EventTitle,
} from '../../containers';
import { isDayContainCurrentEvent } from '../../helpers';
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

  return (
    <DayShowWrapper>
      <EventsListWrapper>
        <EventListWrapper>
          {eventList.map((event) => (
            <EventListItemWrapper key={event.id}>
              <EventItemWrapper onClick={() => openFormHandler('Update', event)}>
                {event.title}
              </EventItemWrapper>
            </EventListItemWrapper>
          ))}
        </EventListWrapper>
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
