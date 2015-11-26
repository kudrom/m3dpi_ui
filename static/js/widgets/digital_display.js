DigitalDisplay = function(layout){
    validate_requirements(['scale', 'digits', 'separator'], layout);

    Widget.call(this, layout);

    this.accessors = get_accessors(layout.accessors);

    var digit_paths = `
<path d="M10,8L14,4L42,4L46,8L42,12L14,12L10,8z"/>
<path d="M8,10L12,14L12,42L8,46L4,42L4,14L8,10z"/>
<path d="M48,10L52,14L52,42L48,46L44,42L44,14L48,10z"/>
<path d="M10,48L14,44L42,44L46,48L42,52L14,52L10,48z"/>
<path d="M8,50L12,54L12,82L8,86L4,82L4,54L8,50z"/>
<path d="M48,50L52,54L52,82L48,86L44,82L44,54L48,50z"/>
<path d="M10,88L14,84L42,84L46,88L42,92L14,92L10,88z"/>`;

    var separator_circles = `
<circle r="4" cx="0" cy="28"/>
<circle r="4" cx="0" cy="68"/>`;

    var gap = 12 * layout.scale;
    var html_text = '<g transform="translate(' + gap + ') ' +
                                  'scale(' + layout.scale + ')">';
    var number_size = 50;
    var separators_amount = 0;
    var previous_digits = 0;
    var total_groups = layout.digits.length;
    for(var i = 0; i < total_groups; i++){
        var translation_amount = (number_size*previous_digits) + separators_amount;
        html_text += '<g transform=translate(' + translation_amount + ')>';
        for(var ii = 0; ii < layout.digits[i]; ii++){
            var n = ii * number_size;
            html_text += '<g class="digit" transform="skewX(0) ' +
                                                     'translate(' + n + ')">';
            html_text += digit_paths;
            html_text += '</g>';
        }
        html_text += '</g>';
        previous_digits += ii;

        if((i + 1) < total_groups){
            separators_amount += 20;
            if(layout.separator){
                var tr = (number_size*previous_digits) + separators_amount - 8;
                html_text += '<g class="separator" transform=translate(' + tr + ')>';
                html_text += separator_circles;
                html_text += '</g>'
            }
        }
    }
    html_text += '</g>'

    this.svg.html(html_text);

    this.digit = this.svg.selectAll(".digit");
    this.separators = this.svg.selectAll(".separator circle");
    this.digitPattern = [
      [1,0,1,1,0,1,1,1,1,1],
      [1,0,0,0,1,1,1,0,1,1],
      [1,1,1,1,1,0,0,1,1,1],
      [0,0,1,1,1,1,1,0,1,1],
      [1,0,1,0,0,0,1,0,1,0],
      [1,1,0,1,1,1,1,1,1,1],
      [1,0,1,1,0,1,1,0,1,1]
    ];
    
    this.paint = function(jdata){
        if(jdata !== null){
            var digitPattern = this.digitPattern;

            var data = [];
            for(var i = 0; i < this.accessors.length; i++){
                data.push(this.accessors[i](jdata));
            }

            this.digit = this.digit.data(data);
            this.digit.select("path:nth-child(1)")
                     .classed("lit", function(d) { return digitPattern[0][d]; });
            this.digit.select("path:nth-child(2)")
                     .classed("lit", function(d) { return digitPattern[1][d]; });
            this.digit.select("path:nth-child(3)")
                     .classed("lit", function(d) { return digitPattern[2][d]; });
            this.digit.select("path:nth-child(4)")
                     .classed("lit", function(d) { return digitPattern[3][d]; });
            this.digit.select("path:nth-child(5)")
                     .classed("lit", function(d) { return digitPattern[4][d]; });
            this.digit.select("path:nth-child(6)")
                     .classed("lit", function(d) { return digitPattern[5][d]; });
            this.digit.select("path:nth-child(7)")
                     .classed("lit", function(d) { return digitPattern[6][d]; });

            this.separators.classed("lit", 1);
        }
    };

    this.clear_framebuffers = function(){
        this.digit.selectAll("path").classed("lit", 0);
        this.separators.classed("lit", 0);
    };
};

lupulo_controller.register_widget("digital_display", DigitalDisplay);
