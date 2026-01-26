import Joi from "joi";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

// === Wrapper to inject params + navigate into class component ===
import { useParams, useNavigate } from "react-router-dom";
export const MovieFormWrapper = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  return <MovieForm {...props} params={params} navigate={navigate} />;
};

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };

  // === Joi schema object ===
  schema = Joi.object({
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).max(100).required().label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  });

  async populateGenres() {
    const { data } = await getGenres();
    this.setState({ genres: data });
  }

  async populateMovie() {
    try {
      const { id } = this.props.params;

      if (id === "new") return;

      const { data: movie } = await getMovie(id);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.navigate("/not-found", { replace: true });
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel = (movie) => ({
    _id: movie._id, // undefined if creating new movie
    title: movie.title,
    genreId: movie.genre._id,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
  });

  doSubmit = async () => {
    const { data } = this.state;
    await saveMovie(data);
    this.props.navigate("/movies");
  };

  renderTitle() {
    const { title } = this.state.data;
    const formTitle = title ? `Movie Form: ${title}` : "Movie Form";
    return <h1>{formTitle}</h1>;
  }

  render() {
    const { genres } = this.state;
    const genreOptions = genres.map((genre) => ({ value: genre._id, name: genre.name }));
    const options = [{ value: "", name: "Choose..." }, ...genreOptions];

    return (
      <div>
        {this.renderTitle()}

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", options)}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;