import useSWR from 'swr';
import { Session } from 'next-auth';

export default function useUserSession() {
  const { data, isValidating, mutate } = useSWR<Session>(
    '/api/auth/session',
    async url => {
      const res = await fetch(url);
      if (!res.ok) throw new Error();
      const data = await res.json();
      return data;
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: true,
    }
  );

  const updateSession = async (
    newSession: Session,
    shouldRevalidate = false
  ) => {
    return mutate(newSession, shouldRevalidate);
  };

  return {
    session: data?.email ? data : null,
    loading: isValidating,
    updateSession,
  };
}
