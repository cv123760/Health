import Meals from "./dailyMeals"

const Meal= props=>{
    return <div>
        {Meals.map(meal=>{
            return (
                <div key = {"div"+props.day+meal}className = "meal">
                <h3>{meal}</h3>
                {props.groupList.map(group=>{
                    return <p 
                    id = {props.day+meal+group}
                    key = {props.day+meal+group}
                    ></p>
                })}
                </div>
            )
        })}
    </div>

}
export default Meal