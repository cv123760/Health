let dayCounter = 0  //keeps track of the day 
let mealCounter = 0 //keeps track of meal

const meals = [".breakFast", ".lunch", ".dinner"]


function main(){ 
    console.log(dayCounter, "daycounter")
    console.log(mealCounter, "meal counter")
    class meal {

        constructor(protein, carb, veggie){
        this.protein = protein;
        this.veggie = veggie;
        this.carb = carb;
        }
        introduce() {
            debugger;
            console.log("${this.protein}, ${this.veggie}, ${this.carb}");
        }
    }
 
    function getag(input){
    let a = document.querySelector(input).value
    return a
    }


    let p = getag(".protein");
    let c = getag(".carb");
    let v = getag(".veggie");

    console.log(p, c, v)

    let newMeal = new meal(p, c, v);
    console.log("protein is " ,newMeal.protein)

    function createE(text){
        let p = document.createElement("p")
        let n = document.createTextNode(text)
        p.appendChild(n)
        return p
    }   
    
    function createTd(p,v,c){
        let td = document.createElement("td");
        td.appendChild(p);
        td.appendChild(v)
        td.appendChild(c)
        console.log(td, "before return")
        return td
    }
    
    let pp = createE(newMeal.protein);
    let pv = createE(newMeal.veggie);
    let pc = createE(newMeal.carb);

    let td = createTd(pp, pv, pc);
    console.log(td)

    let mealTime = meals[mealCounter]
    console.log(mealTime, "mealtime")
    let app = document.querySelector(mealTime)
    app.appendChild(td)  

    mealCounter++
    dayCounter++
    if (mealCounter === 3){mealCounter = 0}
    if (dayCounter === 21){
        var button = document.querySelector("button");
        var inputs = document.querySelectorAll("input");
        inputs[2].remove();
        inputs[1].remove();
        inputs[0].remove();
        button.remove();
    }
}
