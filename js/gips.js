(function ($) {
    $.fn.extend({
        gips: function (options) {
            var settings = $.extend({
                    action: 'focusin',
                    delay: 300,
                    autoHide: true,
                    pause: 300,
                    animationSpeed: 300,
                    placement: 'top',
                    theme: 'green',
                    text: '' },
                options);
            return this.each(function () {
                var actionOut = settings.action == 'focusin' ? 'focusout' : 'mouseleave';
                if(settings.text.length == 0){
                    settings.text = $(this).siblings('.gips_text').html();
                }

                var control = $(this),
                    iconDirection = 'top';
                switch(settings.placement){
                    case "top":
                        iconDirection = 'bottom';
                        break;
                    case "left":
                        iconDirection = 'right';
                        break;
                    case "right":
                        iconDirection = 'left';
                        break;
                }
                var toolTipContainer = $('<div class="gips-container"><div class="gips-body ' + settings.theme + '">' + settings.text + '' +
                        '</div><div class="gips-icon gips-icon-' + iconDirection + ' ' + settings.theme + '"></div></div>');

                control.before(toolTipContainer);
                var delay = settings.delay,
                    toolTip = toolTipContainer;
                toolTip.css({display:'none'}).find('div').css({ display: 'none', opacity: 0 });
                var toolTipBody = $('.gips-body', toolTipContainer),
                    toolTipIcon = $('.gips-icon', toolTipContainer),
                    placement = settings.placement,
                    interval;
                control.on(settings.action, function(){
                    var position = $(this).position(),
                        left = position.left,
                        top = position.top;
                    if (placement == 'top') {
                        top -= toolTip.height();
                        var iconTop = toolTip.height();
                        toolTipIcon.css('top', iconTop - toolTipIcon.outerHeight());
                    }
                    if (placement == 'bottom') {
                        top += $(this).height() + toolTipIcon.outerHeight();
                        var iconTop = toolTip.position().top;
                        toolTipIcon.css('top', -toolTipIcon.outerHeight());
                    }
                    if (placement == 'left') {
                        //triangle placement
                        left -= toolTip.outerWidth();
                        var iconLeft = toolTipBody.position().left + toolTipBody.outerWidth();
                        toolTipIcon.css('left', iconLeft);
                    }
                    if (placement == 'right') {
                        left += $(this).outerWidth();
                        //triangle placement
                        toolTipBody.css('left', toolTipIcon.outerWidth());
                        toolTipIcon.css('left', 0);
                    }
                    toolTip.css({ left: left, top: top });
                    interval = setTimeout(function () {
                        showToolTip(toolTip);
                    }, delay);
                }).on(actionOut, function () {
                    if (!settings.autoHide) {
                        clearTimeout(interval);
                    }
                });

                function showToolTip(toolTip) {
                    //toolTip.fadeIn('slow');
                    toolTip.css({ display: '' })
                        .find('div')
                        .css('display', '')
                        .stop(false, true)
                        .animate({ opacity: 1 }, settings.animationSpeed, function () {
                            if (settings.autoHide) {
                                control.on(actionOut,function(){
                                    setTimeout(function () {
                                        hideToolTip(toolTip);
                                    }, settings.pause);
                                });
                            }
                        });
                }
                function hideToolTip(toolTip) {
                    //                    toolTip.fadeOut('slow');
                    toolTip.css({ display: 'none' }).find('div').stop(false, true).animate({ opacity: 0 }, settings.animationSpeed, function () {
                        $(this).css('display', 'none');
                    });
                }

            });
        }
    });
})(jQuery);
