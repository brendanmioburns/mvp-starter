import React from 'react';

const ListItem = (props) => (
  <div>
      <h2>{ props.show.title }</h2>
      <img src={ props.show.image }></img>
      <h3>{ props.show.summary }</h3>
  </div>
)

export default ListItem;