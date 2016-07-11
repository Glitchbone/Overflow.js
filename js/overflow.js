;(function() {

    var elements = [];

    function viewportWidth() {
        return document.body.clientWidth;
    }

    function getNumericStyleValue(el, prop) {
        return parseFloat(getComputedStyle(el).getPropertyValue(prop).match(/\d+/));
    }

    function initialize() {
        update();
        window.addEventListener('resize', updateSizes);
    }

    function update() {
        elements = document.querySelectorAll('[data-overflow]');
        updateSizes();
    }

    function updateSizes() {

        [].forEach.call(elements, function(el, i) {

            var parent = el.parentElement;
            var targetWidth = getNumericStyleValue(el, 'max-width') || viewportWidth();
            var parentWidth = parent.offsetWidth;
            var parentPaddingLeft = getNumericStyleValue(parent, 'padding-left');

            el.style.width = Math.min(targetWidth, viewportWidth()) + 'px';

            if (viewportWidth() <= targetWidth) {
                el.style.marginLeft = -(parent.offsetLeft + parentPaddingLeft) + 'px';
            } else {
                el.style.marginLeft = -((targetWidth - parentWidth) * .5 + parentPaddingLeft) + 'px';
            }

        });

    }

    initialize();

    window.Overflow = {
        update: update
    };

}());
