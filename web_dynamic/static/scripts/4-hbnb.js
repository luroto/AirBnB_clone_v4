$(document).ready(function () {
  const lista = [];
  let nombres = [];
  $('input[type="checkbox"]').click(function () {
    if ($(this).prop('checked') === true) {
      lista.push($(this).attr('data-id'));
      nombres.push($(this).attr('data-name'));
    } else if ($(this).prop('checked') === false) {
      lista.splice($.inArray($(this).attr('data-id'), lista), 1);
      nombres.splice($.inArray($(this).attr('data-name'),nombres), 1);
      }
    $(".locations h4").text(nombres);
  });
  let jqxhr = $.get( "http://localhost:5003/api/v1/status/", function() {
    $("DIV#api_status").addClass("available");
  })
  .fail(function() {
    $("DIV#api_status").removeClass("available");
  })
  const url = "http://localhost:5003/api/v1/places_search/";
  $.ajax({
          type : "GET",
          url : url,
          contentType : "application/json",
          success : function(data) {
             $.each(data, function(key, value) {
                 
                 $('.places').append('<article><div class="title"><h2>' + value.name + '</h2></div><div class="information"></div><div class="description' + value.id + '"></div></article>'); 
                 for (iter in value.tasks){
                    $('.places .description' + value.id).append('<h1>' + value.tasks[iter].description + '</h1><h2>' + value.tasks[iter].state +'</h2>')
                 }
              });
            },
          error : function(error) {
          },
        });
  $("#b1").click(function() {
      $(".places article").remove();
      $.ajax({
              type : "POST",
              url : "http://localhost:5003/api/v1/places_search/",
              contentType: "application/json",
              data : JSON.stringify({users: lista}),
              success : function(data) {
                $.each(data, function(key, value) {
                 
                 $('.places').append('<article><div class="title"><h2>' + value.name + '</h2></div><div class="information"></div><div class="description' + value.id + '"></div></article>'); 
                 for (iter in value.tasks){
                    $('.places .description' + value.id).append('<h1>' + value.tasks[iter].description + '</h1><h2>' + value.tasks[iter].state +'</h2>')
                 }
 
                });
            },
      });
              
});

$(".close").click(function() {
    $("#myModal").hide();
});
 
 $("#b5").click(function() {
     $(".modal-content .tform").remove();
      $.ajax({
              type : "POST",
              url : "http://localhost:5003/api/v1/places_search/",
              contentType: "application/json",
              data : JSON.stringify({users: lista}),
              success : function(data) {
                $.each(data, function(key, value) {            
                      $(".modal-content").append('<div class="tform">Name<br><input type="text" name="name" value=' + value.name + ' id="text' + value.id + '"><br><br></div>')
                });
            },
      });
    $("#myModal").show();
    $("#b6").show();
 });


  $('#b6').click(function () {
      $(".places article").remove();
      $(".locations h4").text('');
      for (iter in lista){
      $.ajax({
              type : "PUT",
              url : "http://localhost:5003/api/v1/users/" + lista[iter],
              contentType: "application/json",
              data : JSON.stringify({"name": document.getElementById("text" + lista[iter]).value}),
              success : function(data) {
                $.each(data, function(key, value) {
                 $('.places').append('<article><div class="title"><h2>' + value.name + '</h2></div><div class="information"></div><div class="description' + value.id + '"></div></article>'); 
                 for (iter in value.tasks){
                    $('.places .description' + value.id).append('<h1>' + value.tasks[iter].description + '</h1><h2>' + value.tasks[iter].state +'</h2>')
                 }
 
                });
            },
      });
      } 
    $("#myModal").hide();
    $("#b6").hide();

  });
$("#b2").click(function() {
      $(".places article").remove();
      $(".locations h4").text('');
      nombres = []
      for (iter in lista){
      $.ajax({
              type : "DELETE",
              url : "http://localhost:5003/api/v1/users/" + lista[iter],
              success : function(data) {
                $.each(data, function(key, value) {
                 $(".container .filters ." + lista[iter]).remove()                 
                 $(".container .filters .popover ." + lista[iter]).remove()                 
                 $('.places').append('<article><div class="title"><h2>' + value.name + '</h2></div><div class="information"></div><div class="description' + value.id + '"></div></article>'); 
                 for (iter in value.tasks){
                    $('.places .description' + value.id).append('<h1>' + value.tasks[iter].description + '</h1><h2>' + value.tasks[iter].state +'</h2>')
                 }
 
                });
            },
      });
      }      
});
});