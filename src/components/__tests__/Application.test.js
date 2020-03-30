import React from 'react';

import { render, cleanup } from '@testing-library/react';

import Application from 'components/Application';
import {
  waitForElement,
  fireEvent,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByText,
  getByPlaceholderText,
  queryByAltText,
  queryByText,
} from '@testing-library/react';

afterEach(cleanup);
describe('Application', () => {
  it.skip('renders without crashing', () => {
    render(<Application />);
  });

  it('defaults to Monday and changes the schedule when a new day is selected', () => {
    const { getByText } = render(<Application />);
  });

  it('changes the schedule when a new day is selected', async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText('Monday'));
    fireEvent.click(getByText('Tuesday'));
    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });

  it.skip('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, 'appointment').find((appointment) =>
      queryByText(appointment, 'Archie Cohen'),
    );

    fireEvent.click(queryByAltText(appointment, 'Delete'));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, 'Are you sure you would like to delete?')).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, 'Confirm'));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, 'Add'));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, 'day').find((day) => queryByText(day, 'Monday'));

    expect(getByText(day, '2 spots remaining')).toBeInTheDocument();
  });
});
