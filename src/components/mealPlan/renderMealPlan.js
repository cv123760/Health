import React from 'react'
import week from './week'
import Meal from './meal'

const RenderMealPlan=props=>{
    let dayNum = props.day

    const nextDay=()=>{
        dayNum++
        if (dayNum === week.length){dayNum=0}
    }

    return (
        week.map(()=>{
            
            return (
                <div 
                key={"div"+week[dayNum]}
                className = "day"
                >
                    <h2 key= {week[dayNum]}>{week[dayNum]}</h2>
                    <Meal 
                    groupList = {props.groupList}
                    day = {week[dayNum]}
                    />
                           
                
                    {nextDay()}
                </div>
            )
        })
    )   
    
}

export default RenderMealPlan