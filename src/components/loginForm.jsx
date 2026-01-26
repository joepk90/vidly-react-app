import Joi from "joi";
import { Navigate } from "react-router-dom";
import Form from "./common/form";
import auth from "../services/authService";

// Wrapper to inject location & navigate for class component
export function withRouter(Component) {
  return (props) => {
    const location = props.location;
    const navigate = props.navigate;
    return <Component {...props} location={location} navigate={navigate} />;
  };
}

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {}
  };

  schema = Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password")
  });

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      // Use navigate if provided (via wrapper)
      const from =
        this.props.location?.state?.from?.pathname || "/";
      this.props.navigate(from, { replace: true });

    } catch (ex) {
      if (ex?.response?.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) {
      return <Navigate to="/" replace />;
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
