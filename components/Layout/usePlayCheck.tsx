import { useRouter } from 'next/router';

// checks if we are on the play game's page
export default function usePlayCheck(): boolean {
  const { asPath } = useRouter();

  return asPath.endsWith('/play');
}
