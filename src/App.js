import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import NavBar from "./components/navbar";
import MovieForm from "./components/movieForm";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import UserForm from "./components/userForm";
import Users from "./components/users";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<RegisterForm />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/movies/:id" element={<MovieForm />} />
              <Route path="/users/:id" element={<UserForm />} />
            </Route>

            <Route
              path="/movies"
              element={<Movies user={user} />}
            />
            <Route path="/users" element={<Users />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/not-found" element={<NotFound />} />

            <Route path="/" element={<Navigate to="/movies" replace />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </main>
      </>
    );
  }
}

export default App;
