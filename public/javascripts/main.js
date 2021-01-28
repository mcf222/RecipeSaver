/*
 * This files holds all the code to test you REST API
 */

//Run once broswer has loaded everything
window.onload = function () {
    var submit = document.getElementById("submit");
    submit.addEventListener("click", function(){
        var input = document.getElementById("recipename").value;
        fetch("/recipes/", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Recipe: input
            })
        })
        .then(data => {
            document.getElementById("recipename").value = "";
            console.log("Recipe added");
        });
    })

    var inputtext = document.getElementById("recipename");
    inputtext.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
           event.preventDefault();
           document.getElementById("submit").click();
        }
     });

    var del = document.getElementById("delete");
    del.addEventListener("click", function(){
        var input = document.getElementById("recipename").value;
        var url = "/recipes/" + input;
        fetch(url, {
            method: "delete"
        })
        .then(data => {
            document.getElementById("recipename").value = "";
            console.log("Recipe deleted");
        });
    })

    var view = document.getElementById("view");
    view.addEventListener("click", function(){
        var p = document.getElementById("flex-container3");
        while (p.firstChild){
            p.removeChild(p.firstChild);
        }
        fetch("/recipes/")
        .then(response => response.json())
        .then(data => {
            var parent = document.getElementById("flex-container3");
            for (i = 0; i < data.length; i++){
                var div = document.createElement("div");
                div.innerText = data[i].Recipe;
                div.className = "divs";
                parent.appendChild(div);
            }
        });
    })


};