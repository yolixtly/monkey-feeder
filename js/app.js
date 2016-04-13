"use strict"; 
$(document).ready(function() {
  


  function modalBox(){
      $("#how").click(function() {
      $("#modal").show();
    });

    $("#gotIt").click(function() {
     $("#modal").hide();
    });
  };

  modalBox();
});