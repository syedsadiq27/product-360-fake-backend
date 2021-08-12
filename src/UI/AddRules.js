import React from 'react'
const fs = require("fs")
const config = require("./../rules.json");

const handleAddRules=(e)=>{
    e.preventDefault()
    fs.readFile("./../rules.json", "utf8", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        console.log("File data:", jsonString);
      });
}
function AddRules() {
    return (
        <form onSubmit={handleAddRules}>
            <fieldset>
                <label>Product ID</label>
                <input type="text"></input>
            
                <label>Type</label>
                <select>
                    <option value="requires">Requires</option>
                    <option value="excludes">Excludes</option>
                </select>
                <label>Product ID</label>
                <input type="text"></input>
                <button type="submit">submit</button>
            </fieldset>
        </form>
    )
}

export default AddRules
