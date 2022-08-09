import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { withSize } from "react-sizeme";
import Widget from "./Widget";

const originalItems = [{cardId: "123", cardType: "a", content: "A"},
                       {cardId: "456", cardType: "b", content: "B"},
                       {cardId: "789", cardType: "c", content: "C"},
                       {cardId: "987", cardType: "d", content: "D"},
                       {cardId: "988", cardType: "b", content: "B component with diff content"}];

const initialLayouts = {
  // this 'i' needs to be unique it uses this i to map to the key component
  // we will have an issue with this thing because if we use this we will have to save the layout
  // problem is how do i take care of the i values? which is unique as well as tells us how things are rendered
  // on a page
  // this can be maybe cardId?
  lg: [
    { i: "123", x: 0, y: 0, w: 1, h: 4 },
    { i: "456", x: 1, y: 0, w: 3, h: 4 },
    { i: "789", x: 4, y: 0, w: 1, h: 4 },
    { i: "987", x: 0, y: 4, w: 2, h: 4 },
    { i: "988", x: 0, y: 4, w: 2, h: 4 }
  ]
};

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {}
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

const ResponsiveGridLayout = WidthProvider(Responsive)

function GridLayout() {
  const [items, setItems] = useState(originalItems);
  const [layouts, setLayouts] = useState(
    initialLayouts
  );
  const onLayoutChange = (_, allLayouts) => {
    // initial layout still need to be created from the backend
    // we need to save this allLayouts object somewhere in the db i think schedule might be a better place
    console.log("All Layouts: ", allLayouts)
    setLayouts(allLayouts);
  };
  const onLayoutSave = () => {
    saveToLS("layouts", layouts);
  };
  const onRemoveItem = (itemId) => {
    // when removing items it is necessary to delete from the main items array rather than the layout array
    setItems(items.filter((i) => i !== itemId));
  };
  const onAddItem = (itemId) => {
    setItems([...items, itemId]);
  };

  return (
    <>
      <button onClick={() => onLayoutSave()}>Save Layout</button>
      <button onClick={() => onAddItem()}>Add Item</button>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 6, sm: 6, xs: 1, xxs: 1 }}
        rowHeight={60}
        width={1200}
        onLayoutChange={onLayoutChange}
      >
        {items.map((item) => (
          <div
            key={item.cardId}
            className="widget"
          >
            <Widget
              id={item.cardId}
              item={item}
              onRemoveItem={onRemoveItem}
              backgroundColor="#867ae9"
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </>
  );
}

export default GridLayout;
