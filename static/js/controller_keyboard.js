(function(){
    function moveRobot(key, direction){
        var id_key = '#key-' + key;
        $(id_key).addClass('pressed');

        var url = '/move?' + direction + '=1';
        var request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.send(null);
    };

    function onKeyDown(event){
        $('.key').removeClass('pressed');
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
            case SPACE:
                moveRobot('space', 'stop');
                event.preventDefault();
                break;
        }
    };

    var W = 87,
        A = 65,
        S = 83,
        D = 68,
        SPACE = 32;

    document.body.addEventListener('keydown', onKeyDown);
    document.body.addEventListener('keyup', function(){
        $('.key').removeClass('pressed');
    });

    var commands = {'w': 'forward', 's': 'backward', 'a': 'left', 'd': 'right',
                    'space': 'stop'};
    for(var key in commands){
        var id_key = 'key-' + key;

        document.getElementById(id_key).addEventListener('mousedown', function(event){
            var key = event.target.id.split('-')[1];
            moveRobot(key, commands[key]);
        });
        document.getElementById(id_key).addEventListener('mouseup', function(){
            $('.key').removeClass('pressed');
        });
    }

    // Reset the robot speed of the robot for every new web page
    var request = new XMLHttpRequest();
    request.open('GET', '/move?stop=1', false);
    request.send(null);
})();
