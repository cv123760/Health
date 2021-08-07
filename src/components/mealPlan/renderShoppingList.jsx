import React from "react"

const RenderShoppingList = (props)=>{
    const list = Object.keys(props.list)
    return (
        <div>
            {list.map(string=>{

                <p>[string]</p>
            })}
        </div>
    )

}
export default RenderShoppingList