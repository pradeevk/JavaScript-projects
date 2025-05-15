var choices = document.querySelector(".phone")
var choices = document.querySelector(".name")
var lables = choices.querySelector(".label")
var input =  document.getElementById("input")

input.addEventListener("keyup", function() {
  var enterd = input.value;
    if (enterd == "") {
      lables.style.visibility = "visible";
    } else {
      lables.style.visibility = "hidden";
    }
});