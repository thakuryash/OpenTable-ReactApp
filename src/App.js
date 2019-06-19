import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Restaurant from "./components/restaurants/Restaurant";
import Search from "./components/restaurants/Search";
import "./App.css";
class App extends Component {
  state = {
    restaurants: [],
    loading: false
  };

  searchRestaurant = text => {
    fetch(`https://opentable.herokuapp.com/api/restaurants?city=${text}`)
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log(data.restaurants);
        let output = "";
        data.restaurants.forEach(function(restaurant) {
          output += `<div class="list-items"><a href=${
            restaurant.reserve_url
          } target="_blank"><img src=${
            restaurant.image_url
          }></a><ul><li>Name: ${restaurant.name}</li><li>Address: ${
            restaurant.address
          }</li><li>Price: ${restaurant.price}</li></ul></div>`;
        });

        document.getElementById("output").innerHTML = output;
      })
      .catch(function(err) {
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
