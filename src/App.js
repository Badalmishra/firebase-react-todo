import React, { Component } from 'react';

import './App.css';
import firebase, { auth, provider } from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this); 
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.user?(this.state.user.displayName || this.state.user.email ): "test"

    }
    itemsRef.push(item);
    this.setState({
      currentItem: '',
    });
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      console.log("in it");
      
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        });
      }

      this.setState({
        items: newState
      });
    });
    
  }
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  logout() {
    firebase.auth().signOut().then(function() {
      window.location="/";
     }).catch(function(error) {
      console.log("problem hai");
      
    });
  
  }
  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
        window.location="/";
      });
          
  }

  render() {
    return (
      <div className='app'>
        <header>
            <span className="wrapper">
              <h1>React Firebase Todo List</h1>
              <span className="pic">  
              {this.state.user ?
              <span>
              <button onClick={this.logout}>Log Out</button>                
              <img src={this.state.user.photoURL} />
              </span>
              :
              <button className="gin" onClick={this.login}>Google Log In <b>G</b></button>              
              }  
            
              </span>     
            </span>
            
        </header>
        
        
        <div className='container'>
          <section className='add-item'>
                <form onSubmit={this.handleSubmit}>
                {this.state.user ?
                  <input type="text" name="username"  value={this.state.user.displayName || this.state.user.email} />
                 :
                 <p>Please Login FIrst</p>
                 }
                  <input type="text" name="currentItem" placeholder="Add task here" onChange={this.handleChange} value={this.state.currentItem} />
                  <button>Add Item</button>
                </form>
          </section>
          <section className='display-item'>
              <div className="wrapper">
                <ul>
                
                {  this.state.items.map((item) => {
                    return (
                      <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>Added by: {item.user}
                        {this.state.user ?
                         item.user === this.state.user.displayName || item.user === this.state.user.email ?
                           <button onClick={() => this.removeItem(item.id)}>Remove Item</button> : null
                           :<p>Nothing to show</p>}
                           </p>
                      </li>
                    )
                  })
                }
                </ul>
              </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;