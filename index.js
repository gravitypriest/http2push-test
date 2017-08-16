var source = new EventSource('/pshuu');

source.onmessage = function(e) {
    document.getElementById('increment').innerHTML = e.data;
};