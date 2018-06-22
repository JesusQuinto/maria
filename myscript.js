var time = 3000;
var iniciando = true;
var menssage = "Hola, mi nombre es Maria, como te llamas?";
var oldtext = "";
var suggestion 
	= "Pues contestar <strong>que puedo decir</strong>," 
	+"en cualquier momento, para aprender como interacturar con Maria";

document.getElementById('window').innerHTML = menssage;
document.getElementById('suggestion').innerHTML = suggestion;


var emotions = new Map();
emotions.set("contenta","contenta|contento");
emotions.set("feliz","feliz|felicidad|sonriente|alegre|alegria");
emotions.set("impresionada","impresionada|impresionado|asombrado");
emotions.set("incomoda","incomoda|incomodo|incomodidad|molesta|molesto");
emotions.set("pensativa","pensativa|pensativo");
emotions.set("sorprendida","sorprendida|sorprendido|sorpresa");
emotions.set("triste","triste|tristeza");

var QuestionAnswers = new Map();
QuestionAnswers.set("puedes","Quizas te gustaria ser capaz de");
QuestionAnswers.set("sueles","Si, yo suelo hacerlo");
QuestionAnswers.set("eres","Que te parece que sea");
QuestionAnswers.set("yo no","Porque tu no?");
QuestionAnswers.set("creo","Que se siente creyendo eso?");
QuestionAnswers.set("sexo","Creo que realmente deberias discutir eso con otra persona.");
QuestionAnswers.set("como","¿Cual es la respuesta que mas te agradaría ?|¿Por qué lo preguntas?|¿Le interesa eso?");
QuestionAnswers.set("quien","¿ Con que frecuencia piensas en esa persona ?");
QuestionAnswers.set("donde","¿Por qué me preguntas eso ?|¿ Por qué lo preguntas ?|¿ Le interesa esa pregunta ?|¿ Qué respuesta le complacería mas ?");
QuestionAnswers.set("no"," ¿Por qué eres tan negativo ?");
QuestionAnswers.set("puedo","Quizas no quieres ser capaz ");
QuestionAnswers.set("tu eres","Que te hace creer que soy asi?");
QuestionAnswers.set("por que tu no","Porque te lo hiciera");
QuestionAnswers.set("por que no puedo","Que te hace creer que no deberías poder hacerlo");
QuestionAnswers.set("tu eres","Por qué te interesa si soy o no");
QuestionAnswers.set("no puedo","Como sabes que no puedes");
QuestionAnswers.set("estoy","Cuanto tiempo has estado asi");
QuestionAnswers.set("yo soy","Por qué me dices que eres asi?");
QuestionAnswers.set("quiero","Por qué quieres eso?");
QuestionAnswers.set("que","¿Tu que crees?","¿Por que lo preguntas?");
QuestionAnswers.set("cuando","¿Qué diria tu mejor amigo a esa pregunta?");
QuestionAnswers.set("por que","¿Qué es lo que realmente quieres saber?");
QuestionAnswers.set("quizas","No pareces estar muy seguro!");
QuestionAnswers.set("beber","La moderación debe presidir todos tus actos.");
QuestionAnswers.set("sueño","¿Por qué has sacado el tema de los sueños?");
QuestionAnswers.set("me gusta","Es bueno que te guste");
QuestionAnswers.set("tus","Por que te preocupas");
QuestionAnswers.set("siempre","¿puedes pensar en un caso concreto?");
QuestionAnswers.set("pienso","¿acaso tienes dudas?");
QuestionAnswers.set("si","¿Por qué pareces tan seguro?");
QuestionAnswers.set("amigo","¿Por qué menciobas el tema de la amistad?");
QuestionAnswers.set("computadora","¿Por que mencionas a mi familia , las computadoras?");
QuestionAnswers.set("yo soy","En verdad tu eres");


var restart 
	= [
		"detener", 
		"stop", 
		"pause", 
		"reiniciar", 
		"parar"
	];

var answerNule 
	= [
		"Escriba algo, porque los blancos no me dicen nada.",
		"Hasta luego, fue muy grato charlar contigo... chao.",
		"Como no quieres hablar conmigo me despido.",
		"Por favor no repita la misma frase."
	];

var wordsHelp 
	= [
		"que puedo decir", 
		"Que puedo decir", 
		"ayuda", 
		"Ayuda"
	];

function validate(text){
	if (text == "" || text == oldtext) {
		menssage = answerNule[Math.floor(Math.random()*answerNule.length)];
		return true;
	}
	return false;
}

function changeColor(emotion){
	if (emotion == "feliz") document.body.style.backgroundColor = "yellow";
	else document.body.style.backgroundColor = "gray";

	setTimeout(function(){document.body.style.backgroundColor = "lightblue";}, time);
}

function changeMusic(emotion){
	if(emotion == "feliz") document.getElementById('audioSource').src ="musica/alegre.mp3";
	else document.getElementById('audioSource').src ="musica/triste.mp3";
	
	document.getElementById('audio').load();
	document.getElementById('audio').play();
	
	setTimeout(function(){document.getElementById('audio').pause();}, time);
}

function searchEmotion(text)
{
	for (var [key, value] of emotions)
	{
		if(text.search(value) != -1)
		{
			document.getElementById("wrapperEmotion").className = key;
			setTimeout(function(){document.getElementById("wrapperEmotion").className = "contenta"}, time);

			if (key == "feliz" || key == "triste") 
			{
				if (confirm("Quieres poner un ambiente mas " + key + " ?"))
				{
					changeColor(key);
					changeMusic(key);
				}
			}
		}
	}
}

function reboot(text){
	restart.forEach(function(item)
	{
		if(text.search(item) != -1)
		{
			document.getElementById('audio').pause();
			document.getElementById("wrapperEmotion").className = "contenta";
			document.body.style.backgroundColor = "lightblue";
			return true;
		}
	});	
	return false;
}

function help(text){
	wordsHelp.forEach(function(word)
	{
		if(text.search(word) != -1){
			if (confirm("Necesitas Ayuda ")){
				document.getElementById("help").style.display = "block";
				document.getElementById("dialog").style.display = "none";
				return true;
			}
		}
	});	
	return false;
}

function answerResponse(text){

	document.getElementById("wrapperEmotion").className = "pensativa";
	setTimeout(function(){document.getElementById("wrapperEmotion").className = "contenta"}, time);

	if (confirm("No estoy segura de entenderte, Quieres que busque en internet al respecto?"))
	{
		menssage = "como te fue?, Aprendiste algo nuevo?";
		var win = window.open("https://www.google.co.ve/search?q="+text, '_blank');
  		win.focus();

  		setTimeout(function(){
		if(confirm("como te fue?, Aprendiste algo nuevo?")){
			document.getElementById('window').innerHTML = "Que bien!";
			
			document.getElementById("wrapperEmotion").className = "impresionada";
			setTimeout(function(){
				document.getElementById("wrapperEmotion").className = "contenta";
				document.getElementById('window').innerHTML ="Dime!";
			}, time);
		}
	}, time);
	}
}

function searchQuestion(text){
	for (var [key, value] of QuestionAnswers){
		if(text.search(key) != -1)
		{
			var pieces = value.split("|");
			var anw;
			
			anw = pieces[Math.floor(Math.random() *pieces.length)];
			menssage = anw;
			
			return true;
		}
	}
	return false;
}

function update() {
	var inputText = document.getElementById('text').value;
	

	if(iniciando){
		menssage = "Hola, "+ inputText + ", cuentame algo?";
		document.getElementById('window').innerHTML = menssage;
		document.getElementById('text').value='' ;
		iniciando = false;
	}
	else{
		if(validate(inputText));
		else if(reboot(inputText));
		else if(help(inputText));
		else if(searchEmotion(inputText));
		else if(searchQuestion(inputText));
		else answerResponse(inputText);
		
		oldtext = inputText;
		document.getElementById('window').innerHTML = menssage;
		document.getElementById('text').value='' ;
	}
}

function done() {
	document.getElementById("help").style.display = "none";
	document.getElementById("dialog").style.display = "block";
}
