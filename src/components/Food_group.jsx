import React from "react"
import {plan} from "./App"

function FoodGroup(props) {
   const group = props.food.map((element)=>{
      return (<p onClick = {() => {
         plan.[props.foodString].push(element)
         console.log(plan)
      }
   }>{element}</p>)
   })
   return <div className="types">{group}</div>

}
export default FoodGroup

