
var log = function() {
    console.log.apply(console, arguments)
}

var getElement = function(selector) {
    return document.querySelector(selector)
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var bindEventAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener(eventName, callback)
    }
}
