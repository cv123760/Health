import React from "react"
import ListFoodGroups from "./listFoodGroups"
import Foods from "./Foods"
import RenderMealPlan from './renderMealPlan'
import week from './week'
import dailyMeals from './dailyMeals'
import ShoppingList from './shoppingList'


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
    }
    const shoppingList={}
    const shopList = Object.keys(shoppingList)

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
        if(!shoppingList.[item]){
            shoppingList.[item]=0
        } 

        shoppingList.[item]++
        document.getElementById("shopping"+item).innerHTML = shoppingList.[item]+' ' +item
    }


    generateMealTracker()
    return (
    <div>
        <div className = 'main'>
        <h1>Food List</h1>
        {groupList.map(group=>{
            return <div 
            key = {group+"sList"}>
                <h2 key = {group+"h1"}>{group}</h2>
                <ListFoodGroups 
                key = {group}
                group = {group}
                list = {Foods.[group]}
                addToMealPlan = {addToMealPlan}
                />
            </div>
            })}
        </div>
        
        <div className = "mealPlan">
            <h1>Meal Plan</h1>
            <RenderMealPlan 
            groupList = {groupList}
            day = {today}
            />
        </div>
        
        <div>
            <h1>Shopping List</h1>
            {groupList.map(group=>{
                return(
                    <ShoppingList 
                    key = {"shoplits"+group}
                    list = {Foods.[group]} //Foods does not update
                    />
                )
            })}
                    
        </div>

    </div>
    )
}

export default App