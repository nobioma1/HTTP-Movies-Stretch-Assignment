import React, { Component } from 'react';
import axios from 'axios';

class MovieForm extends Component {
  state = {
    title: '',
    director: '',
    metascore: '',
    star: '',
    stars: []
  };

  inputHandler = event => {
    const input = event.target;
    this.setState({ [input.name]: input.value });
  };

  addStar = event => {
    event.preventDefault();
    const starName = this.state.star;
    if (starName.length > 0 && !this.state.stars.includes(starName))
      this.setState({ stars: [...this.state.stars, starName], star: '' });
  };

  removeStar = (event, currentStar) => {
    event.preventDefault();
    let stars = this.state.stars.filter(star => star !== currentStar);
    this.setState({ stars });
  };

  addMovie = event => {
    event.preventDefault();
    const newMovie = {
      title: this.state.title,
      director: this.state.director,
      metascore: this.state.metascore,
      stars: this.state.stars
    };

    if (newMovie.title.length > 1 && newMovie.director.length) {
      axios
        .post('http://localhost:5000/api/movies', newMovie)
        .then(res => {
        if (res.status === 201) this.props.history.push('/');
      });
    }
  };

  render() {
    return (
      <div className="movie-card">
        <h2>Add New Movie</h2>
        <form className="add-movie-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={this.inputHandler}
            value={this.state.title}
          />
          <input
            type="text"
            name="director"
            placeholder="Director"
            onChange={this.inputHandler}
            value={this.state.director}
          />
          <input
            type="number"
            name="metascore"
            placeholder="Metascore"
            onChange={this.inputHandler}
            value={this.state.metascore}
          />
          <p className="stars">
            {this.state.stars.length > 0 && 'Added Star:'}
          </p>
          <ol>
            {this.state.stars.length > 0 &&
              this.state.stars.map(star => (
                <li key={star} className="stars">
                  {star}
                  <button onClick={event => this.removeStar(event, star)}>
                    Remove
                  </button>
                </li>
              ))}
          </ol>
          <div className="add-star-form">
            <input
              type="text"
              name="star"
              placeholder="Add a Star in the Movie"
              onChange={this.inputHandler}
              value={this.state.star}
            />
            <button onClick={this.addStar}>Add Star</button>
          </div>
          <button onClick={this.addMovie}>Add New Movie</button>
        </form>
      </div>
    );
  }
}

export default MovieForm;
