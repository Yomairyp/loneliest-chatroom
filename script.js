
$(document).ready(function(){
 

// add message
$("#new-message-button").on("click", function() {

    let msg = $("#new-message-body").val();
    sendMessage(msg);  

});

//lonely button
$("#lonely").on("click",function(){

  $.ajax({url: "http://api.icndb.com/jokes/random/",
   success: function(result){

// $("#conversation").append(result)
    sendMessage(result.value.joke, "Internet");
  }
}); 

});
// function to grab randmly from the array

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
// console.log(array[getRndInteger(0, array.length)])


//creating a function to reuse it again
function sendMessage (message, Username){
//scop variables
let now = new Date();
let array= ["Me", "Myself", "I"];
let randomName = array[getRndInteger(0, array.length)];
let minute = now.getMinutes()
let hours = now.getHours()

//making userName internet
  if (Username){
      randomName = Username;
  }

 //making sure that things don't show back to back 
  for (let i=0; i<= array.length; ++i){

    if(i === 0 ){
     console.log("Me")
     continue;
   }  else if( i % 2 === 0  ){
           console.log("Myself")
   }
    else if( i % 3 === 0  ){
           console.log("I")
   }
   
    }

// grab the current value and add it to the list at the top
      $("#conversation").append(
        `<li class="message">
              <a class='delete' href='#'>Delete</a>
              <h3 class="author">${randomName}</h3>
              <p class="message-body">${message}</p>
              <span class="timestamp">${hours}:${minute}</span>
        </li>`  )   


  // remove the old message I wrote after msg has been appended   
  $("#new-message-body").val("");

}


// press x to delete
$("#conversation").on("click", ".delete", function() {
  $(this).parent().remove(); 
});

// when pressing enter send message
// when message is sent set the vaule to empty (calling the function that does that inside)
  $(document).on('keypress', function(event){
      if (event.keyCode === 13) {
          sendMessage($("#new-message-body").val());
      }
  });

})



// end of document ready



