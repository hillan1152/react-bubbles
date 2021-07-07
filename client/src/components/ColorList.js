import React, { useState } from "react";
import axios from "axios";

import {axiosWithAuth} from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState('');
  
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };
  
  const saveEdit = e => {
    e.preventDefault();
    console.log("Colors Log", colorToEdit);
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log("Save Edit Works", res.data);
        updateColors(
          colors.map(thing => {
          console.log('this is thing', thing)
          if(thing.id === colorToEdit.id) {
            return res.data
          } else return thing
        }))
      })
      .catch(err => console.log("Error", err))

  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`/api/colors/${color.id}`, colorToEdit)
      .then(res => {
        console.log('Delete Is Working', res.data)
        updateColors(colors.filter(click => click.id !== color.id))

    })
      .catch(err => console.log('Delete Error', err.response))

  };

  const colorAdd = e => {
    e.preventDefault();
    axiosWithAuth().post('/api/colors', addColor) 
      .then(res => {
        console.log("color add", res.data)
        updateColors([...colors, addColor])
        setAddColor(initialColor);
      })
      .catch(err => console.log("color add error", err.response))
  
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <div className="addForm">
      <form onSubmit = {colorAdd}>
          <legend>Add Color</legend>
          <label>
            Color Name:
            <input
              onChange = {event =>
                setAddColor({ ...addColor, color: event.target.value })
              }
              value={addColor.color}
            />
          </label>

          <label>
            Hex Code:
            <input
              onChange = {event =>
                setAddColor({
                  ...addColor,
                  code: { hex: event.target.value }
                })
              }
              value = {addColor.hex}
            />
          </label>

          <div className = 'button-row'>
            <button type = 'submit'>Add Color</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ColorList;
