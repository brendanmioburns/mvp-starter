import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    }
  }

  onChange(e) {
    this.setState({
      term: e.target.value
    })
  }

  search() {
    console.log('this.state.term:', this.state.term);
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div>
        <h4>Enter Your Show</h4>
        <input value={this.state.show} onChange={this.onChange.bind(this)}/>
        <button onClick={this.search.bind(this)}>Add TV Show Name</button>
      </div>
    )
  }
}

export default Search;