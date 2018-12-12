jsPlumb.ready(function () {

    var instance = jsPlumb.getInstance();

    jsPlumb.draggable("circle");
    jsPlumb.draggable("circle2");
    jsPlumb.connect({
        source:"circle",
        target:"circle2",
        endpoint:"Blank"
    });
});