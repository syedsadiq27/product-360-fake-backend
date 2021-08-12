import React from "react";
import axios from "axios";

function App() {
  const path = "http://localhost:3000/";
  const RulesPath = path + "rules/";
  let requiresArray = [];
  let includesArray = [];
  let excludesArray = [];
  const RulesResolver = async (object) => {
    const Requires = async (object) => {
      const RULES = await (await axios.get(RulesPath + object)).data;
      if (RULES.requires) {
        RULES.requires.forEach((val) => {
          if (requiresArray.indexOf(val) === -1) {
            requiresArray.push(val);
          }
        });
        requiresArray.forEach(async (val) => {
          const REQRULES = await (await axios.get(RulesPath + val)).data;
          REQRULES.requires &&
            REQRULES.requires.forEach((val) => {
              if (requiresArray.indexOf(val) === -1) {
                requiresArray.push(val);
                Requires(val);
              }
            });
        });
      }
    };
    const Includes = async (object) => {
      const RULES = await (await axios.get(RulesPath + object)).data;
      if (RULES.includes) {
        RULES.includes.forEach((val) => {
          if (includesArray.indexOf(val) === -1) {
            includesArray.push(val);
          }
        });
        includesArray.forEach(async (val) => {
          const INCRULES = await (await axios.get(RulesPath + val)).data;
          INCRULES.requires &&
            INCRULES.requires.forEach((val) => {
              if (includesArray.indexOf(val) === -1) {
                includesArray.push(val);
                Includes(val);
              }
            });

          INCRULES.includes &&
            INCRULES.includes.forEach((val) => {
              if (includesArray.indexOf(val) === -1) {
                includesArray.push(val);
                Includes(val);
              }
            });
        });
      }
    };

    const Excludes = async (object) => {
      const RULES = await (await axios.get(RulesPath + object)).data;
      if (excludesArray.length === 0 && RULES.excludes) {
        RULES.excludes.forEach((val) => {
          if (excludesArray.indexOf(val) === -1) {
            excludesArray.push(val);
          }
        });
        excludesArray.forEach(async (val) => {
          const INCRULES = await (await axios.get(RulesPath + val)).data;
          INCRULES.includes &&
            INCRULES.includes.forEach((val) => {
              if (excludesArray.indexOf(val) === -1) {
                includesArray.push(val);
                Excludes(val);
              }
            });
        });
      }
    };

    const requiresPromise = Requires(object).then(() => requiresArray);
    const includesPromise = Includes(object).then(() => includesArray);
    const excludesPromsise = Excludes(object).then(() => excludesArray);

    return Promise.all([
      requiresPromise,
      includesPromise,
      excludesPromsise,
    ]).then((resolved) => {
      requiresArray.forEach((val) => {
        if (includesArray.indexOf(val) > -1) {
          const index = includesArray.indexOf(val);
          includesArray.splice(index, index + 1);
        }
      });
      return {
        requires: requiresArray,
        includes: includesArray,
        excludes: excludesArray,
      };
    });
  };
  const categoryResolver = async()=>{
    const response = await(axios.get(path+"class"))
    return response.data
}
  categoryResolver().then((val)=>{console.log(val)})
  
  // RulesResolver("BTNA1").then((val) => console.log(val));


  return (
    <div>
      {requiresArray && requiresArray.forEach((value) => <p>{value}</p>)}
      <p>Hiii</p>
    </div>
  );
}

export default App;
