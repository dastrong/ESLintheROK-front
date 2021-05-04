import { useRouter } from 'next/router';

// check if we should show the nav or not
export default function useNavPageCheck(): boolean {
  const { asPath } = useRouter();

  const noNavStaticPages = ['/'];

  const isNavVisible = !noNavStaticPages.includes(asPath);

  // are we playing a game?
  const isGamePlayPage =
    asPath.startsWith('/game/') && asPath.endsWith('/play');

  // are we looking at a games instructions
  const isGameInstructionsPage =
    (asPath.startsWith('/game/') && asPath.endsWith('/teacher')) ||
    asPath.endsWith('/student');

  return isNavVisible && !isGamePlayPage && !isGameInstructionsPage;
}
