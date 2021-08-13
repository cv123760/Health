import React, { useState } from "react"


const ListItems=props=>{
    const [foods, updateList]= useState(props.list.[props.group])
    const addToFoods=item=>{
        if(item === "" || foods.includes(item)){return}
        updateList(prevValue=>{
            return [... prevValue, item]
        })
    }
    

    
    return (
        <div>
            <div>
            {foods.map((item)=>{
                
                return (
                    <button 
                    key = {item}
                    onClick = {event=>{
                        event.preventDefault()
                        props.addToMealPlan(item, props.group)
                    }}
                    >{item}</button>
                )
            })}
            </div>
            <form>
                <input 
                type="text" 
                id = {props.group+"input"}
                placeholder = "Add an Iten"  
                />

                <button 
                onClick ={event=>{
                    event.preventDefault() 
                    let food = document.getElementById(props.group+"input").value
                    addToFoods(food, props.group, foods)
                    console.log("foods updated")
                    document.getElementById(props.group+"input").value = ""

                }}
                >+</button>
            </form>
            <div> 
                
            </div>
        </div>
    )
}

export default ListItems
