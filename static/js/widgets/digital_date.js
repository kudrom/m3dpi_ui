DigitalDate = function(layout){
    this.clock_accessor = get_accessors(layout.accessors)[0];

    // Cook the layout for the DigitalDisplay widget
    var event_name = layout.event_names[0];
    layout.accessors = [{'type': 'index', 'start': 0, 'end': 8, 'event': event_name}];
    layout.digits = [2, 2, 4];
    layout.separator = false;
    DigitalDisplay.call(this, layout);

    this.old_paint = this.paint;
    this.old_clear = this.clear_framebuffers;

    this.paint = function(jdata){
        if(jdata !== null){
            var date = this.clock_accessor(jdata);

            var date_obj = new Date(date*1000);
            var day = date_obj.getDate();
            var month = date_obj.getMonth() + 1;
            var year = date_obj.getFullYear().toString().split("").map((x) => parseInt(x));

            var data_display = [day / 10 | 0, day % 10,
                                month / 10 | 0, month % 10]
            data_display = data_display.concat(year);
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

lupulo_controller.register_widget("digital_date", DigitalDate);
