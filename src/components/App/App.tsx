import moment from 'moment';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { User } from '../../type';
import CalendarGrid from '../CalendarGrid';
import Monitor from '../Monitor';

const ShadowWrapper = styled.div`
  border: 1px solid #737374;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #1a1a1a, 0 8px 28px 6px #888;
`;

const FormPositionWrapper = styled.div`
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.35);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled(ShadowWrapper)`
  width: 320px;
  background-color: #1e1f21;
  color: #dddddd;
  box-shadow: unset;
`;

const EventTitle = styled('input')`
  padding: 4px 14px;
  font-size: 0.85rem;
  width: 100%;
  border: unset;
  background-color: #1e1f21;
  color: #dddddd;
  outline: unset;
  border-bottom: 1px solid #464648;
`;

const EventBody = styled('textarea')`
  padding: 4px 14px;
  font-size: 0.85rem;
  width: 100%;
  border: unset;
  background-color: #1e1f21;
  color: #dddddd;
  outline: unset;
  border-bottom: 1px solid #464648;
  resize: none;
  height: 60px;
`;

const ButtonWrapper = styled('div')`
  padding: 8px 14px;
  display: flex;
  justify-content: flex-end;
`;

const uri = 'http://localhost:3000';
const totalDay = 42;
const defaultEvent = {
  title: '',
  description: '',
  data: moment().format('X'),
};

const App = () => {
  moment.updateLocale('en', { week: { dow: 1 } });

  const [today, setToday] = useState<moment.Moment>(moment());
  const [events, setEvents] = useState<User[]>([]);
  const [event, setEvent] = useState<User | null>(null);
  const [isShowForm, setShowForm] = useState<boolean>(false);
  const [method, setMethod] = useState<'Update' | 'Create' | null>(null);

  const startDay = today.clone().startOf('month').startOf('week');

  const prevHuddler = () => {
    setToday((prev) => prev.clone().subtract(1, 'month'));
  };
  const todayHuddler = () => setToday(moment());
  const nextHuddler = () => {
    setToday((prev) => prev.clone().add(1, 'month'));
  };

  const startDayQuery = startDay.clone().format('X');
  const endDayQuery = startDay.clone().add(totalDay, 'days').format('X');

  const openFormHandler = (
    methodName: 'Update' | 'Create',
    eventForUpdate?: User | null,
    dayItem?: moment.Moment
  ) => {
    setMethod(methodName);
    setShowForm(true);
    if (eventForUpdate) {
      setEvent(eventForUpdate);
    } else {
      setEvent({ ...defaultEvent, data: dayItem ? dayItem.format('X') : moment().format('X') });
    }
  };

  useEffect(() => {
    fetch(`${uri}/events?data_gte=${startDayQuery}&data_lte=${endDayQuery}`)
      .then((res) => res.json())
      .then((res) => {
        setEvents(res);
      });
  }, [today]);

  const cancelButtonHuddler = () => {
    setShowForm(false);
    setEvent(null);
  };

  const changeEventHandler = (text: string, field: 'title' | 'description') => {
    setEvent((prevState) => {
      if (prevState === null) {
        return null;
      }

      return {
        ...prevState,
        [field]: text,
      };
    });
  };

  const eventFetchHandler = () => {
    if (!event) {
      console.error('Event data is null.');
      return;
    }

    const fetchUri = method === 'Update' ? `${uri}/events/${event.id}` : `${uri}/events`;
    const httpMethod = method === 'Update' ? 'PATCH' : 'POST';

    const eventData = JSON.stringify({
      title: event.title,
      description: event.description,
      data: event.data,
    });

    fetch(fetchUri, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: eventData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (method === 'Update') {
          setEvents((prevState) =>
            prevState.map((eventEl) => (eventEl.id === res.id ? res : eventEl))
          );
        } else {
          setEvents((prevState) => [...prevState, res]);
        }

        cancelButtonHuddler();
      })
      .catch((error) => {
        console.error('Error occurred during fetch:', error);
      });
  };

  const removeEventHandler = () => {
    if (!event) {
      console.error('Event data is null.');
      return;
    }
    const fetchUri = `${uri}/events/${event.id}`;
    const httpMethod = 'DELETE';

    fetch(fetchUri, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setEvents((prevState) => prevState.filter((eventEl) => eventEl.id !== event.id));
        cancelButtonHuddler();
      })
      .catch((error) => {
        console.error('Error occurred during fetch:', error);
      });
  };

  return (
    <>
      {isShowForm ? (
        <FormPositionWrapper onClick={cancelButtonHuddler}>
          <FormWrapper onClick={(e) => e.stopPropagation()}>
            <EventTitle
              value={event?.title}
              onChange={(e) => changeEventHandler(e.target.value, 'title')}
              placeholder="Title"
            />
            <EventBody
              value={event?.description}
              onChange={(e) => changeEventHandler(e.target.value, 'description')}
              placeholder="Description"
            />
            <ButtonWrapper>
              <button type="button" onClick={cancelButtonHuddler}>
                Cancel
              </button>

              <button type="button" onClick={eventFetchHandler}>
                {method}
              </button>

              {method === 'Update' ? (
                <button type="button" onClick={removeEventHandler}>
                  Remove
                </button>
              ) : null}
            </ButtonWrapper>
          </FormWrapper>
        </FormPositionWrapper>
      ) : null}
      <ShadowWrapper>
        {/* <Header /> */}
        <Monitor
          today={today}
          prevHuddler={prevHuddler}
          todayHuddler={todayHuddler}
          nextHuddler={nextHuddler}
        />
        <CalendarGrid
          startDay={startDay}
          today={today}
          totalDay={totalDay}
          events={events}
          openFormHandler={openFormHandler}
        />
      </ShadowWrapper>
    </>
  );
};

export default App;
