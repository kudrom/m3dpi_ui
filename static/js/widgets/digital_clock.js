DigitalClock = function(layout){
    this.clock_accessor = get_accessors(layout.accessors)[0];

    // Cook the layout for the DigitalDisplay widget
    var event_name = layout.event_names[0];
    layout.accessors = [{'type': 'index', 'start': 0, 'end': 6, 'event': event_name}];
    layout.group_size = 2;
    layout.total = 6;
    layout.separator = true;
    DigitalDisplay.call(this, layout);

    this.old_paint = this.paint;
    this.old_clear = this.clear_framebuffers;

    this.paint = function(jdata){
        if(jdata !== null){
            var date = this.clock_accessor(jdata);

            var date_obj = new Date(date*1000);
            var hours = date_obj.getHours();
            var minutes = date_obj.getMinutes();
            var seconds = date_obj.getSeconds();

            var data_display = [hours / 10 | 0, hours % 10,
                                minutes / 10 | 0, minutes % 10,
                                seconds / 10 | 0, seconds % 10];
            var event_source = Object.keys(jdata)[0];

            var jdata_display = {};
            jdata_display[event_source] = data_display;
            this.old_paint(jdata_display);
        }
    };

    this.clear_framebuffers = function(){
        this.old_clear();
    };
};

lupulo_controller.register_widget("digital_clock", DigitalClock);
