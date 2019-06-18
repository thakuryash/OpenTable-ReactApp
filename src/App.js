import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import "./App.css";
class App extends Component {
  state = {
    users: [],
    loading: false
  };

  searchUsers = text => {
    fetch(`https://opentable.herokuapp.com/api/restaurants?city=${text}`)
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log(data.restaurants);
        let output = "";
        data.restaurants.forEach(function(user) {
          output += `<div class="list-items"><a href=${
            user.reserve_url
          } target="_blank"><img src=${user.image_url}></a><ul><li>Name: ${
            user.name
          }</li><li>Address: ${user.address}</li><li>Price: ${
            user.price
          }</li></ul></div>`;
        });

        document.getElementById("output").innerHTML = output;
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  // Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={this.state.users.length > 0 ? true : false}
          />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}
export default App;
