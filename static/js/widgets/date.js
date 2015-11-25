DateLine = function(layout){
    Widget.call(this, layout);

    this.accessor = get_accessors(layout.accessors)[0];
    
    this.paint = function(jdata){
        if(jdata !== null){
            var date = this.accessor(jdata);
            var date_obj = new Date(date*1000);
            var widget = this.svg.selectAll("text")
                                 .data([date_obj])
                                     .text(function(d){
                                         return d.toGMTString();})
                                 .enter()
                                     .append("text")
                                     .text(function(d){
                                         return d.toGMTString();});
        }
    };

    this.clear_framebuffers = function(){
        this.svg.selectAll("text").remove();
    };
};

lupulo_controller.register_widget("date_line", DateLine);
