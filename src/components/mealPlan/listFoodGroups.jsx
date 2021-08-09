import React, {useState}   from "react"



const ListFoodGroups = (props)=>{
   const [foodGroup, updatefoodGroup] = useState(props.list)

   const addToFoodGroup = item=>{
      if (item === ""){return}
      updatefoodGroup(prevValue=>{
         return [...prevValue, item]
         })
   }
   

   return ( 
      <div>
            {foodGroup.map(item=>{
            return <button 
            
            key = {item}
            onClick = {event=>{
               event.preventDefault()
               props.addToMealPlan(item,props.group)}
               }
            >{item}</button>
         })}
            <form>
               <input 
               type="text" 
               id = {"input"+ props.group}
               placeholder = "Add new Item"
               />

               <button 
                  onClick={event=>{
                     event.preventDefault()
                     let food = document.getElementById("input"+ props.group).value
                     addToFoodGroup(food, props.group)
                     document.getElementById("input"+ props.group).value = ""
                  }}
               >+</button>
            </form>
            
            
         


      </div>
      
   )
   
   
      
}
export default ListFoodGroups
