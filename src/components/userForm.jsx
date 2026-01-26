import Joi from "joi";
import Form from './common/form';
import { getUser } from '../services/userService';

class UserForm extends Form {

    state = {
        data: {
            // _id: '#', id exists when editing
            name: '',
            email: '',
            isAdmin: '',
        },
        errors: {},
        genres: []

    };

    schema = {
        _id: Joi.string(),
        name: Joi.string().required().label('Name'),
        email: Joi.string().email().required().label('Email'),
        isAdmin: Joi.bool().label('Is Admin')
    };

    async populateUser() {

        try {
            const { id } = this.props.match.params;

            if (id === 'new') return;

            const { data: user } = await getUser(id);

            // TODO setup user/ID Endpoint (only user/me is setup so far)

            this.setState({ data: this.mapToViewModel(user) });

        } catch (ex) {

            if (ex.response && ex.response.status === 404) {

                // console.error(ex);
                // console.error(ex.response);
                // console.error(ex.response.status);

                this.props.history.replace('/not-found');
            }
        }
    }

    async componentDidMount() {

        await this.populateUser();

    }

    mapToViewModel = (user) => {

        // maps data to the data structure of the current view (only mapping the required data)

        return {
            _id: user._id, // _id will be undefined if creating a new movie
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        }

    }

    doSubmit = async () => {

        // const { data } = this.state;

        // const test = await saveMovie(data);

        // console.log(test);

        // this.props.history.push('/movies');

    }

    renderTitle() {

        let formTitle = 'User Form';

        const { name } = this.state.data;

        if (name !== '') {
            formTitle = formTitle + ': ' + name;
        }

        return (
            <h1>{formTitle}</h1>
        );

    }

    render() {

        return (
            <div>

                {this.renderTitle()}

                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('name', 'Name')}
                    {this.renderInput('email', 'email', 'email')}
                    {/* TODO render ture/false option on if admin {this.renderInput('dailyRentalRate', 'Rate', 'number')} */}

                    {this.renderButton('Save')}
                </form>

            </div>
        );
    }
}

export default UserForm;