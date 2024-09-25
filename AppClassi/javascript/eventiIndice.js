//Inizio Freccia che mi porta all'inizio della gina
var InizioFrecciaSopra = document.getElementById("frecciaSopraId");
if (document.documentElement.scrollTop > 100)
{
    InizioFrecciaSopra.style.display = "block";
}
else if (document.documentElement.scrollTop <= 100)
{
    InizioFrecciaSopra.style.display = "none";
}

function apparizioneFreccia()
{
    var frecciaSopra = document.getElementById("frecciaSopraId");
    if (document.documentElement.scrollTop > 100)
    {
        frecciaSopra.style.display = "block";
    }
    else if (document.documentElement.scrollTop <= 100)
    {
        frecciaSopra.style.display = "none";
    }
}
window.onscroll = function() {apparizioneFreccia()};