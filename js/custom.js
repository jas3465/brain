const colors = {
  PINK: '#F2326B',
  YELLOW: '#FDC131',
  TEAL: '#23D2BE',
  BLUE: '#178ACD'
}

function getColorClass($color) {
  switch ($color) {
    case 1:
      return colors.YELLOW;
    case 2:
      return colors.TEAL;
    case 3:
      return colors.BLUE;
    default:
      return colors.PINK;
  }
};

function initialize() {
  $("#editor")
    .append("<div id='circle'>test</div>");

  $("#circle")
    .addClass("circle");

  $("#circle").style.backgroundColor = getColorClass();

};

$("#location").click(function () {
  $("#editor")
    .append("<div id='circle3'>Location</div>");

  $("#circle3")
    .addClass("circle3");

  $("#circle3")
    .addClass("circle3");

  jsPlumb.draggable("circle3");
});