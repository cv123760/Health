// to do:
// click on food
//      adds food to meal plan
// get meal plan to work
//  develope createPlan() fucntion
//      create a p tag for each meal isnide plan. put all the 0 indexes
//      together insisde the same div





import React from "react";
import Foods from "./Foods"
import FoodGroup from "./Food_group"

// list all foods seperated by food group inside the Foods.jsx file
const group = Object.keys(Foods)

const plan = {
    protein:[],
    carbs: [],
    veggies:[],
}

const createPlan = ()=>{
    const planKeys = Object.keys(plan)
    console.log(planKeys)
}


const list =()=> group.map((element, index)=>{
    return (
    <div>
        <h1>{element}</h1>
        <FoodGroup food = {Foods.[element]} foodString = {element} />
    </div>)
});


const App = () => {
    

    return <div>
        {list()}
        <div className="plan">
            <h1>Meal Plan</h1>
            {createPlan()}

        </div>
    </div>

};

export default App
export {plan}