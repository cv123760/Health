import Foods from './food'
import prep from './prep';
    
let i;
for(i in Foods ){
    let h = document.createElement('h1')
    let t = document.createTextNode(i)
    let main = document.getElementById("main")
    h.appendChild(t)
    main.appendChild(h)

    var j;
    for (j=0; j < Foods[i].length; j++){
        let txt = document.createTextNode(Foods[i][j])
        let p = document.createElement('button')
        main.appendChild(p)
        p.appendChild(txt)

        
        p.addEventListener("click", ()=>{
            prep(main,p)
        })
        
    }
}    