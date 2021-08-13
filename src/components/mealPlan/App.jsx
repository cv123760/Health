import React, { useState } from "react"
import ListFoodGroups from "./listFoodGroups"
import Foods from "./Foods"
import RenderMealPlan from './renderMealPlan'
import week from './week'
import dailyMeals from './dailyMeals'
import Header from "../header"
import ShoppingList from "./shoppingList"

const App = ()=>{

    const date = new Date();
    const today= date.getDay() 

    const mealTracker = {}

    const generateMealTracker =()=>{
        groupList.forEach(key=>{
            mealTracker.[key] = {}
            mealTracker.[key].day=today
            mealTracker.[key].meal=0
            mealTracker.[key].counter=0
        })
        mealTracker.shopping=[]
    }


    const addToShoppingList=item=>{
        if (!mealTracker.[item]){mealTracker.[item]=0}
        mealTracker.[item]++


    }

    const groupList = Object.keys(Foods) //Food Keys array
        
    // create a meal plan 
    const addToMealPlan = (item, group)=>{

        if(mealTracker.[group].counter >=21){return}
        mealTracker.[group].counter++


        let day = week[mealTracker.[group].day]
        let mealTime = dailyMeals[mealTracker.[group].meal]

        document.getElementById(day+mealTime+group).innerHTML = item
        
        mealTracker.[group].meal++   
        if (mealTracker.[group].meal === dailyMeals.length){
            mealTracker.[group].meal = 0
            mealTracker.[group].day++
            if (mealTracker.[group].day === week.length){
                mealTracker.[group].day=0
            }
        } 
        if(!mealTracker.shopping.includes(item)){
            mealTracker.shopping.push(item)
        }

        let p = document.createElement("p")

        p.innerHTML=item+" " 
        document.getElementById("shopping").append(p.innerHTML)
        console.log(p)
    }



    generateMealTracker()

    return (
    <div>

        <Header />

        <div className = 'main'>

            <h1>Food List</h1>
            <ListFoodGroups 
            addToMealPlan = {addToMealPlan}
            list = {Foods}
            mealTracker = {mealTracker}
            

            />

        </div>
        
        <div className = "mealPlan">

            <h1>Meal Plan</h1>
            <RenderMealPlan 
            groupList = {groupList}
            day = {today}
            />

        </div>
        
        <div className = "shopping" id = "shopping">

            <h1>ShooppingList</h1>

            <ShoppingList 
            list =  {mealTracker.shopping}
            />
        
                    
        </div>

    </div>
    )
}

export default App