// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$(document).ready(function(){
    var href = window.location.href;
    var splitit = (href.split('#'))[1]; //split url to get sec1 name
    if(splitit !== "" || splitit !== "undefined"){
        $('html, body').animate({
            scrollTop: $('#'+splitit).offset().top
        }, 2000);
    }
});