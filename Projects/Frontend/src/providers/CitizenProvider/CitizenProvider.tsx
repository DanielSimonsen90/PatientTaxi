import { PropsWithChildren, useMemo, useState } from 'react';
import { useAsyncEffect } from 'danholibraryrjs';

import { Nullable } from 'types';
import { Booking, Citizen, Note } from 'models/backend/common';

import { CitizenProviderContext, RequestBookings, RequestCitizen, RequestNote } from './CitizenProviderConstants';
import { useAuth } from 'providers/AuthProvider';

export default function CitizenProviderProvider({ children }: PropsWithChildren) {
  const { user } = useAuth(false);
  const [citizen, setCitizen] = useState<Nullable<Citizen>>(null);
  const [bookings, setBookings] = useState<Array<Booking>>([]);
  const [note, setNote] = useState<Nullable<Note>>(null);

  const latestBooking = useMemo(() => bookings.sort((a, b) => 
    a.arrival.getTime() - b.arrival.getTime()
  )[0], [bookings]);

  useAsyncEffect(async () => {
    const note = await RequestNote(citizen?.id);
    const bookings = await RequestBookings(citizen?.id);

    setNote(note);
    setBookings(bookings ?? []);
  }, [citizen]);

  useAsyncEffect(async () => {
    // If the user is not yet loaded, we don't want to do anything yet
    if (!user?.id) return;

    // Get the citizen from the API and set it in the CitizenProvider
    const citizen = await RequestCitizen(user?.id);
    if (citizen) setCitizen(citizen);
  }, [user?.id]);

  return (
    <CitizenProviderContext.Provider value={{
      citizen, bookings, note, 
      setCitizen, latestBooking
    }}>
      {children}
    </CitizenProviderContext.Provider>
  );
}