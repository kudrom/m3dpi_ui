Battery = function(layout){
    layout.viewBox = "0 90 570 400";
    layout.size.height = layout.size.width * 0.7;
    $(layout.anchor).append('<span id="battery_display"></span>');

    Widget.call(this, layout);

    this.accessor = get_accessors(layout.accessors)[0];

    var bottle = '<path class="bottle" d="M471.108,96.392H36.27c-20,0-36.27,16.227-36.27,36.172v304.033c0,19.945,16.27,36.172,36.27,36.172h434.838c20,0,36.271-16.227,36.271-36.172V132.564C507.382,112.619,491.108,96.392,471.108,96.392z"/>';
    var lid = '<path class="bottle" d="M532.887,174.891c0,0-1.605,0-3.592,0s-3.592,2.727-3.592,6.086v207.199c0,3.361,1.605,6.086,3.592,6.086h3.592c20,0,36.27-16.227,36.27-36.172V211.063C569.16,191.118,552.887,174.891,532.887,174.891z"/>';
    var bar = '<path d="M126.911,422.065c0,11.455-9.315,20.746-20.802,20.746H53.544c-11.49,0-20.802-9.291-20.802-20.746v-274.97c0-11.459,9.314-20.747,20.802-20.747h52.564c11.491,0,20.802,9.287,20.802,20.747V422.065z"/>';

    var html_text = bottle + lid;
    this.svg.html(html_text);

    var N_SEGMENTS_BATTERY = 4;

    var event_name = layout.event_names[0];
    layout.accessors = [{'type': 'index', 'start': 0, 'end': 3, 'event': event_name}]
    layout.anchor = '#battery_display';
    layout.scale = 1;
    layout.size = {'height': 100, 'width': 170};
    layout.margin.top = 5;
    layout.digits = [3];
    layout.separator = false;
    delete layout.viewBox;
    this.display = new DigitalDisplay(layout);

    this.paint = function(jdata){
        if(jdata !== null){
            var level = this.accessor(jdata);
            var thresholds = [15, 50, 75, 95];

            var data = [];
            for(var i = 0; i < N_SEGMENTS_BATTERY; i++){
                if(level >= thresholds[i])
                    data.push(true);
            }

            var bars = this.svg.selectAll('.bar').data(data)
            bars.exit().remove();
            bars.enter()
                .append('g')
                    .attr('class', 'bar')
                    .html(bar)
                    .attr('transform', function(d, i){
                         return 'translate(' + i*115 + ')';
                    });

            this.svg.selectAll('.bottle').classed('lit', true);

            var data_display = [];
            if(level == 100){
                data_display [1, 0, 0];
            }else{
                data_display.push(0);
                data_display.push(Math.floor(level / 10));
                data_display.push(Math.floor(level % 10));
            }

            var event_source = Object.keys(jdata)[0];
            var jdata_display = {};
            jdata_display[event_source] = data_display;

            this.display.paint(jdata_display);
        }
    };

    this.clear_framebuffers = function(){
        this.svg.selectAll('.bottle').classed('lit', false);
        this.svg.selectAll('.bar').remove();
        this.display.clear_framebuffers()
    }
}

lupulo_controller.register_widget("battery", Battery);
