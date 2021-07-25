import React from "react"


const ListFoodGroups = (props)=>{


   return (
      <div>
         <h2>{props.keyName}</h2>
         
         <div className = "foodsList">
            {props.list.map(foodName =>  {
               return <button
               onClick = {()=> {
                  props.addToPlan(props.keyName,foodName)
                  }}>{foodName}</button>
            })}  
         </div>
                                                 
      </div>
   )  
}

export default ListFoodGroups