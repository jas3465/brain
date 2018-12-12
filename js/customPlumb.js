jsPlumb.ready(function () {

    var instance = jsPlumb.getInstance({
        PaintStyle:{ 
            strokeWidth:6, 
            stroke:"#567567", 
            outlineStroke:"black", 
            outlineWidth:1 
          },
          Connector:[ "Bezier", { curviness: 30 } ],
          Endpoint:[ "Dot", { radius:5 } ],
          EndpointStyle : { fill: "#567567"  },
          Anchor : [ 0.5, 0.5, 1, 1 ]
    });

    jsPlumb.draggable("circle");
    jsPlumb.draggable("circle2");
    jsPlumb.connect({
        source:"circle",
        target:"circle2",
        endpoint:"Blank"
    });
});