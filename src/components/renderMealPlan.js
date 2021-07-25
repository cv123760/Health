import React from 'react'

const RenderMealPlan = (props)=>{

    const resetDay=()=>{
        day++
        if(day === 7){day = 0}
    }


    let day = props.day1



    return (
        <div className = "foodsList">
            {props.week.map(()=>{
                return (
                    <div className = "day">
                        <h2>{props.week[day]}</h2>
                        <div className="filler">
                            {props.dailyMeals.map(meal=>{
                                return(
                                    <div className="meal">
                                        <h3>{meal}</h3>
                                        {props.foodsObjectKeys.map(keyName=>{
                                            return <p id= {props.week[day]+meal+keyName}> </p>
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