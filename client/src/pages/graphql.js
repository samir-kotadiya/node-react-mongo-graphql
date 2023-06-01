import { useQuery, useMutation } from '@apollo/client';
import { Col, Row } from 'react-bootstrap';
import UserModal from '../components/users/modal';
import UserList from '../components/users/list';
import { GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER } from "../graphql.query";

export default function GraphQL() {
	const { loading, error, data } = useQuery(GET_USERS);
	const [createMutationUser] = useMutation(CREATE_USER);
	const [updateMutationUser] = useMutation(UPDATE_USER);
	const [deleteMutationUser] = useMutation(DELETE_USER);

	if (error) return 'Something went wrong while calling graphQL API, Ensure surver is running';
	if (loading) return 'Fetching...';

	/**
   * Function to add or update user
   * @param {*} user 
   * @returns 
   */
	const addUpdateUser = async (user) => {
		try {
			if (!user._id) {
				await createMutationUser({ variables: { ...user }, refetchQueries: [GET_USERS] });
			} else {
				await updateMutationUser({ variables: { ...user }, refetchQueries: [GET_USERS] });
			}
		} catch (err) {
			console.error(err);
			alert('something went wrong, ensure server is running');
		}
	}

	/**
   * Function to delete user
   * @param {*} user 
   * @returns 
   */
	const deleteUser = async (id) => {
		try {
			await deleteMutationUser({ variables: { id }, refetchQueries: [GET_USERS] });
		} catch (err) {
			console.error(err);
			alert('something went wrong, ensure server is running');
		}
	}

	return (
		<>
			<Row>
				<Col>
					<h3 style={{ margin: "20px 0" }}>Users Database (react + graphQL API)</h3>
				</Col>
			</Row>
			<Row>
				<Col>
					<UserModal buttonLabel="Add User" addUpdateUser={addUpdateUser} />
				</Col>
			</Row>
			<Row>
				<Col>
					<UserList users={data?.getUsers} addUpdateUser={addUpdateUser} deleteUser={deleteUser} />
				</Col>
			</Row>
		</>
	);

}