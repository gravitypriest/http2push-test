var source = new EventSource('/pshuu');

source.onmessage = function(e) {
    jQuery.get(e.data).then(res => {
        document.getElementById('increment').innerHTML = JSON.parse(res).test;
    });
};