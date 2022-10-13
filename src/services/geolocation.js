export async function fetchDataByUrl(url) {
	try {
		const response = await fetch(url);
		return await response.json();
	} catch (err) {
		console.log(err);
	}
}

export async function getLocation(latitude, longitude) {
  const fetchURL = `https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=304512200627251254779x59553`
  const data = await fetchDataByUrl(fetchURL);
  return data;
}