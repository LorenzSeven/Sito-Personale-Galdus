$(document).ready(function() { 

	//cambia il tema
	$("#cambiaTemaid").click(function() {
		const themeValue = $('html').attr('data-theme');
	    if (themeValue == "light") //notte
	    {
	        $('html').attr('data-theme', "dark");
			$("#testocambiaTema").animate({width: "0px", height: "0px"})
			setTimeout(function() {$("#testocambiaTema").animate({width: "200px", height: "40px"})}, 100);
			setTimeout(function() {$("#testocambiaTema").text('Notte');}, 300);
	    }
	    else if (themeValue == "dark")//giorno
	    {
	        $('html').attr('data-theme', "light");
			$("#testocambiaTema").animate({width: "0px", height: "0px"})
			setTimeout(function() {$("#testocambiaTema").animate({width: "200px", height: "40px"})}, 100);
			setTimeout(function() {$("#testocambiaTema").text('Giorno');}, 300);
	    }
	});

	spuntaFattoCapitolo = []; //lista capitoli con spunta
	spuntaFattoParagrafo = []; //lista paragrafi con spunta

    var trasformateInPulsanti = false;
	//clicco sul pulsante trasforma
    $(".trasforma").click(function() {
		var numCapitoli = $('ul').length //totale capitoli
		var numParagrafi = $('li.paragrafo').length; //totale paragrafi
		var contenutoParagrafo = [];
		for (var i = 0; i < numParagrafi; i++) 
		{
			contenutoParagrafo[i] = $("ul:eq(" + i + ")").html(); //prendo il contenuto di tutti gli ul
		}

		// Trasforma le liste in pulsanti
        if (!trasformateInPulsanti) 
		{
			$(this).text("Chiudi editor spunte")   //Cambia il testo del pulsante
			$('.editor').prop("disabled", true); //disattiva il pulsante .editor

			for (var i = 0; i < numParagrafi; i++) 
			{
				testoParagrafo = $("li.paragrafo:eq(" + i + ")").text();
				paragrafoPulsante = '<li class="paragrafo"><button type="button" class="pulsanteParagrafo btn btn-primary">' + testoParagrafo + '</button></li>'
				$("div.contenitoreParagrafo:eq(" + i + ")").html(paragrafoPulsante);
			}
			$("li.paragrafo").unwrap(); //toglie il div genitore contenitoreParagrafo	

			// var numCapitoli = $('ul').length //totale capitoli
			elementoAggiunto = [];
			for (var i = 0; i < numCapitoli; i++)
			{
				elementoAggiunto[i] = false; //all'inizio 
			}
			//aggiungo la spunta sul pulsante paragrafo
			$("button.pulsanteParagrafo").click(function() {
				$(this).toggleClass("fatto"); //aggiunge e toglie la classe fatto al tag li.paragrafo button

				//spunta sul capitolo
				var totaleCapitoli = $('ul').length //totale capitoli
				var totalePulsanti = [];
				var pulsantiConClasseFatto = []; 
				for(var i = 0; i < totaleCapitoli; i++)
				{
      				totalePulsanti[i] = $('ul:eq(' + i + ')').find('button.pulsanteParagrafo').length; //totale pulsanti nel capitolo i
      				pulsantiConClasseFatto[i] = $('ul:eq(' + i + ')').find('button.pulsanteParagrafo.fatto').length; //totale pulsanti che hanno la spunta nel capitolo i

					//se il totale dei pulsanti è uguale al totale dei pulsanti che hanno la classe fatto 
      				if (totalePulsanti[i] == pulsantiConClasseFatto[i])
					{
						if (elementoAggiunto[i] == false && totalePulsanti[i] > 0) //se la lista[i] è falso e se il totale dei pulsanti è maggiore di 0
						{
							if (!$('p.capitolo:eq(' + i + ')').next().is("iconaspunta")) //se l'iconaspunta non c'è vicino al capitolo
							{
								var iconaSpunta = $("<iconaSpunta id='icona" + i +"'></iconaSpunta>"); /*tag iconaSpunta con il suo id*/
								$('p.capitolo:eq(' + i + ')').after(iconaSpunta);   /*aggiungo il tag iconaSpunta a fianco del capitolo*/

								//aggiunge il contenuto al tag iconaSpunta
								var svgContent = '<div class="check-container"><div class="check-background"><svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 25L27.3077 44L58.5 7" stroke="white" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" /></svg></div></div>';
   								$('iconaSpunta#icona' + i).html(svgContent);
								elementoAggiunto[i] = true;		
								
								spuntaFattoCapitolo[i] = "fatto";
							}
						}
					}
					else //altrimenti
					{
						// Seleziona l'elemento adiacente e rimuovilo
						$('p.capitolo:eq(' + i + ')').next("iconaSpunta").remove();
						elementoAggiunto[i] = false;

						spuntaFattoCapitolo[i] = "noFatto";
					}
				}
			});

			trasformateInPulsanti = true;

			for(var i = 0; i < numParagrafi; i++)
			{
				if (spuntaFattoParagrafo[i] == "fatto")
				{
					$("button.pulsanteParagrafo:eq(" + i + ")").addClass("fatto");
				}
				else
				{
					$("button.pulsanteParagrafo:eq(" + i + ")").removeClass("fatto");
				}
			}
		}
		// Trasforma i pulsanti in liste
		else
		{
			$(this).text("Apri editor spunte")	//Cambia il testo del pulsante
			$(".editor").prop("disabled", false); //abilita il pulsante editor

			for(var i = 0; i < numParagrafi; i++)
			{
				if ($('button.pulsanteParagrafo:eq(' + i + ')').hasClass("fatto"))
				{
					spuntaFattoParagrafo[i] = "fatto"; //Il paragrafo ha la spunta
				}
				else
				{
					spuntaFattoParagrafo[i] = "noFatto"; //Il paragrafo non ha la spunta
				}
			}
			
			for (var i = 0; i < numParagrafi; i++) 
			{
				testoPulsante = $("button.pulsanteParagrafo:eq(" + i + ")").text();
				paragrafoLista = `
				<div class="contenitoreParagrafo">
					<button title = "Modifica testo Paragrafo" class = "pulsanteModificaParagrafo btn btn-primary">
						<img src = "img/matitaModifica.png" class = "paragrafoMatita">
					</button>
					<button title = "Conferma modifica" class = "pulsanteConfermaModificaParagrafo btn btn-primary">
						<img src = "img/SpuntaVerde.png" class = "paragrafoConferma">
					</button>
						<li class="paragrafo">`+ testoPulsante + `</li>
					<button title = "Rimuovi Paragrafo"  class = "pulsanteRimuoviParagrafo btn btn-primary">
						<img src = "img/Segno-meno-rosso.png" class = "paragrafoMeno">
					</button>
				</div>`
				$("button.pulsanteParagrafo:eq(" + i + ")").html(paragrafoLista);
			}
			//unwrap toglie l'elemento superiore dell'elemento div.contenitoreParagrafo
			//due volte perchè ci sono due elementi genitori del div.contenitoreParagrafo
			$("div.contenitoreParagrafo").unwrap(); 
			$("div.contenitoreParagrafo").unwrap();

			$(".pulsanteAggiungiParagrafo").hide(); //nascondi
			$(".pulsanteRimuoviParagrafo").hide();	//nascondi
			$(".pulsanteModificaParagrafo").hide();	//nascondi
			$(".pulsanteConfermaModificaParagrafo").hide();	//nascondi

			trasformateInPulsanti = false;

			//aggiungo e rimuovo la classe fatto in base ai valori della lista spuntaFattoParagrafo
			for(var i = 0; i < numParagrafi; i++)
			{
				if (spuntaFattoParagrafo[i] == "fatto")
				{
					$("li.paragrafo:eq(" + i + ")").addClass("fatto");
				}
				else
				{
					$("li.paragrafo:eq(" + i + ")").removeClass("fatto");
				}
			}
			
		}


	});



//----------------------------------------------------------------------------------------------------------------------------

    $("#contenitore").append('<div class = "contenitoreTitolo"></div>');	
	$("#contenitore").append('<div class = "contenitoreCapitoli"><div>');

	$(".contenitoreTitolo").append(`
	<table>
    	<tr>
        	<td class="colonna1">
				<button title = 'Modifica testo indice' class = 'pulsanteModifica btn btn-primary'><img src = 'img/matitaModifica.png' class = 'matita'></button>
        		<button title = 'Conferma Modifica' class = 'pulsanteConfermaModifica btn btn-primary'><img src = 'img/SpuntaVerde.png' class = 'conferma'></button>
			</td>
        	<td class="colonna2">
            	<h1 class = "titolo" title = ""><em>Indice</em></h1>
        	</td>
        	<td class="colonna3">
				<button title = 'Ripristina Avviso Elimina Capitolo' class = 'pulsanteAvvisoEliminaCapitolo btn btn-primary'><img src = 'img/AvvisoElimina.png' class = 'avviso'></button>
				<button title = 'Ripristina Avviso Elimina Paragrafo' class = 'pulsanteAvvisoEliminaParagrafo btn btn-primary'><img src = 'img/AvvisoElimina.png' class = 'avviso2'></button>
        	</td>
    	</tr>
	</table>`);
	$(".contenitoreCapitoli").append(`<!-- Modal -->
	<div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
	  <div class="modal-dialog">
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title" id="staticBackdropLabel">Attenzione!</h5>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			  <span aria-hidden="true">&times;</span>
			</button>
		  </div>
		  <div class="modal-body">
		  	<p>Sei sicuro di voler eliminare il capitolo?</p>
		  	<label><input type="checkbox" id="nonMostrarePiu"> Non visualizzare più questo avviso</label>
		  </div>
		  <div class="modal-footer">
			<button type="button" class="confermaEliminaCapitolo btn btn-secondary">Si</button>
			<button type="button" class="EsciDalModal btn btn-primary"  data-dismiss="modal">No</button>
		  </div>
		</div>
	  </div>
	</div>
	<div class="modal fade" id="staticBackdrop2" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel2" aria-hidden="true">
	<div class="modal-dialog">
	  <div class="modal-content">
		<div class="modal-header">
		  <h5 class="modal-title" id="staticBackdropLabel2">Attenzione!</h5>
		  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		  </button>
		</div>
		<div class="modal-body">
			<p>Sei sicuro di voler eliminare il paragrafo?</p>
			<label><input type="checkbox" id="nonMostrarePiu2"> Non visualizzare più questo avviso</label>
		</div>
		<div class="modal-footer">
		  <button type="button" class="confermaEliminaParagrafo btn btn-secondary">Si</button>
		  <button type="button" class="EsciDalModalParagrafo btn btn-primary"  data-dismiss="modal">No</button>
		</div>
	  </div>
	</div>
  </div>
	`)

	//Al caricamento della pagina
	$(".contenitoreCapitoli ").append("<button title = 'Aggiungi Capitolo'  class = 'pulsanteAggiungiCapitolo btn btn-primary'><img src = 'img/Segno-piu-verde.png' class = 'segnoPiu'></button>");
	$(".pulsanteAggiungiCapitolo").hide();
	$(".pulsanteModifica").hide();
	$(".pulsanteConfermaModifica").hide();
	$(".pulsanteAvvisoEliminaCapitolo").hide();
	$(".pulsanteAvvisoEliminaParagrafo").hide();

	editorAperto = false;
    $('.editor').click(function(){
        if (editorAperto == false)
        {
			$(this).text("Chiudi editor capitoli")
			$("hr").show();
			$(".trasforma").prop("disabled", true); //disabilita il pulsnte trasforma

			//Capitolo
			$(".pulsanteAggiungiCapitolo").show();
			$(".pulsanteRimuoviCapitolo").show();
			$(".pulsanteModificaCapitolo").show();	
			$(".pulsanteAvvisoEliminaCapitolo").hide();

			//Paragrafo
			$(".pulsanteAggiungiParagrafo").show();
			$(".pulsanteRimuoviParagrafo").show();
			$(".pulsanteModificaParagrafo").show();
			$(".pulsanteAvvisoEliminaParagrafo").hide();

			//indice h1
			$(".pulsanteModifica").show();
			$(".pulsanteConfermaModifica").hide();

			//se clicco il pulsante modifica h1
			$(".pulsanteModifica").click(function(){

				var valoreTitolo = $("h1").text();   //prendo il testo che c'è in h1
				var inputTitolo = $('<input type="text" class = "inputh1">').val(valoreTitolo); // Crea un input con il valore dell'h1
				$("h1").replaceWith(inputTitolo);  //lo sostituisce all'h1
        		// Focalizza sull'input
        		inputTitolo.focus();

				$(this).hide();
				$(".pulsanteConfermaModifica").show();
				disattivaPulsanti();
			});

			//se clicco il pulsante conferma modifica h1
			$(".pulsanteConfermaModifica").click(function(){
				var valoreInput = $(".inputh1").val();
				var nuovoTitolo = $('<h1 title=""><em>' + valoreInput + '</em></h1>'); // Crea un nuovo h1 con il valore dell'input
				$(".inputh1").replaceWith(nuovoTitolo);	// Sostituisci l'input con il nuovo h1
				nuovoTitolo.focus();					// Focalizza sull'h1

				$(this).hide();
				$(".pulsanteModifica").show();
				attivaPulsanti();
			});
            editorAperto = true;         
        }
        else
        {
            $(this).text("Apri editor capitoli")
			
			//indice h1
			$(".pulsanteModifica").hide();
			$(".pulsanteConfermaModifica").hide();

			//Capitolo
			$(".pulsanteAggiungiCapitolo").hide();
			$(".pulsanteRimuoviCapitolo").hide();
			$(".pulsanteModificaCapitolo").hide();
			$(".pulsanteAvvisoEliminaCapitolo").hide();

			//Paragrafo
			$(".pulsanteAggiungiParagrafo").hide();
			$(".pulsanteRimuoviParagrafo").hide();
			$(".pulsanteModificaParagrafo").hide();
			$(".pulsanteAvvisoEliminaParagrafo").hide();

			$("hr").hide();
			$(".trasforma").prop("disabled", false); //disabilita il pulsnte trasforma
            editorAperto = false;  
        }


    });

//---------------------------------------------------------Editor Capitoli-------------------------------------------------------

	var indiceCapitolo = 0;
	var indiceUltimoParagrafo = 0;
	var totaleParagafi = 0;

	/*Aggiungi Capitolo*/
	$("#contenitore").on("click", ".pulsanteAggiungiCapitolo", function(){
		$(".pulsanteAggiungiCapitolo").before(`
		<div class="contenitoreCapitolo">
			<button title = "Modifica testo Capitolo" class = "pulsanteModificaCapitolo btn btn-primary">
				<img src = "img/matitaModifica.png" class = "matita">
			</button>
			<button title = "Conferma modifica" class = "pulsanteConfermaModificaCapitolo btn btn-primary">
				<img src = "img/SpuntaVerde.png" class = "conferma">
			</button>
			<div class = "contenitoreCapFatto"><p class="capitolo">Testo Capitolo</p></div>
			<button title = "Rimuovi Capitolo"  class = "pulsanteRimuoviCapitolo btn btn-primary">
				<img src = "img/Segno-meno-rosso.png" class = "segnoMeno">
			</button>
		</div>
		<ul></ul>
			<button title = 'Aggiungi Paragrafo'  class = 'pulsanteAggiungiParagrafo btn btn-primary'>
				<img src = 'img/Segno-piu-verde.png' class = 'paragrafoPiu'>
			</button>
		<hr color="black">`);

		$(".pulsanteModificaCapitolo").show();
		$(".pulsanteConfermaModificaCapitolo").hide();	
	
		/*Rimuovi Capitolo*/
		$("#contenitore").on("click", ".pulsanteRimuoviCapitolo", function(){
			EliminaCapitolo = $(this); //memorizzo il pulsante pulsanteRimuoviCapitolo

			// Seleziona il div con classe .pulsanteRimuoviCapitolo
			var elementoLista = $(this).parent();
		
			// Trova l'indice  del div con classe .pulsanteRimuoviCapitolo
			indiceCapitolo = $(".contenitoreCapitolo").index(elementoLista);

			//Prendo l'indice dell'ultimo paragrafo e il numero totale dei paragrafi del Capitolo rimosso
			//------------------------------------------------------------------------
			var ultimoParagrafo = $(this).parent().next().children("div").first();
			
			indiceUltimoParagrafo = $("div.contenitoreParagrafo").index(ultimoParagrafo);

			totaleParagafi = $(this).parent().next().children("div").length;
			//------------------------------------------------------------------------
	
			//se il pulsante rimuoviAvviso non si vede
			if (!$(".pulsanteAvvisoEliminaCapitolo").is(":visible")) 
			{
			    //console.log("Il pulsante non è visibile");// Il pulsante non è visibile
				$("#staticBackdrop").modal("show");	//mostra il modal

				//se clicco su Si
				$(".confermaEliminaCapitolo").click(function(){
					//Attenzione, l'ordine è importante, il capitolo lo si elimina per ultimo, altrimenti
					//se viene eliminato prima, gli altri elementi non saranno eliminati,
					//perchè non c'è più l'elemento di riferimento
					EliminaCapitolo.parent().next().next().next().remove(); //rimuove il separatore <hr> tra i capitoli
					EliminaCapitolo.parent().next().remove().remove(); //rimuove il pulsante aggiungi paragrafo	
					EliminaCapitolo.parent().next().remove(); //rimuove l'elenco paragrafi del capitolo rimosso			
					EliminaCapitolo.parent().remove(); //rimuove il capitolo
					$("#staticBackdrop").modal("hide");

					// Se il checkbox è selezionato
					if ($("#nonMostrarePiu").is(":checked")) 
					{
						$(".pulsanteAvvisoEliminaCapitolo").show();
					}
					else //Altrimenti
					{
						$(".pulsanteAvvisoEliminaCapitolo").hide();
					}	
				});	

				//se clicco No
				$(".EsciDalModal").click(function(){
					// Controlla se il checkbox è selezionato
					if ($("#nonMostrarePiu").is(":checked")) {$(".pulsanteAvvisoEliminaCapitolo").show();} // Il checkbox è selezionato
					else {$(".pulsanteAvvisoEliminaCapitolo").hide();}	// Il checkbox non è selezionato
				});		
			} 
			//altrimenti mi elimini direttamente il capitolo senza mostrarmi il modal
			else if ($(".pulsanteAvvisoEliminaCapitolo").is(":visible"))
			{
				// spuntaFattoCapitolo.splice(indiceCapitolo, 1);//rimuovo la posizione del capitolo
				// console.log(spuntaFattoCapitolo);
			    //console.log("Il pulsante è visibile");// Il pulsante è visibile
				EliminaCapitolo.parent().next().next().next().remove(); //rimuove il separatore <hr> tra i capitoli
				EliminaCapitolo.parent().next().remove().remove(); //rimuove il pulsante aggiungi paragrafo	
				EliminaCapitolo.parent().next().remove(); //rimuove l'elenco paragrafi del capitolo rimosso			
				EliminaCapitolo.parent().remove(); //rimuove il capitolo
			}
		});		

		$(".pulsanteAvvisoEliminaCapitolo").click(function(){
			$("#nonMostrarePiu").prop("checked", false);// Deseleziona la casella di controllo
			$(this).hide();
		});	
	});	



	//Aggiungi nuovo elemento nella lista spuntaFattoCapitolo
	$("#contenitore").on("click", ".pulsanteAggiungiCapitolo", function(){
		spuntaFattoCapitolo.push("noFatto");	//aggiungo la posizione del capitolo	
	});	

	//Elimina elemento dalla lista spuntaFattoCapitolo con avviso
	$("#contenitore").on("click", ".confermaEliminaCapitolo", function(){
		spuntaFattoCapitolo.splice(indiceCapitolo, 1);//rimuovo la posizione del capitolo	

		//quando si cancella un capitolo si cancellano anche tutti i paragrafi di quel capitolo
		spuntaFattoParagrafo.splice(indiceUltimoParagrafo, totaleParagafi);
	});	

	//Elimina elemento dalla lista spuntaFattoCapitolo senza avviso
	$("#contenitore").on("click", ".pulsanteRimuoviCapitolo", function(){
		// Seleziona il div con classe .pulsanteRimuoviCapitolo
		var elementoLista = $(this).parent();
		
		// Trova l'indice  del div con classe .pulsanteRimuoviCapitolo
		indiceCapitolo = $(".contenitoreCapitolo").index(elementoLista); 

		//Prendo l'indice dell'ultimo paragrafo e il numero totale dei paragrafi del Capitolo rimosso
		//------------------------------------------------------------------------
		var ultimoParagrafo = $(this).parent().next().children("div").first();

		indiceUltimoParagrafo = $("div.contenitoreParagrafo").index(ultimoParagrafo);
		totaleParagafi = $(this).parent().next().children("div").length;
		//------------------------------------------------------------------------

		if ($(".pulsanteAvvisoEliminaCapitolo").is(":visible"))
		{			
			spuntaFattoCapitolo.splice(indiceCapitolo, 1);//rimuovo la posizione del capitolo
			spuntaFattoParagrafo.splice(indiceUltimoParagrafo, totaleParagafi);
		}
	});	


	//Modifica del Capitolo
	$("#contenitore").on("click", ".pulsanteModificaCapitolo", function(){
		var testoCapitolo = $(this).next().next().children().text();
		var inputTitolo = $('<input type="text" class = "inputCapitolo">').val(testoCapitolo);
		$(this).next().next().replaceWith(inputTitolo);  
		inputTitolo.focus();	
	
		$(this).hide();
		$(this).next().show();
	
		disattivaPulsanti();
	});
	
	//Conferma della modifica del Capitolo e applicazione della lista spuntaFattoCapitolo
	$("#contenitore").on("click", ".pulsanteConfermaModificaCapitolo", function(){
		var valoreInput = $(this).next().val();
		var nuovoTitolo = $('<div class = "contenitoreCapFatto"><p class="capitolo">' + valoreInput + '</p><div>');
		$(this).next().replaceWith(nuovoTitolo);	
		nuovoTitolo.focus();					
	
		$(this).hide();
		$(this).prev().show();
	
		attivaPulsanti();
		var numCapitoli = $('ul').length //totale capitoli

		//aggiungo e rimuovo la spunta dal capitolo in base ai valori della lista spuntaFattoCapitolo
		for(var i = 0; i < numCapitoli; i++)
		{
			if (spuntaFattoCapitolo[i] == "fatto")
			{
				if (!$('p.capitolo:eq(' + i + ')').next().is("iconaspunta")) //se l'iconaspunta non c'è vicino al capitolo
				{
					var iconaSpunta = $("<iconaSpunta id='icona" + i +"'></iconaSpunta>"); /*tag iconaSpunta con il suo id*/
					$('p.capitolo:eq(' + i + ')').after(iconaSpunta);   /*aggiungo il tag iconaSpunta a fianco del capitolo*/
					
					//aggiunge il contenuto al tag iconaSpunta
					var svgContent = '<div class="check-container"><div class="check-background"><svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 25L27.3077 44L58.5 7" stroke="white" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" /></svg></div></div>';
					$('iconaSpunta#icona' + i).html(svgContent);
				}					
			}
		}
		console.log(spuntaFattoCapitolo);
	});

//------------------------------------------------Editor Paragrafi----------------------------------------------------

	var indiceParagrafo = 0;
	var elementoDiv = 0;
	var numeroParagrafi = 0;
	var indiceCapitoloNoSpunta = 0;
	var totaleParagrafi = 0;
	var totaleParagrafiFatto = 0;
	var elementoDivContenitoreCapitolo = 0;
	// var paragrafoEliminato = 0;
	
	/*Aggiungi Paragrafo*/
	$("#contenitore").on("click", ".pulsanteAggiungiParagrafo", function(){
		$(this).prev().append(`
		<div class="contenitoreParagrafo">
			<button title = "Modifica testo Paragrafo" class = "pulsanteModificaParagrafo btn btn-primary">
				<img src = "img/matitaModifica.png" class = "paragrafoMatita">
			</button>
			<button title = "Conferma modifica" class = "pulsanteConfermaModificaParagrafo btn btn-primary">
				<img src = "img/SpuntaVerde.png" class = "paragrafoConferma">
			</button>
				<li class="paragrafo">Testo Paragrafo</li>
			<button title = "Rimuovi Paragrafo"  class = "pulsanteRimuoviParagrafo btn btn-primary">
				<img src = "img/Segno-meno-rosso.png" class = "paragrafoMeno">
			</button>
		</div>`);

		$(".pulsanteModificaParagrafo").show();
		$(".pulsanteConfermaModificaParagrafo").hide();		

		$("#contenitore").on("click", ".pulsanteRimuoviParagrafo", function(){
			EliminaParagrafo = $(this); //memorizzo il pulsante pulsanteRimuoviParagrafo
			// Seleziona l'ultimo elemento div della lista che sta vicino al pulsante con classe .pulsanteAggiungiParagrafo
			var elementoLista = $(this).parent();
			elementoDiv = $(this).parent().parent().prev().children("div.contenitoreCapFatto").children("iconaspunta");
			numeroParagrafi =  $(this).parent().parent().children("div.contenitoreParagrafo")

			// Trova l'indice dell'ultimo elemento della lista rispetto a tutti gli elementi ul div delle liste
			indiceParagrafo = $("ul div").index(elementoLista);

			//indice del capitolo a cui si toglie la spunta perchè non ha più paragrafi
			//--------------------------------------------------------------------------
			var capitolo = $(this).parent().parent().prev();
		
			// Trova l'indice  del div con classe .pulsanteRimuoviCapitolo
			indiceCapitoloNoSpunta = $("div.contenitoreCapitolo").index(capitolo);
			//---------------------------------------------------------------------------
			
			//totale dei paragrafi che hanno la spunta e il totale di quelli che non ce l'hanno
			//--------------------------------------------------------------------------
			totaleParagrafi = $(this).parent().parent().find("li.paragrafo").length;
			totaleParagrafiFatto = $(this).parent().parent().find("li.paragrafo.fatto").length;
			totaleParagrafi = totaleParagrafi - 1;
			if ($(this).prev().hasClass("fatto"))
			{
				totaleParagrafiFatto = totaleParagrafiFatto - 1;
				// console.log("togli fatto");
			}			

			elementoDivContenitoreCapitolo = $(this).parent().parent().prev().children("div.contenitoreCapFatto").children("p.capitolo");
			//---------------------------------------------------------------------------

			//se il pulsante rimuoviAvviso non si vede
			if (!$(".pulsanteAvvisoEliminaParagrafo").is(":visible")) 
			{
				// console.log("Il pulsante non è visibile");// Il pulsante non è visibile
				$("#staticBackdrop2").modal("show");	//mostra il modal		

				//se clicco su Si
				$(".confermaEliminaParagrafo").click(function(){	
					// console.log(rimozioneParagrafo);
					EliminaParagrafo.parent().remove(); //rimuove il paragrafo
					$("#staticBackdrop2").modal("hide");

					// Controlla se il checkbox è selezionato
					if ($("#nonMostrarePiu2").is(":checked")) {$(".pulsanteAvvisoEliminaParagrafo").show();} // Il checkbox è selezionato
					else {$(".pulsanteAvvisoEliminaParagrafo").hide();}	// Il checkbox non è selezionato
				});	
			
				//se clicco No
				$(".EsciDalModalParagrafo").click(function(){
					// Se il checkbox è selezionato
					if ($("#nonMostrarePiu2").is(":checked")) 
					{
						$(".pulsanteAvvisoEliminaParagrafo").show();
					} 
					else //altrimenti
					{
						$(".pulsanteAvvisoEliminaParagrafo").hide();
					}	
				});		
			} 
			//altrimenti mi elimini direttamente il capitolo senza mostrarmi il modal
			else if ($(".pulsanteAvvisoEliminaParagrafo").is(":visible"))
			{
				EliminaParagrafo.parent().remove(); //rimuove il paragrafo
			}
		});
		$(".pulsanteAvvisoEliminaParagrafo").click(function(){
			$("#nonMostrarePiu2").prop("checked", false);// Deseleziona la casella di controllo
			$(this).hide();
		});	
	});	


	//Aggiungi nuovo elemento nella lista spuntaFattoParagrafo
	$("#contenitore").on("click", ".pulsanteAggiungiParagrafo", function(){
		// Seleziona l'ultimo elemento div della lista che sta vicino al pulsante con classe .pulsanteAggiungiParagrafo
		var ultimoElementoLista = $(this).prev().children("div").last();

		// Trova l'indice dell'ultimo elemento della lista rispetto a tutti gli elementi ul div delle liste
		var indiceAggiungiParagrafo = $("ul div").index(ultimoElementoLista);

		spuntaFattoParagrafo.splice(indiceAggiungiParagrafo, 0, "noFatto");//aggiungo lo stato del nuovo paragrafo

		//se aggiungo un paragrafo e c'è la spunta nel capitolo, la spunta deve essere rimossa,
		//poichè non tutti i paragrafi hanno la classe fatto

		var capitolo = $(this).prev().prev();
		
		// Trova l'indice  del div con classe .pulsanteRimuoviCapitolo
		indiceCapitoloNoSpunta = $("div.contenitoreCapitolo").index(capitolo);

		elementoDiv = $(this).prev().prev().children("div.contenitoreCapFatto").children("iconaspunta");
		if (elementoDiv.length > 0)
		{
			elementoDiv.remove();
			spuntaFattoCapitolo[indiceCapitoloNoSpunta] = "noFatto";
			console.log(spuntaFattoCapitolo);
		}

	});	

	//Elimina elemento dalla lista spuntaFattoParagrafo con avviso
	$("#contenitore").on("click", ".confermaEliminaParagrafo", function(){
		spuntaFattoParagrafo.splice(indiceParagrafo, 1);//rimuovo la posizione del paragrafo

		//se il capitolo non ha più paragrafi ed ha ancora la spunta, togli la spunta dal capitolo.
		//numeroParagrafi.length == 1 perchè quando sono in fase di eliminazione del paragrafo
		//rimango ancora con un paragrafo rimanente, dopo l'eliminazione il totale dei paragrafi sarà 0
		if (elementoDiv.length > 0 && numeroParagrafi.length == 1)
		{
			elementoDiv.remove();
			spuntaFattoCapitolo[indiceCapitoloNoSpunta] = "noFatto";
			// console.log(indiceCapitoloNoSpunta);
			// console.log(spuntaFattoCapitolo);
		}

		//Se elimino un paragrafo senza spunta e il capitolo rimane con gli altri paragrafi spuntati, 
		//il capitolo deve avere la spunta.
		//se il totale dei paragrafi di quelli che hanno la spunta e di quelli che non ce l'hanno coicide,
		//se il capitolo non ha la spunta
		//se i paragrafi ci sono effettivamente, cioè hanno una lunghezza maggiore di 0

		console.log(totaleParagrafi);
		console.log(totaleParagrafiFatto);

		//dato che tolgo un paragrafo, dopo che l'ho tolto, sottraggo 1 al totaleParagrafi,
		//poichè il totaleParagrafi si riferisce prima dell'evento rimuovi paragrafo.
	  	//se il totale dei paragrafi dopo l'eliminazione è uguale al totale dei pulsanti che hanno la classe fatto.
		//se il totaleParagrafi è maggiore di zero.
		if (totaleParagrafi == totaleParagrafiFatto && elementoDiv.length == 0 && totaleParagrafi > 0)
	  	{
			// console.log("spunta con successo");
			var iconaSpunta = $('<iconaSpunta><div class="check-container"><div class="check-background"><svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 25L27.3077 44L58.5 7" stroke="white" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" /></svg></div></div></iconaSpunta>');
			elementoDivContenitoreCapitolo.after(iconaSpunta); /*aggiungo il tag iconaSpunta a fianco del capitolo*/
			spuntaFattoCapitolo[indiceCapitoloNoSpunta] = "fatto";
		}	
		console.log(spuntaFattoCapitolo);
	});	

	//Elimina elemento dalla lista spuntaFattoParagrafo senza avviso
	$("#contenitore").on("click", ".pulsanteRimuoviParagrafo", function(){
		// Seleziona il parente del pulsante con classe .pulsanteRimuoviParagrafo
		var elementoLista = $(this).parent();
		
		// Trova l'indice del parente del pulsante con classe .pulsanteRimuoviParagrafo rispetto a tutti gli elementi ul div delle liste
		indiceParagrafo = $("ul div").index(elementoLista);

		//indice del capitolo a cui si toglie la spunta perchè non ha più paragrafi
		//------------------------------------------------------------------------
		elementoDiv = $(this).parent().parent().prev().children("div.contenitoreCapFatto").children("iconaspunta");
		numeroParagrafi =  $(this).parent().parent().children("div.contenitoreParagrafo");
		var capitolo = $(this).parent().parent().prev();
		
		// Trova l'indice  del div con classe .pulsanteRimuoviCapitolo
		indiceCapitoloNoSpunta = $("div.contenitoreCapitolo").index(capitolo);
		//------------------------------------------------------------------------

		//totale dei paragrafi che hanno la spunta e il totale di quelli che non ce l'hanno
		//--------------------------------------------------------------------------
		totaleParagrafi = $(this).parent().parent().find("li.paragrafo").length;
		totaleParagrafiFatto = $(this).parent().parent().find("li.paragrafo.fatto").length;
		elementoDivContenitoreCapitolo = $(this).parent().parent().prev().children("div.contenitoreCapFatto").children("p.capitolo");
		totaleParagrafi = totaleParagrafi - 1;
		if ($(this).prev().hasClass("fatto"))
		{
			totaleParagrafiFatto = totaleParagrafiFatto - 1;
			// console.log("togli fatto");
		}	
		//---------------------------------------------------------------------------

		if ($(".pulsanteAvvisoEliminaParagrafo").is(":visible"))
		{	
			spuntaFattoParagrafo.splice(indiceParagrafo, 1);//rimuovo la posizione del paragrafo
			// console.log(spuntaFattoParagrafo);	
			if (elementoDiv.length > 0 && numeroParagrafi.length == 1)
			{
				elementoDiv.remove();
				spuntaFattoCapitolo[indiceCapitoloNoSpunta] = "noFatto";
			}
			//Se elimino un paragrafo senza spunta e il capitolo rimane con gli altri paragrafi spuntati, 
			//il capitolo deve avere la spunta.
			//se il totale dei paragrafi di quelli che hanno la spunta e di quelli che non ce l'hanno coicide,
			//se il capitolo non ha la spunta
			//se i paragrafi ci sono effettivamente, cioè hanno una lunghezza maggiore di 0

			console.log(totaleParagrafi);
			console.log(totaleParagrafiFatto);

			//dato che tolgo un paragrafo, dopo che l'ho tolto, sottraggo 1 al totaleParagrafi,
			//poichè il totaleParagrafi si riferisce prima dell'evento rimuovi paragrafo.
	  		//se il totale dei paragrafi dopo l'eliminazione è uguale al totale dei pulsanti che hanno la classe fatto.
			//se il totaleParagrafi è maggiore di zero.
			if ((totaleParagrafi) == totaleParagrafiFatto && elementoDiv.length == 0 && totaleParagrafi > 0)
	  		{
				// console.log("spunta con successo");
				var iconaSpunta = $('<iconaSpunta><div class="check-container"><div class="check-background"><svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 25L27.3077 44L58.5 7" stroke="white" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" /></svg></div></div></iconaSpunta>'); /*tag iconaSpunta con il suo id*/ 
				elementoDivContenitoreCapitolo.after(iconaSpunta); /*aggiungo il tag iconaSpunta a fianco del capitolo*/
				spuntaFattoCapitolo[indiceCapitoloNoSpunta] = "fatto";
			}	
			console.log(spuntaFattoCapitolo);
		}
	});	


	//Modifica del Paragrafo
	$("#contenitore").on("click", ".pulsanteModificaParagrafo", function(){
		var testoCapitolo = $(this).next().next().text();
		var inputTitolo = $('<input type="text" class = "inputParagrafo">').val(testoCapitolo);
		$(this).next().next().replaceWith(inputTitolo);  
		inputTitolo.focus();	
	
		$(this).hide();
		$(this).next().show();
	
		disattivaPulsanti();
	});
	
	//Conferma della modifica del Paragrafo e applicazione della lista spuntaFattoParagrafo
	$("#contenitore").on("click", ".pulsanteConfermaModificaParagrafo", function(){
		var valoreInput = $(this).next().val();
		var nuovoTitolo = $('<li class="paragrafo">' + valoreInput + '</li>');
		$(this).next().replaceWith(nuovoTitolo);	
		nuovoTitolo.focus();					
	
		$(this).hide();
		$(this).prev().show();
	
		attivaPulsanti();
		// console.log(indiceParagrafo);
		// console.log(spuntaFattoParagrafo);
		var numParagrafi = $('li.paragrafo').length;
		for(var i = 0; i < numParagrafi; i++)
		{
			if (spuntaFattoParagrafo[i] == "fatto")
			{
				$("li.paragrafo:eq(" + i + ")").addClass("fatto");
			}
			else
			{
				$("li.paragrafo:eq(" + i + ")").removeClass("fatto");
			}
		}

	});

//-------------------------------------------------------------------------------------------------

});

function disattivaPulsanti()
{
	$(".pulsanteAggiungiParagrafo").prop("disabled", true);
	$(".pulsanteModificaParagrafo").prop("disabled", true);
	$(".pulsanteRimuoviParagrafo").prop("disabled", true);
	$(".pulsanteAvvisoEliminaCapitolo").prop("disabled", true);
	$(".pulsanteAvvisoEliminaParagrafo").prop("disabled", true);
	$(".pulsanteModifica").prop("disabled", true);
	$(".pulsanteModificaCapitolo").prop("disabled", true);
	$(".pulsanteAggiungiCapitolo").prop("disabled", true);
	$(".pulsanteRimuoviCapitolo").prop("disabled", true);
	$('.editor').prop("disabled", true);
}
function attivaPulsanti()
{
	$(".pulsanteAggiungiParagrafo").prop("disabled", false);
	$(".pulsanteModificaParagrafo").prop("disabled", false);
	$(".pulsanteRimuoviParagrafo").prop("disabled", false);
	$(".pulsanteAvvisoEliminaCapitolo").prop("disabled", false);
	$(".pulsanteAvvisoEliminaParagrafo").prop("disabled", false);
	$(".pulsanteModifica").prop("disabled", false);
	$(".pulsanteModificaCapitolo").prop("disabled", false);
	$(".pulsanteAggiungiCapitolo").prop("disabled", false);
	$(".pulsanteRimuoviCapitolo").prop("disabled", false);
	$('.editor').prop("disabled", false);
}