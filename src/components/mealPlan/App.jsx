
import React, { useState } from "react";
import ListFoodGroups from "./listFoodGroups"
import Foods from "./Foods"
import RenderMealPlan from "./renderMealPlan";
import dailyMeals from "./dailyMeals";
import week from "./week.js"
import RenderShoppingList from "./renderShoppingList";



const App = ()=>{

// create a list of foods to choose from 
    const foodsObjectKeys = Object.keys(Foods)


// Create meal Plan 
    // to track day, meal time, and when plan is full
    const foodTracker = {}

    const date = new Date();

    let today = date.getDay();

    const addToPlan = (keyName, valueName)=>{
        // add new fields to tracker
        if (!foodTracker.[keyName + " total"]){
            foodTracker.[keyName + " total"] = 0
            foodTracker.[keyName] = 0
            foodTracker.[keyName + "Day"] = today
        }
        
        // reset values to loop throung meals and move on to next day
        // when current day is full
        if (foodTracker.[keyName]===dailyMeals.length){
            foodTracker.[keyName] = 0
            foodTracker.[keyName + "Day"] ++
            if (foodTracker.[keyName + "Day"]===week.length){
                foodTracker.[keyName + "Day"]=0
            }
        }
        
        
        foodTracker.[keyName + " total"]++
        if (foodTracker.[keyName + " total"] > 21){return}

        let day = week[foodTracker.[keyName + "Day"]]
        let mealTime = dailyMeals[foodTracker.[keyName]]
        let pTag = document.getElementById(day+mealTime+keyName)
        pTag.innerHTML = valueName
        foodTracker.[keyName]++
        updateShoppingList(valueName)
        console.log(shoppingList)
    }



// Create a shopping list
    const shoppingList = {}

    const updateShoppingList=(string)=>{
        if (!shoppingList.[string]){
            shoppingList.[string] = 0
        }

        shoppingList.[string]++

    }
    
    return (
        <div className="body">

            <p className="warning">Under cosntruction</p>
            <div className = "main">
                <h1>Foods</h1>
                {foodsObjectKeys.map(foodGroup => {
                    console.log(Foods.[foodGroup])
                    return (
                        <ListFoodGroups 
                        key = {foodGroup}
                        keyName = {foodGroup} 
                        list = {Foods.[foodGroup]}
                        addToPlan = {addToPlan}
                        updateShoppingList = {updateShoppingList}
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
            <h1>Shopping List</h1>
            <div id = "shoppingList">
                <RenderShoppingList
                list = {shoppingList}
                />


            </div>

        </div>
    )


};

export default App
