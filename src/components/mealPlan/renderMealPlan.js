import React from 'react'

const RenderMealPlan = (props)=>{

    const resetDay=()=>{
        day++
        if(day === 7){day = 0}
    }


    let day = props.day1
    let k = 0 //to add unique keys and avoid console warnings.

    return (
        <div 
        className = "foodsList"
        >
            {props.week.map(()=>{
                return (
                    <div className = "day" key = {k}>
                        <h2 key = {"h2"+k}>{props.week[day]}</h2>
                        <div key = {"filler"+k} className="filler">
                            {props.dailyMeals.map(meal=>{
                                k++
                                return(
                                    <div className="meal" key = {meal + k}>
                                        <h3 key = {"h3"+meal +k}>{meal}</h3>
                                        {props.foodsObjectKeys.map(keyName=>{
                                            return <p 
                                            id= {props.week[day]+meal+keyName}
                                            key = {props.week[day]+meal+keyName}
                                            onDrop = {(event)=>(event.target.value = props.dragged)}

                                            > </p>
                                        })}
                                        
                                    </div>
                                )
                            })}
                            {resetDay()}
                            
                        </div>
                    </div>

                )
            }
                
                )}
        </div>
    )
}
export default RenderMealPlan