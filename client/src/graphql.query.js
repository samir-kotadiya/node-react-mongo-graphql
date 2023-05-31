import { gql } from '@apollo/client';

//define GraphQL queries
export const GET_USERS = gql`
	query {
	getUsers {
		_id,
		name,
		email
  }
}
`
export const CREATE_USER = gql`
	mutation($name: String, $email: String, $password: String) {
	createUser(name: $name, email: $email, password: $password) {
		_id,
		name,
		email
	}
}
`
export const UPDATE_USER = gql`
	mutation($_id: String, $name: String, $email: String, $password: String) {
	updateUser(id: $_id, name: $name, email: $email, password: $password) {
		_id,
		name,
		email
	}
}
`

export const DELETE_USER = gql`
	mutation($id: String) {
	deleteUser(id: $id)
}
`