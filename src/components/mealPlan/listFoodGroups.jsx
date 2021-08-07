import React, {useState}   from "react"



const ListFoodGroups = (props)=>{
   const [foods, updateFoods] = useState(props.list)
   const addFood = (string)=>{
      updateFoods(preveValue=>[...preveValue, string])
   }


   return (
      <div>
         <h2>{props.keyName}</h2>
         
         <div key = {props.keyName} 
            className = "foodsList"
            id = {props.keyName}
            >


            {foods.map(foodName =>  {
               let b1 =
               <button
               key = {foodName}
               onClick = {()=> {
                  props.addToPlan(props.keyName,foodName,foods)
                  }}
               
                  >
                     {foodName}
               </button>
               return b1
            })}  
         </div>
         <form>
               <input 
               type="text" 
               id= {"add"+ props.keyName} 
               placeholder = {"add " + props.keyName} 
               />


               <button 
               onClick = {(event)=>{
                  event.preventDefault()
                  let string = document.getElementById("add"+ props.keyName).value
                  if (string === ""){return}
                  document.getElementById("add"+ props.keyName).value = ""
                  addFood(string, props.keyName)
                  props.updateShoppingList(string)
               }}>+</button>
            </form>
         
                            
      </div>
   )  
}

export default ListFoodGroups
