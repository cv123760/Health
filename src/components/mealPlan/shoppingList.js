import React from 'react'



const ShoppingList=props=>{
    
    return (
        <div>
            {props.list.map(itme=>{
                return <p key={"shoppint" + itme}>item</p>
            })
            
            }
        </div>


    )
}



export default ShoppingList;
