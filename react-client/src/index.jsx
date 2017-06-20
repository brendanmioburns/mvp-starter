import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';
import Axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shows: []
    }
    console.log(this.shows);
    this.fetchVideos = this.fetchVideos.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillMount() {
    this.fetchVideos();
  }

  search(term) {
    console.log(`${term} was searched`)
    console.log('keyword this before ajax', this);

    $.post({
      url: '/shows/import',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({'tvshow': term}),
      success: function(data) {
        console.log('keyword this inside of AJAX POST: ', this);
        console.log('got data: ', data);
        this.fetchVideos();
      }.bind(this),
      error: (err) => {
        console.log('Error with AJAX POST: ' + err);
      }
    })
  }

  fetchVideos() {
    var context = this;
    $.get({
      url: '/shows',
      success: function(data) {
        console.log('successful fetch: ', this);
        context.setState({
          shows: data
        });
      }.bind(this),
      error: (err) => {
        console.log('Fetch error: ', err);
      }
    });
    // Axios.get('/shows')
    //   .then(function(data) {
    //     console.log('Axios data: ', data);
    //     context.setState({shows: data.data})
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   })
  }

  render () {
    return (<div>
      <h1>BingePlease!</h1>
      <h3>Stay on top of the shows you haven't had time to watch</h3>
      <Search onSearch={this.search}/>
      <List shows={this.state.shows}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));