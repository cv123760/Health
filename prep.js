// * Needs undo button





// shortcut fucntions
const id = (str) => document.getElementById(str)
const ele = (el) => document.createElement(el)
const nod = (txt) => document.createTextNode(txt)
const ac = (a,c) => a.appendChild(c)

// variables and constants
const plan = id('plan')
const div = ele('div')
div.className='day'
let div1;

let clks = 0
let mealTime = 0
let dayNum = 0

//arrays
const mealTimes=['Breakfast','Lunch', 'Dinner']
const Days= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

//crates a new meal h2 element, adds to html increases "mealTime"
// variable by one
const newMeal = ()=>{
    let h2 = ele('h2')
    let h2t = nod(mealTimes[mealTime])

    ac(h2,h2t)
    ac(div1,h2)        
    mealTime++
}


//creates new weekday "h1" and a div to place all elements
// related to the day
const newDay =()=>{
    div1 = div.cloneNode(true)
    let h1 = ele('h1')
    let h1t = nod(Days[dayNum])
    ac(h1,h1t)
    ac(div1,h1)
    ac(plan,div1)
    dayNum ++
    if (dayNum === Days.length){ dayNum = 0}
}

// cretes elements to reprecent meal preps on html
const prep=(main, p)=>{
    if (clks === 3){
        clks = 0
          if (mealTime === 3){
        mealTime = 0
        }
    }

    let h1 = id('h1')

    // generates meal prep h1
    if (h1 === null){
        h1 = ele('h1')
        let h1t = nod('Meal Plan') 
        h1.id = 'h1'
        ac(h1,h1t)
        ac(plan,h1)
    }

    let p1 = p.cloneNode(true)

    if(mealTime === 0 ){newDay()}

    if(clks === 0 ){newMeal()}

    ac(div1,p1) 

    clks ++
}

export default prep