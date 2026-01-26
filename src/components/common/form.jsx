import { Component } from "react";
import Joi from "joi";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const { error } = this.schema.validate(this.state.data, {
      abortEarly: false
    });

    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message; // path is now an array
    }

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const fieldSchema = Joi.object({ [name]: this.schema.extract(name) });
    const obj = { [name]: value };
    const { error } = fieldSchema.validate(obj);

    if (!error) return null;
    return error.details[0].message;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        options={options}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
