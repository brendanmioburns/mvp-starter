import React from 'react';

const ListItem = (props) => (
  <div>

      <h2>{ props.show.title }</h2>
      <img src={ props.show.image }></img>
      { props.show.summary }

  </div>
)

export default ListItem;