(function(window){
    var $progressbar = getElement("#progressbar"),
        bar = getElement(".bar");

    $progressbar.progress = 0;
    $progressbar.slideable = false;

    $progressbar.setProgress = function(val){
        if(val<0 || val>100)return;
        bar.css({width:val+"%"});
        $progressbar.progress = val;
    };

    bindEvent($progressbar, "click",function(e){
        if(!$progressbar.slideable)return;
        var x = e.offsetX;
        var width = $progressbar.offset().width;
        var progress = Math.round(x/width*100);
        $progressbar.setProgress(progress);
        $progressbar.trigger("change");
    });

    var recod = {sx:0,cx:0,width:0};
    var progressWidth = $progressbar.offset().width;
    bindEvent(bar, "touchstart",function(evt){
        if(!$progressbar.slideable)return;
        recod.sx = evt.touches[0].pageX;
        progressWidth = $progressbar.offset().width;
        recod.width = bar.offset().width;
    });
    bindEvent(bar, "touchmove",function(evt){
        if(!$progressbar.slideable)return;
        recod.cx = evt.touches[0].pageX;
        var width = recod.width + (recod.cx - recod.sx);
        var progress = Math.round(width/progressWidth*100);
        $progressbar.setProgress(progress);
        $progressbar.trigger("sliding");
    });
    bindEvent(bar, "touchend",function(){
        if(!$progressbar.slideable)return;
        var mx = recod.cx - recod.sx;
        if(Math.abs(mx)>2){
            $progressbar.trigger("change");
        }
        recod = {sx:0,cx:0,width:0};
    });

    window.$progressbar = $progressbar;
})(window);
