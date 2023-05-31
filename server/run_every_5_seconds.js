/**
 * Function which runs automatically every 5 seconds and puts a message (“”QUERY RUNNING) in console.
 */
const runEvery5Seconds = () => {
	console.log('QUERY RUNNING');
	return setTimeout(runEvery5Seconds, 5000);
}

runEvery5Seconds();