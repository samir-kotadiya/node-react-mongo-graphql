import { Row, Col } from "react-bootstrap";
import UserList from "../components/users/list";
import UserModal from "../components/users/modal";
import { useEffect, useState } from "react";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Users(props) {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		return async () => { fetchItems() };
	}, []);

	/**
	 * Function to fetch users
	 */
	const fetchItems = async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/api/v1/users/domain`);
			const resp = await response.json();
			if (resp.statusCode === 200) {
				setUsers(resp.data);
			}
		} catch (err) {
			console.error(err);
			alert('something went wrong, ensure server is running');
		}
	};

	/**
	 * Function to add or update user
	 * @param {*} user 
	 * @returns 
	 */
	const addUpdateUser = async (user) => {
		try {
			const response = await fetch(`${API_BASE_URL}/api/v1/users${user._id ? '/' + user._id : ''}`, {
				method: user._id ? 'PUT' : 'POST',
				body: JSON.stringify(user)
			});
			const resp = await response.json();
			if (resp.statusCode === 200) {
				fetchItems();
			}
			return resp.message;
		} catch (err) {
			console.error(err);
			alert('something went wrong, ensure server is running');
		}
	}

	return (
		<>
			<Row>
				<Col>
					<h3 style={{ margin: "20px 0" }}>Users Database (react + rest API)</h3>
					<p>Showing users with the email domain "example.com".</p>
				</Col>
			</Row>
			<Row>
				<Col>
					<UserModal buttonLabel="Add User" addUpdateUser={addUpdateUser} />
				</Col>
			</Row>
			<Row>
				<Col>
					<UserList users={users} addUpdateUser={addUpdateUser} />
				</Col>
			</Row>
		</>
	);
}