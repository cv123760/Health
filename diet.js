let dayCounter = -1  //keeps track of the day 
let mealCounter = 0 //keeps track of meal time

const meals = ["BreakFast", "Lunch", "Dinner"] // to cylce throug meals each day
const days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] //to cycle days of the week 


// Called with button click. Takes user input to return and returns a meal plan. can be re run until the meal plan for the week is completer. 
function main() {

    // creates element with text. e is for element type. t is for text
    function createE(e,t){
        let el = document.createElement(e)
        el.appendChild(document.createTextNode(t))
        return el
    }

      // get gets tags by id 
      function getag(input){
        let a = document.getElementById(input).value
        return a
    }


        //create div class meal
        let meal = document.createElement("div.meal")
        let h6 = createE("h6",meals[mealCounter])
        mealPrep.appendChild(meal)
        meal.appendChild(h6)

        
    if (mealCounter === 0){    
        // create a div class day, append place inside mealPrep div
        var day = document.createElement("div.day");
        let mealPrep = document.getElementById("mealPrep")
        mealPrep.appendChild(day)
        dayCounter++
        
        // creates day as a tittle for new day
        let h5 = createE("h5", days[dayCounter]);
        day.appendChild(h5)
        day.setAttribute("id", "day" + String(dayCounter))
    }


    let nday = document.getElementById("day"+ String(dayCounter));
    nday.appendChild(meal);

    // nday.style.width = 30%

    // get input vales
    let p = getag("protein");
    let c = getag("carb");
    let v = getag("veggie");

    // create p tags with input values 
    let pp = createE("p", p);
    let pc = createE("p", c);
    let pv = createE("p", v);

    meal.appendChild(pp);
    meal.appendChild(pc);
    meal.appendChild(pv);

    // week complete
    // delete and rename p tags on top
    if (dayCounter === 6 && mealCounter === 2 ){
        let inp = document.getElementById("button");
        inp.remove()
        console.log( "if sateement is working")
        
    }
    

    console.log("day ",dayCounter, "meal", mealCounter)
    mealCounter++


    // reset meal counter 
    if (mealCounter === 3){
        mealCounter = 0
    }



}