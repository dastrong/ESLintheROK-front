import { useRouter } from 'next/router';

// ADD THE OTHER TWO LATER
// check if we should show the nav or not
export default function useNavPageCheck(): boolean {
  const { asPath } = useRouter();

  // home, instructions, gameplay
  const noNavPages = ['/'];

  const isNavVisible = !noNavPages.includes(asPath);

  return isNavVisible;
}
