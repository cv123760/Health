import React from 'react'
import week from './week'
import Meals from './dailyMeals'

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
                    {Meals.map(meal=>{
                        return (
                            <div 
                            key = {week[dayNum]+meal}
                            className = "meal"
                            >
                                <h3>{meal}</h3>
                                {props.groupList.map(category=>{
                                    return<p 
                                    key = {week[dayNum]+meal+category} 
                                    id = {week[dayNum]+meal+category}
                                    ></p>
                                })}
                            
                            </div>
                        )
                           
                    })}
                    {nextDay()}
                </div>
            )
        })
    )   
    
}

export default RenderMealPlan