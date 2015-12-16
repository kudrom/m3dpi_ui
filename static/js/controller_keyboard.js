(function(){
    // Send the http request plus update the drawing of the key
    function moveRobot(key, direction){
        $('.key').removeClass('pressed');
        var id_key = '#key-' + key;
        $(id_key).addClass('pressed');

        var url = '/move?' + direction + '=1';
        var request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.send(null);
    };

    // Callback for the keyboard event keyDown
    function onKeyDown(event){
        if(event.keyCode === SPACE){
            moveRobot('space', 'stop');
            event.preventDefault();
        }else if(event.shiftKey){
            switch(event.keyCode){
                case W:
                    moveRobot('w', 'accelerate');
                    break;
                case A:
                    moveRobot('a', 'left-acc');
                    break;
                case S:
                    moveRobot('s', 'decelerate');
                    break;
                case D:
                    moveRobot('d', 'right-acc');
                    break;
            }
            $('#key-shift').addClass('pressed');
        }else{
            switch(event.keyCode){
                case W:
                    moveRobot('w', 'forward');
                    break;
                case A:
                    moveRobot('a', 'left');
                    break;
                case S:
                    moveRobot('s', 'backward');
                    break;
                case D:
                    moveRobot('d', 'right');
                    break;
            }
        }
    };

    // Constants for the keycodes of those keys
    var W = 87,
        A = 65,
        S = 83,
        D = 68,
        SPACE = 32;

    // Bind the keyboard events
    document.body.addEventListener('keydown', onKeyDown);
    document.body.addEventListener('keyup', function(event){
        $('.key').removeClass('pressed');
        if(event.shiftKey){
            $('#key-shift').addClass('pressed');
        }
    });

    // Bind the mouse events
    var commands = {'w': 'forward', 's': 'backward', 'a': 'left', 'd': 'right',
                    'space': 'stop'};
    var commands_shift = {'W': 'accelerate', 'S': 'decelerate', 'A': 'left-acc',
                          'D': 'right-acc', 'SPACE': 'stop'};
    for(var key in commands){
        var id_key = 'key-' + key;

        document.getElementById(id_key).addEventListener('mousedown', function(event){
            var key = event.target.id.split('-')[1];
            if(event.shiftKey){
                moveRobot(key, commands_shift[key.toUpperCase()]);
                $('#key-shift').addClass('pressed');
            }else{
                moveRobot(key, commands[key]);
            }
        });
        document.getElementById(id_key).addEventListener('mouseup', function(){
            $('.key').removeClass('pressed');
            if(event.shiftKey){
                $('#key-shift').addClass('pressed');
            }
        });
    }

    // Reset the robot speed of the robot for every new web page
    var request = new XMLHttpRequest();
    request.open('GET', '/move?stop=1', false);
    request.send(null);
})();
