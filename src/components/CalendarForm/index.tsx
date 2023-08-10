import styled from 'styled-components';
import {
  ButtonWrapper,
  ButtonsWrapper,
  EventBody,
  EventTitle,
  ShadowWrapper,
} from '../../containers';
import { User } from '../../type';

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

type CalendarFormProps = {
  cancelButtonHuddler: () => void;
  event: User | null;
  changeEventHandler: (text: string, field: 'title' | 'description' | 'date') => void;
  eventFetchHandler: () => void;
  removeEventHandler: () => void;
  method: 'Update' | 'Create' | null;
};

const CalendarForm = ({
  cancelButtonHuddler,
  event,
  changeEventHandler,
  eventFetchHandler,
  removeEventHandler,
  method,
}: CalendarFormProps) => {
  return (
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
  );
};

export default CalendarForm;
