var box = document.getElementById("box")
  var hello = document.getElementById("hello")
  
  function add(){
    var create = document.createElement("li")
    create.innerHTML= box.value + " <button onclick=\"deleteitem(event)\"> Delete </button>"
    hello.append(create)
  }
  function deleteitem(event){
    event.target.parentElement.remove()
  }
  
