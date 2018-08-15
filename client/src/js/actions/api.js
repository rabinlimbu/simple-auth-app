const doGet = async (path, param) => {
	const response = await fetch(path, {
  		method: 'GET'
  	});
	const data = await response.json();

	if (response.status !== 200) throw Error(data.message);

	return data;
};

const doPost = async (path, req) => {
	const response = await fetch(path, {
  		method: 'POST',
  		body: JSON.stringify(req),
  		headers:{
    		'Content-Type': 'application/json'
  		}
  	});
	const data = await response.json();

	if (response.status !== 200) throw Error(data.message);

	return data;
};

export {
	doGet, doPost
}