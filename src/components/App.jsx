// to do:

// click on food
//  creates a new object named plan if it does not exist yet
//  creates a key named after the food group (proteing, carb...)
//   it does not exist yet
//   where the value is an empty array.
//  the food string is pushed into the emty array
//  





import React from "react";
import ListFoodGroups from "./Food_group"
import Foods from "./Foods"
import RenderMealPlan from "./renderMealPlan";
import dailyMeals from "./dailyMeals";
import week from "./week.js"
import RenderShoppingList from "./renderShoppingList";



const App = ()=>{
    const foodsObjectKeys = Object.keys(Foods)
    const date = new Date();
    const foodTracker = {}
    const shoppingList = {}
    let today = date.getDay();
    


    const generateFoodTracker  = ()=>{
        foodsObjectKeys.map(keyName=>{
            foodTracker.[keyName] = 0
            foodTracker.[keyName + "Day"] = today
        })
    }


    const addToPlan = (keyName, valueName)=>{
        if (foodTracker.[keyName]===3){
            foodTracker.[keyName] = 0
            foodTracker.[keyName + "Day"] ++
            if (foodTracker.[keyName + "Day"]===7){
                foodTracker.[keyName + "Day"]=0
            }

        }
        let day = week[foodTracker.[keyName + "Day"]]
        let mealTime = dailyMeals[foodTracker.[keyName]]
        let pTag = document.getElementById(day+mealTime+keyName)
        pTag.innerHTML = valueName
        updateShoppingList(valueName, keyName)
        foodTracker.[keyName]++
    }

    const updateShoppingList=(valueName, keyName)=>{
        let servingSize = 6/16
        if (keyName === 'Carbs'){servingSize = 8/16}
        else if(keyName === 'Veggies'){servingSize = 1}
        console.log(keyName + " " + servingSize)
        if(!shoppingList.[valueName]){shoppingList.[valueName]=servingSize}
        else{shoppingList.[valueName]= shoppingList.[valueName] + servingSize}
        
    }

    const createShppingList=()=>{        
        console.log (shoppingList)
    }



    generateFoodTracker()
    return (
        <div>
            <p>click foods from each food group and watch your weekly meal plan get created. each meal will consist of a protein, carb, and veggie </p>
            <div className = "main">
                <h1>Foods</h1>
                {foodsObjectKeys.map(foodGroup => {
                    return (
                        <ListFoodGroups 
                        keyName = {foodGroup} 
                        list = {Foods.[foodGroup]}
                        addToPlan = {addToPlan}
                        />
                    )
                })}
            </div>
            <div className = "mealPlan">
                <h1>Weekly Meal Plan</h1>
                <RenderMealPlan 
                week = {week}
                dailyMeals = {dailyMeals}
                foodsObjectKeys = {foodsObjectKeys}
                day1 = {today}

                />
            </div>
            <button onClick={createShppingList}>Create Shopping List</button>
            <div id = "shoppingList">


            </div>

        </div>
    )


};

export default App
