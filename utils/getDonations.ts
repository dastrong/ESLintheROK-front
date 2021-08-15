// the token, url and options needed to use the buymeacoffee api data
const token = process.env.COFFEE_TOKEN;
const baseUrl = 'https://developers.buymeacoffee.com/api/v1';
const options = { headers: { Authorization: `Bearer ${token}` } };

// reusable fetcher that's preconfigured for the buymeacoffee api
const fetcher = async (url: string) => {
  return await fetch(url, options).then(r => r.json());
};

// gets every transaction for the given urls endpoint
export const getDonations = async (addUrl: string) => {
  // add the given url param to the base url
  const url = baseUrl + addUrl;

  // returns only the first page results and some additional data
  const firstPageResults = await fetcher(url);

  // find out how many other result pages there is
  const otherPageCount = firstPageResults.last_page - 1;

  // create an array of urls to fetch
  const otherPageUrls = Array(otherPageCount)
    .fill('')
    .map((_, i) => `${url}?page=${i + 2}`);

  // fetch all the other page results and combine with the first page
  const allPageResults = await Promise.all(otherPageUrls.map(fetcher))
    .then(results => results.map(({ data }) => data))
    .then(otherResults => [firstPageResults.data, ...otherResults])
    .then(allResults => allResults.reduce((acc, cVal) => [...acc, ...cVal]));

  return allPageResults;
};
