(function(){
    function onKeyDown(event){
        var request = new XMLHttpRequest();
        switch(event.keyCode){
            case W:
                request.open('GET', '/move?forward=1', false);
                request.send(null);
                break;
            case A:
                request.open('GET', '/move?left=1', false);
                request.send(null);
                break;
            case S:
                request.open('GET', '/move?backward=1', false);
                request.send(null);
                break;
            case D:
                request.open('GET', '/move?right=1', false);
                request.send(null);
                break;
            case SPACE:
                request.open('GET', '/move?stop=1', false);
                request.send(null);
                event.preventDefault();
                break;
        }
    };

    var W = 87,
        A = 65,
        S = 83,
        D = 68,
        SPACE = 32;

    document.body.addEventListener('keydown', onKeyDown, true);

    // Reset the robot speed of the robot for every new web page
    var request = new XMLHttpRequest();
    request.open('GET', '/move?stop=1', false);
    request.send(null);
})();
