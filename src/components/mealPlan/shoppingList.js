import React from 'react'


const ShoppingList=props=>{

    return (
        props.list.map(item=>{
            return(
                <p 
                key={"shopping"+item}
                id={"shopping"+item}
                ></p>
            )    
        })
    ) 
}

export default ShoppingList;
