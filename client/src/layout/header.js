// Header.js
import { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default class Header extends Component {
	render() {
		return (
			<>
				<Navbar bg="primary" variant="dark">
					<Container>
						<Nav className="me-auto">
							<Nav.Link href="/">Home</Nav.Link>
							<Nav.Link href="/graphQL">graphQL</Nav.Link>
						</Nav>
					</Container>
				</Navbar>
			</>
		)
	};
}