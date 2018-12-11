jsPlumb.ready(function () {

    var instance = jsPlumb.getInstance({
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        PaintStyle: { stroke: '#666' },
        EndpointHoverStyle: { fill: "orange" },
        HoverPaintStyle: { stroke: "orange" },
        EndpointStyle: { width: 20, height: 16, stroke: '#666' },
        Endpoint: "Rectangle",
        Anchors: ["TopCenter", "TopCenter"],
        Container: "canvas"
    });

    jsPlumb.draggable("circle");
    jsPlumb.draggable("circle2");
    jsPlumb.connect({
        source:"circle",
        target:"circle2",
        endpoint:"Blank"
    });
});