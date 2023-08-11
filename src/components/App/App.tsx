import moment from 'moment';
import { useEffect, useState } from 'react';
import { ShadowWrapper } from '../../containers';
import { DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH, TOTAL_DAY, URI } from '../../helpers/constant';
import { useAppSelector } from '../../hooks/redux';
import { User } from '../../type';
import CalendarForm from '../CalendarForm';
import CalendarGrid from '../CalendarGrid';
import DayShowComponent from '../DayShowComponent';
import Monitor from '../Monitor';

const defaultEvent = {
  title: '',
  description: '',
  date: moment().format('X'),
};

const App = () => {
  const { today } = useAppSelector((state) => state.dateReducer);
  const { displayMod } = useAppSelector((state) => state.displayModeReducer);

  const [events, setEvents] = useState<User[]>([]);
  const [event, setEvent] = useState<User | null>(null);
  const [isShowForm, setShowForm] = useState<boolean>(false);
  const [method, setMethod] = useState<'Update' | 'Create' | null>(null);

  const startDay = moment(today).startOf('month').startOf('week');
  const startDayQuery = startDay.clone().format('X');
  const endDayQuery = startDay.clone().add(TOTAL_DAY, 'days').format('X');

  useEffect(() => {
    fetch(`${URI}/events?date_gte=${startDayQuery}&date_lte=${endDayQuery}`)
      .then((res) => res.json())
      .then((res) => {
        setEvents(res);
      });
  }, [today]);

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

  const cancelButtonHuddler = () => {
    setShowForm(false);
    setEvent(null);
  };

  const changeEventHandler = (text: string, field: 'title' | 'description' | 'date') => {
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

    const eventDate = JSON.stringify({
      title: event.title,
      description: event.description,
      date: event.date,
    });

    fetch(fetchUri, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: eventDate,
    })
      .then((res) => res.json())
      .then((res) => {
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
      .then(() => {
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
        <CalendarForm
          cancelButtonHuddler={cancelButtonHuddler}
          event={event}
          changeEventHandler={changeEventHandler}
          eventFetchHandler={eventFetchHandler}
          removeEventHandler={removeEventHandler}
          method={method}
        />
      ) : null}
      <ShadowWrapper>
        <Monitor />

        {displayMod === DISPLAY_MODE_MONTH ? (
          <CalendarGrid events={events} openFormHandler={openModalFormHandler} />
        ) : null}

        {displayMod === DISPLAY_MODE_DAY ? (
          <DayShowComponent
            events={events}
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
