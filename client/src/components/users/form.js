import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function UserForm(props) {
	const { addUpdateUser, toggle, user: userObj } = props;
	const [step, setStep] = useState(1);
	const [user, setUser] = useState(userObj || {name: '', email: '', password: ''});

	const nextStep = () => {
		setStep(step + 1);
	};

	const prevStep = () => {
		setStep(step - 1);
	};

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleSubmit =  async(e) => {
		e.preventDefault();
		// Here you can perform additional validation or submit the form to an API
		await addUpdateUser(user);
		toggle();
	};

	return (
		<div className="container">
			{step === 1 && (
				<form onSubmit={nextStep}>
					<Form.Group className="mb-3">
						<Form.Label>Name *</Form.Label>
						<Form.Control type="text" name="name" id="name" placeholder="Enter name" onChange={handleChange} value={user?.name === null ? '' : user.name} required />
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Email *</Form.Label>
						<Form.Control type="email" name="email" placeholder="Enter email" value={user?.email === null ? '' : user.email} onChange={handleChange} required />
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>
					<Button variant="primary" type="submit">
						Next
					</Button>
				</form>
			)}
			{
				step === 2 && (
					<form onSubmit={handleSubmit}>
						<Form.Group className="mb-3">
							<Form.Label>Password *</Form.Label>
							<Form.Control type="password" name="password" placeholder="Enter Password" onChange={handleChange} required />
						</Form.Group>
						<Button className="mr-10" variant="primary" type="button" onClick={prevStep}>Back</Button>
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</form>
				)
			}
		</div>
	)
}