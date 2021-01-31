const main = () => { 
 
 class meal {

        constructor(protein, carb, veggie){
        this.protein = protein;
        this.veggie = veggie;
        this.carb = carb;
        }
        introduce() {
            debugger;
            console.log("${this.protein}, ${this.veggie}, ${this.carb}");
        }
    }


    const getag = (num) =>  document.getElementsBysTagName("input[num]").value

    let p = getag(0);
    let c = getag(1);
    let v = getag(2);
    console.log(p, c, v)

    let breakfast = new meal(p, c, v);


    var meal = {
        protein: p
    }
}

const button = () => gettag("button") 
button.addEventListener(KeyboardEvent, main)
