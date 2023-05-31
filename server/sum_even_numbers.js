/**
 * Function to return sum of even numbers from array
 * Note: i have ommited negative integers and non number value in this solution
 * it return 0 if invalid array or null is given as argument
 * @param {*} array 
 * @returns number
 */
const getSumOfEvenNumberFromArray = (input = []) => {
	if (!input || !Array.isArray(input)) return 0;
	return input.reduce((sum, num) => {
		
		return (!isNaN(num) && num > 0 && num % 2 === 0) ? sum + Number(num) : sum;
	}, 0);
}

console.log(getSumOfEvenNumberFromArray([3,5,6,8,9, -2, '2', 'g', 10])); // output 26 > 6+8+10
console.log(getSumOfEvenNumberFromArray('null'))  // output 0