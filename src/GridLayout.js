import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Widget from "./Widget";

const originalItems = [{cardId: "123", cardType: "a", content: "A"},
                       {cardId: "456", cardType: "b", content: "B"},
                       {cardId: "789", cardType: "c", content: "C"},
                       {cardId: "987", cardType: "d", content: "D"},
                       ];

const initialLayouts = {
  // This initiallayout shud come from backend
  // this 'i' needs to be unique it uses this i to render the correct component in respective x y positions
  // the order of this array and of original items array does not matter here 
  // this can be maybe cardId?
  // it can accept minH, minW, maxW, maxH
  // All values here are in units and not in pixel
  lg: [
    { i: "123", x: 0, y: 0, w: 1, h: 4, minH: 4, minW: 1 },
    { i: "456", x: 1, y: 0, w: 3, h: 4 },
    { i: "789", x: 4, y: 0, w: 1, h: 4 },
    { i: "987", x: 0, y: 4, w: 2, h: 4 },
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
  const onAddItem = () => {
    // this method currently will work only once but the idea is to ge the new card details from backend
    // and update the cardarray by default it ll get added to the bottom
    const obj = {cardId: "988", cardType: "b", content: "B component with diff content"}
    setItems([...items, obj]);
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
