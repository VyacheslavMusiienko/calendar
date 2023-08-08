import moment from 'moment';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ButtonWrapper, ButtonsWrapper, EventBody, EventTitle } from '../../containers';
import { DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH, TOTAL_DAY, URI } from '../../helpers/constant';
import { User } from '../../type';
import CalendarGrid from '../CalendarGrid';
import DayShowComponent from '../DayShowComponent';
import Monitor from '../Monitor';

const ShadowWrapper = styled('div')`
  min-width: 850px;
  height: 665px;
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #1a1a1a, 0 8px 20px 6px #888;
  display: flex;
  flex-direction: column;
`;

const FormPositionWrapper = styled('div')`
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
  min-width: 320px;
  height: 132px;
  background-color: #1e1f21;
  color: #dddddd;
  box-shadow: unset;
`;
const defaultEvent = {
  title: '',
  description: '',
  date: moment().format('X'),
};

const App = () => {
  const [displayMod, setDisplayMod] = useState<typeof DISPLAY_MODE_MONTH | typeof DISPLAY_MODE_DAY>(
    DISPLAY_MODE_MONTH
  );

  moment.updateLocale('en', { week: { dow: 1 } });

  const [today, setToday] = useState<moment.Moment>(moment());
  const [events, setEvents] = useState<User[]>([]);
  const [event, setEvent] = useState<User | null>(null);
  const [isShowForm, setShowForm] = useState<boolean>(false);
  const [method, setMethod] = useState<'Update' | 'Create' | null>(null);

  const startDay = today.clone().startOf('month').startOf('week');

  const prevHuddler = () => {
    setToday((prev) => prev.clone().subtract(1, displayMod));
  };
  const todayHuddler = () => setToday(moment());
  const nextHuddler = () => {
    setToday((prev) => prev.clone().add(1, displayMod));
  };

  const startDayQuery = startDay.clone().format('X');
  const endDayQuery = startDay.clone().add(TOTAL_DAY, 'days').format('X');

  const openFormHandler = (
    methodName: 'Update' | 'Create',
    eventForUpdate?: User | null,
    dayItem?: moment.Moment
  ) => {
    setMethod(methodName);
    if (eventForUpdate) {
      setEvent(eventForUpdate);
    } else {
      setEvent({ ...defaultEvent, date: dayItem ? dayItem.format('X') : moment().format('X') });
    }
  };

  const openModalFormHandler = (
    methodName: 'Update' | 'Create',
    eventForUpdate?: User | null,
    dayItem?: moment.Moment
  ) => {
    setShowForm(true);
    openFormHandler(methodName, eventForUpdate, dayItem);
  };

  useEffect(() => {
    fetch(`${URI}/events?date_gte=${startDayQuery}&date_lte=${endDayQuery}`)
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
      console.error('Event date is null.');
      return;
    }

    const fetchUri = method === 'Update' ? `${URI}/events/${event.id}` : `${URI}/events`;
    const httpMethod = method === 'Update' ? 'PATCH' : 'POST';

    const eventdate = JSON.stringify({
      title: event.title,
      description: event.description,
      date: event.date,
    });

    fetch(fetchUri, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: eventdate,
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
      console.error('Event date is null.');
      return;
    }
    const fetchUri = `${URI}/events/${event.id}`;
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
          setDisplayMod={setDisplayMod}
          displayMod={displayMod}
        />
        {displayMod === DISPLAY_MODE_MONTH ? (
          <CalendarGrid
            startDay={startDay}
            today={today}
            totalDay={TOTAL_DAY}
            events={events}
            openFormHandler={openModalFormHandler}
            setDisplayMod={setDisplayMod}
          />
        ) : null}
        {displayMod === DISPLAY_MODE_DAY ? (
          <DayShowComponent
            events={events}
            today={today}
            selectedEvent={event}
            changeEventHandler={changeEventHandler}
            cancelButtonHuddler={cancelButtonHuddler}
            eventFetchHandler={eventFetchHandler}
            removeEventHandler={removeEventHandler}
            method={method}
            openFormHandler={openFormHandler}
          />
        ) : null}
      </ShadowWrapper>
    </>
  );
};

export default App;
