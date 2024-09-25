//Inizio contenitore che contiene tutti i metodi, che appare e scompare
var inizioDiv = document.getElementById("vediNonvedi");
inizioDiv.style.display = "none"; 

var inizioNascondi = document.getElementById("nascondi");
inizioNascondi.style.display = "none";
var inizioMostra = document.getElementById("mostra");
inizioMostra.style.display = "block";

function vediTesto()
{
    var vediNonvedi = document.getElementById("vediNonvedi");
    var mostra = document.getElementById("mostra");
    var nascondi = document.getElementById("nascondi");

    //funziona solo con la condizione style.display === "none" ed else,
    //altrimenti se ci metto anche la condizione style.display === "block"
    //non funziona.
    
    if (vediNonvedi.style.display === "none") 
    {
        vediNonvedi.style.display = "block";      
        mostra.style.display = "none";
        nascondi.style.display = "block";
    }
    else
    {
        vediNonvedi.style.display = "none";  
        mostra.style.display = "block";
        nascondi.style.display = "none";
    }
}