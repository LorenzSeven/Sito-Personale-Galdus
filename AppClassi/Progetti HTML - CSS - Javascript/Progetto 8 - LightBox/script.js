var overlay = $('<div id = "overlay"></div>'); //posso anche scrivere <div id = "overlay"> senza chiudere il div, lo chiude da solo
var img = $('<img class = "immagine">');
var descrizioneImg = $('<h6 class = "titolo"></h6>');

$("#gallery a").click(function(event){
    event.preventDefault();     //toglie il comportamento di default, va in un'altra finestra in questo caso
    $("body").append(overlay);  //aggiunge il div overlay al body
    $("#overlay").show();       //seleziono l'elemento con id overlay e lo mostro
    var ImgHref = $(this).attr("href"); //il this si riferisce al tag a di riferimento, e vado ad prendere il suo attributo href
    var testoImmagine = $(this).children("p").text();  //prendi il testo dall'elemento figlio che contiene il tag p

    $("#overlay").append(img);    //Aggiungi immagine al div con id overlay
    $(".immagine").attr("src", ImgHref);    //inserisci nella proprietà src il percorso immagine 
    $(".immagine").attr("title", "titoloImmagine"); //inserisci nella proprietà title provaTitle

    $("#overlay").append(descrizioneImg);    //aggiungi titolo h6 all'elemento overlay
    $(".titolo").text(testoImmagine)    //aggiungi il testo testoImmagine

    $("#overlay").click(function(){    //al click dell'elemento overlay
        $(this).hide();                //nascondi l'elemento stesso
    });
});










