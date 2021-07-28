import React from "react"

const RenderShoppingList = (props)=>{

    let keys = Object.keys(props.list)
    return(
        <div>
            {keys.map(keyName=>{
                return(
                    props.list.[keyName].map(food=> {
                        return(
                            <p id = {food} key = {food}></p>
                        )
                    }
                    )
                )
                })
            }
        </div>

    )

}
export default RenderShoppingList