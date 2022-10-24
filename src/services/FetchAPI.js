const fetchAPI = async (ENDPOINT) => {
  const request = await fetch(ENDPOINT);
  const response = await request.json();
  return response;
};

export default fetchAPI;
