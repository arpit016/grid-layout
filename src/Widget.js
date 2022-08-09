import React from 'react';

const widgetNames = {
  a: "A",
  b: "B",
  c: "C",
  d: "D"
};

const classes = {
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    border: "1px solid red"
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem"
  },
  spacer: {
    flexGrow: 1
  },
  body: {
    padding: "0.5rem",
    flexGrow: 1
  }
};

const Widget = ({id, onRemoveItem, item}) => {
  return (
    <div style={classes.root}>
      <div className={classes.header}>
        <h6>
          {widgetNames[item.cardType]}
          {item.content}
        </h6>
        <div className={classes.spacer} />
        <button aria-label="delete" onClick={() => onRemoveItem(id)}>
          Close
        </button>
      </div>
      <div className={classes.body} />
    </div>
  )
}

export default Widget;
