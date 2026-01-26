import Joi from "joi";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
import { useNavigate } from "react-router-dom";

// Wrapper to inject navigate for class component
export function withNavigate(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {}
  };

  schema = Joi.object({
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name")
  });

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);

      auth.loginWithJwt(response.headers["x-auth-token"]);

      // Use navigate instead of full reload
      this.props.navigate("/", { replace: true });

    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default withNavigate(RegisterForm);
