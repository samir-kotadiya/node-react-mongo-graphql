// define user schema
export const typeDef = `
  type User {
    _id: String
    name: String
    email: String
  }

  type Query {
    getUsers: [User]
    getUserById(id: String): User
  }

  type Mutation {
    createUser(name: String, email: String, password: String): User
    updateUser(id: String, name: String, email:String, password: String): User
    deleteUser(id: String): String
  }
`;