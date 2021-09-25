import { getSingleGameConfig } from 'utils/getSingleGameConfig';

export async function getGameSEO(gameName: string) {
  const { title, description, keyCuts } = await getSingleGameConfig(gameName);

  return {
    props: {
      title,
      description,
      keyCuts,
    },
  };
}
