import { render, screen, waitFor } from '@testing-library/react';
import EventsTable from './pages/EventsTable';
import { MemoryRouter } from 'react-router-dom';

test('Gerçek API verisiyle event listesini doğru görüntüler', async () => {
  render(
    <MemoryRouter>
      <EventsTable />
    </MemoryRouter>
  );

  await waitFor(() => {
    const event1 = screen.getByText(/San Antonio Spurs vs Phoenix Suns/i);
    expect(event1).toBeInTheDocument();
  });
  
});
