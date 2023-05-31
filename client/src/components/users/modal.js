import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import UserForm from './form'

export default function UserModal(props) {

	const { addUpdateUser, user } = props;
	const [modal, setModal] = useState(false);

	const toggle = () => {
		setModal(!modal);
	}

	let button = ''
	let title = ''

	if (user) {
		button = <Button
			color="warning"
			onClick={toggle}
			style={{ float: "left", marginRight: "10px" }}>Edit
		</Button>
		title = `Edit User: ${user.name}`
	} else {
		button = <Button
			color="success"
			onClick={toggle}
			style={{ float: "left", marginRight: "10px" }}>Add
		</Button>
		title = 'Add New User'
	}

	return (
		<div>
			{button}
			<Modal show={modal} onHide={toggle}>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<UserForm
						addUpdateUser={addUpdateUser}
						toggle={toggle}
						user={user}
					/>
				</Modal.Body>
			</Modal>
		</div>
	)
}