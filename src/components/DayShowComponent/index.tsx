import styled from 'styled-components';
import { EventItemWrapper, EventListItemWrapper, EventListWrapper } from '../../containers';
import { isDayContainCurrentEvent } from '../../helpers';
import { User } from '../../type';

type DayShowComponentsProps = {
  events: User[];
  today: moment.Moment;
  selectedEvent: User | null;
  setEvent: React.Dispatch<React.SetStateAction<User | null>>;
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

const DayShowComponent = ({ events, today, selectedEvent, setEvent }: DayShowComponentsProps) => {
  const eventList = events.filter((event) => isDayContainCurrentEvent(event, today));

  return (
    <DayShowWrapper>
      <EventsListWrapper>
        <EventListWrapper>
          {eventList.map((event) => (
            <EventListItemWrapper key={event.id}>
              <EventItemWrapper onClick={() => setEvent(event)}>{event.title}</EventItemWrapper>
            </EventListItemWrapper>
          ))}
        </EventListWrapper>
      </EventsListWrapper>

      <EventFormWrapper>
        {selectedEvent ? (
          <div>
            <h3>{selectedEvent.title}</h3>
          </div>
        ) : (
          <NoEventMsg>No event selected</NoEventMsg>
        )}
      </EventFormWrapper>
    </DayShowWrapper>
  );
};

export default DayShowComponent;
