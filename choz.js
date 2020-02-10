choz = {};

choz.init = function(){
    jsPanel.create({
        theme:       'primary',
        headerTitle: 'my panel #1',
        position:    'center-top 0 58',
        contentSize: '450 250',
        content:     '<p>Example panel ...</p>',
        callback: function () {
            this.content.style.padding = '20px';
        },
        onbeforeclose: function () {
            return confirm('Do you really want to close the panel?');
        }
    });
}