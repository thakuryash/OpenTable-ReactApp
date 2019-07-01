import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Restaurant from "./components/restaurants/Restaurant";
import Search from "./components/restaurants/Search";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      loading: false
    };

    //bindings
    this.searchRestaurant = this.searchRestaurant.bind(this);
  }

  searchRestaurant = text => {
    //loading animation
    this.setState({ loading: true });

    fetch(`https://opentable.herokuapp.com/api/restaurants?city=${text}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        //console.log(data.restaurants);
        let output = data.restaurants.map((restaurant, i) => {
          return (
            <div key={i} className='list-items'>
              <a href={restaurant.reserve_url} target='_blank'>
                <img src={restaurant.image_url} />
              </a>
              <ul>
                <li>Name: {restaurant.name}</li>
                <li>Address: {restaurant.address}</li>
                <li>Price: {restaurant.price}</li>
              </ul>
            </div>
          );
        });

        //update state
        this.setState({
          restaurants: output,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Search searchRestaurant={this.searchRestaurant} />
          <Restaurant
            loading={this.state.loading}
            restaurants={this.state.restaurants}
          />
        </div>
      </div>
    );
  }
}
export default App;
