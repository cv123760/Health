
import React from "react";
import ListFoodGroups from "./listFoodGroups"
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
        foodsObjectKeys.forEach(keyName=>{
            foodTracker.[keyName] = 0
            foodTracker.[keyName + "Day"] = today
        })
    }


    const addToPlan = (keyName, valueName)=>{
        if (foodTracker.[keyName]===dailyMeals.length){
            foodTracker.[keyName] = 0
            foodTracker.[keyName + "Day"] ++
            if (foodTracker.[keyName + "Day"]===week.length){
                foodTracker.[keyName + "Day"]=0
            }
        }
        if (!foodTracker.[keyName + " total"]){
            foodTracker.[keyName + " total"] = 0
        }
        foodTracker.[keyName + " total"]++
        if (foodTracker.[keyName + " total"] > 21){return}

        let day = week[foodTracker.[keyName + "Day"]]
        let mealTime = dailyMeals[foodTracker.[keyName]]
        let pTag = document.getElementById(day+mealTime+keyName)
        pTag.innerHTML = valueName
        updateShoppingList(valueName, keyName)
        foodTracker.[keyName]++
    }

    const updateShoppingList=(valueName, keyName)=>{
        if (!shoppingList.[valueName]){
            shoppingList.[valueName] = 0
        }
        shoppingList.[valueName]++

        let item = document.getElementById(valueName)

        item.innerHTML = shoppingList.[valueName] + " " + valueName
    }

    const addFood = (key, value)=>{
        let food = document.getElementById("add"+key).value
        if (food === ""){
            return
        }else{console.log(food)
            Foods.[key].push(food)
            console.log(Foods)
            document.getElementById("add"+key).value = ""}
        
    }

    generateFoodTracker()
    return (
        <div className="body">
            <p className="warning">Under cosntruction</p>
            <div className = "main">
                <h1>Foods</h1>
                {foodsObjectKeys.map(foodGroup => {
                    return (
                        <ListFoodGroups 
                        key = {foodGroup}
                        keyName = {foodGroup} 
                        list = {Foods.[foodGroup]}
                        addToPlan = {addToPlan}
                        addFood = {addFood}
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
                list = {Foods}
                shoppingList= {shoppingList}
                />


            </div>

        </div>
    )


};

export default App
