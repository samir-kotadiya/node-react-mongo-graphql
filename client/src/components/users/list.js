import React from 'react'
import { Button, Table } from 'react-bootstrap';
import UserModal from './modal';

export default function UserList(props) {
	const { users, addUpdateUser, deleteUser } = props;
	/**
	 * overrite delete with confirmation box
	 * @param {*} id 
	 */
	const deleteItem = (id) => {
		let confirmDelete = window.confirm('Delete item forever?');
		if (confirmDelete) {
			deleteUser(id);
		}
	}

	return (
		<div className="container">
			<Table responsive hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Password</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users?.length ? (users.map(user => (
						<tr key={user._id}>
							<th scope="row">{user._id}</th>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>***</td>
							<td>
								<div style={{ width: "125px" }}>
									<UserModal user={user} addUpdateUser={addUpdateUser} />
									{' '}
									{deleteUser && <Button color="danger" onClick={() => deleteItem(user._id)}>Del</Button>}
								</div>
							</td>
						</tr>
					))) : (<tr><th>No users{deleteUser && ' with the email domain "example.com"'}, you can add new by clicking on add button.</th></tr>)}
				</tbody>
			</Table>
		</div>
	);
}