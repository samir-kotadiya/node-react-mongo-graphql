import { Route, Routes } from 'react-router-dom';

import './App.css';
import './style/bootstrap/dist/css/bootstrap.css'

import Header from './layout/header'
import Users from './pages/users';
import Footer from './layout/footer';
import GraphQL from './pages/graphql';

function App() {
  return (
    <div className="container">
      <Header />

      <Routes>
        <Route path="/" element={<Users />}></Route>
        <Route path="/graphQL" element={<GraphQL />}></Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
