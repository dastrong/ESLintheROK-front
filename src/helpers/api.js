export const apiRequest = async url => {
  const resp = await fetch(process.env.REACT_APP_LESSONS_API_URL + url);
  return await resp.json();
};
