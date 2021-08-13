import React from "react"
import ListItems from "./listItems"



const ListFoodGroups = (props)=>{
   let keyList = Object.keys(props.list)

   return (
      <div>
      {keyList.map(group=>{
         return(
         <div key = {"div"+group}>
         <h2 key= {"h2"+group}>{group}</h2>
         <ListItems 
         list = {props.list}
         group = {group}
         addToMealPlan = {props.addToMealPlan} 
         addToFoods = {props.addToFoods}
         />
         </div>
         )
      })}
      </div>
   )
}
export default ListFoodGroups
