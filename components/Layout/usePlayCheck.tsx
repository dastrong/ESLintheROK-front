import { useRouter } from 'next/router';

// checks if we are on the play game's page
export default function usePlayCheck(): boolean {
  const { asPath, pathname } = useRouter();

  return pathname !== '/404' && asPath.endsWith('/play');
}
