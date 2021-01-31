

function main(){
    function get(r){
        return document.getElementById(r).value;
    }
    
    var e = get("email")
    var p = get("password")
    
    var user = {
        email: e,
        password: p
    };
    
    console.log(user.email)
    console.log(user.password)

    // var file = open(C:/Users/Cv123/Documents/Web Developement/health)
    // file.appendChild(user)  
}
var button = document.querySelector("button");
button.addEventListener("click", main);