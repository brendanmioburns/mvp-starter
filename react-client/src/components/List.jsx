import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> TV Shows List</h4>
    You have { props.shows.length } pending shows.
    { props.shows.map(show => <ListItem show={show}/>)}
  </div>
)

export default List;