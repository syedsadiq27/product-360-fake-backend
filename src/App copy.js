import "./App.css";
import products from "./product.json";
import rules from "./rules.json";
import AddRules from "./UI/AddRules";

const requiredSelection = new Set();

const requires = (object, array) => {
  if (rules[object].requires) {
    rules[object].requires.map((obj) => {
      array.add(obj);
      if (rules[obj]?.requires) {
        requires(obj, array);
      }
    });
    return array;
  }
}

const excludes = (object, array)=>{
  if(array.length == 0){
    if(rules[object].excludes){
      rules[object].excludes.map((obj)=>{
        array.add(obj);
        if()
      })
    }
  }else
  
}
  const selction = (object) => {
    console.log(object);
    const required = new Set();
    const excludes = new Set()
    const requiredRules = requires(object, required);
    console.log(rules[object].excludes)
    const excludesRules = requires(rules[object])

    console.log(requiredRules);
    console.log(excludesRules)

    // if (rules[object].requires) {
    //   rules[object].requires.map((obj) => {
    //     requiredSelection.add(obj);
    //     if (rules[obj]?.requires) {
    //       selction(obj);
    //     }
    //   });
    // }
    // if (rules[object].excludes) {
    //   rules[object].excludes.map((obj) => {
    //     if (requiredSelection.has(obj)) {
    //       requiredSelection.delete(obj);
    //       if (rules[obj]?.excludes) {
    //         selction(obj);
    //       }
    //     }
    //   });
    // }
    // console.log(requiredSelection);
};

function App() {
  console.log("selectio.... flat visor");
  selction("cap_visor_flat");

  return (
    <div className="App">
      <AddRules />
      <div id="crown">
        {Object.entries(products.crown).map((value) => {
          return <p key={value[1].id}>{value[1].id}</p>;
        })}
      </div>
      <div id="visor">
        {Object.entries(products.visor).map((value) => {
          return <p key={value[1].id}>{value[1].id}</p>;
        })}
      </div>
    </div>
  );
}

export default App;
