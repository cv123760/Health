import React from "react"


const ListFoodGroups = (props)=>{




   return (
      <div>
         <h2>{props.keyName}</h2>
         
         <div key = {props.keyName} className = "foodsList">
            {props.list.map(foodName =>  {
               return <button
               key = {foodName}
               onClick = {()=> {
                  props.addToPlan(props.keyName,foodName)
                  }}>{foodName}</button>
            })}  
            <form>
               <input 
               type="text" 
               id= {"add"+ props.keyName} 
               placeholder = {"add " + props.keyName} />
               <button 
               onClick = {(event)=>{
                  event.preventDefault()
                  props.addFood(props.keyName, props.foodName)}}>+</button>
            </form>
            
         </div>
         
                            
      </div>
   )  
}

export default ListFoodGroups