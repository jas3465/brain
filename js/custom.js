function initialize() {
  $("#editor")
  .append("<div id='circle'>test</div>");

  $("#circle")
  .addClass("circle");

};

$( "#location" ).click(function() {
  $("#editor")
  .append("<div id='circle3'>Location</div>");

  $("#circle3")
  .addClass("circle3");

  jsPlumb.draggable("circle3");
});