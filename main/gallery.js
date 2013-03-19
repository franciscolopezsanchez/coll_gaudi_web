function Album(name,pictures){
  this.name = name;
  this.pictures = pictures;	
}

var album1 = new Album("album1",["a.jpg","b.jpg","c.jpg","d.jpg","e.jpg","f.jpg","g.jpg"]);
var album2 = new Album("album2",["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"]);
// 	Constant definition
const albums = [album1,
				album2];
const source = "img";

// General variables
// Current album name
var currentAlbum;
var currentPicture;
var nextPicture;
var previousPicture;
var currentAlbumLength;


// Initialize variables
$(document).ready(function() {
	// Show by default first album
	currentAlbum = albums[0].name;
	// Show by default first picture of the album
	currentPicture = albums[0].pictures[0];	
	nextPicture = getNextPicture(currentAlbum,currentPicture);
	previousPicture = getPreviousPicture(currentAlbum,currentPicture);
	currentAlbumLength = albums[0].pictures.length;
	// Create album
	createAlbum(currentAlbum);
	// Show first picture of album created
	showPicture(currentAlbum,currentPicture);
});

// Preload the next picture 
/* $(window).load(function() {
     console.log('[load] - llamada a loadPicture');
	 loadPicture();
}); */

// Return next picture(name) to show
function getNextPicture(album,picture){
	var posAlbum = getAlbumIndex(album);
	if(posAlbum == -1){
		console.log('album not found');
	}
	var album = albums[posAlbum].pictures;
	var pos = jQuery.inArray(picture,album);
	if (pos >= album.length - 1){
		pos = 0;
	}else{
		pos++;
	}
	return albums[posAlbum].pictures[pos];
}

// Return previous picture to show
function getPreviousPicture(album,picture){
	var posAlbum = getAlbumIndex(album);
	if(posAlbum == -1){
		console.log('album not found');
	}
	var album = albums[posAlbum].pictures;
	var tam = album.length;
	var pos = jQuery.inArray(picture,album);
	if (pos == 0){
		pos = tam - 1;
	}else{
		pos--;
	}
	return albums[posAlbum].pictures[pos];
}

// Return album index
function getAlbumIndex(albumName){
	var posAlbum = -1;
	for(i = 0 ; i < albums.length ; i++){
		if(albums[i].name == albumName){
			posAlbum = i;
		}
	}
	return posAlbum;
}

// Return position of the picture in the album
function getPictureIndex(album,picture){
	var posAlbum = getAlbumIndex(album);
	var albumAux = albums[posAlbum].pictures;
	var posPicture = -1;
	for(i = 0 ; i < albumAux.length ; i++){
		if(albumAux[i] == picture){
			posPicture = i;
		}
	}
	return posPicture;
}

// Gallery navigation controls
$(function() {
	// Next image button control
	$('#next-img').click(function () {
		nextPictureFunc();
	});

	//Previous image button control
	$('#previous-img').click(function () {
		previousPictureFunc();
	});
});

	// Next picture key control
	$(document).keydown(function(e){
		if (e.keyCode == 39) { 
		   nextPictureFunc();
		}
	});

	// Previous picture key control
	$(document).keydown(function(e){
		if (e.keyCode == 37) { 
		   previousPictureFunc();
		}
	});
	
// Next picture function
function nextPictureFunc(){
	showPicture(currentAlbum,getNextPicture(currentAlbum,currentPicture));
	hideCurrentPicture();
	console.log('[nextPictureFunc] - llamada a loadPicture');
	loadPicture();
	
	// actualize variables
	previousPicture = currentPicture;		
	currentPicture = getNextPicture(currentAlbum,currentPicture);		
	nextPicture = getNextPicture(currentAlbum,currentPicture);	
}

// Previous picture function
function previousPictureFunc(){
	showPicture(currentAlbum,getPreviousPicture(currentAlbum,currentPicture));
	hideCurrentPicture();		
	console.log('[previousPictureFunc] - llamada a loadPicture');
	loadPicture();
	// actualize variables
	nextPicture = currentPicture;
	currentPicture = getPreviousPicture(currentAlbum,currentPicture);
	previousPicture = getPreviousPicture(currentAlbum,currentPicture);
}

// Show picture given (It is suppose this picture and its albums was created before)
function showPicture(album,picture){	
	$('#'+ album + ' img').each(function () {
		var id = $(this).attr('id');
		if(id == picture){
			$(this).removeClass('hidden').addClass('visible');			
		}
	});
}

// Hide current picture from the gallery
function hideCurrentPicture(){
	$('#'+ currentAlbum + ' img').each(function () {
		var id = $(this).attr('id');
		if(id == currentPicture){
			$(this).removeClass('visible').addClass('hidden');
		}
	});
}

// Load the next picture
function loadPicture(){	
	var toLoad1 = getNextPicture(currentAlbum,getNextPicture(currentAlbum,currentPicture));
	var toLoad2 = getPreviousPicture(currentAlbum,getPreviousPicture(currentAlbum,currentPicture));

	$('#' + currentAlbum + ' img').each(function () {
		var src = $(this).attr('src');
		var id = $(this).attr('id');
		if((id == toLoad1 || id == toLoad2 ) && typeof(src) == 'undefined' && src == null){
			console.log('picture: ' + id + ' preloaded');
			$(this).attr('src', source + "/" + currentAlbum + "/" + id);
		}
	});			
}

// Create html code neccesary to show an album
function createAlbum(album){
	var albumIndex = getAlbumIndex(album);
	// Create html of new album
	$('#img-container').append('<div class="album" id="'+album+'"></div>');
	for(i = 0 ; i < currentAlbumLength ; i++){
		$('#'+album).append('<div class="imagen"><img id="'+albums[albumIndex].pictures[i]+'" class="hidden" alt="'+albums[albumIndex].pictures[i]+'"/></div>');
	}
	// Load first picture of album
	var id = $('#' + album).children().first().children().first().attr('id');
	$('#' + album).children().first().children().first().attr('src',source+"/"+ album + "/" + id);
	// Preload next and previous pictures
	var toLoad1 = getNextPicture(currentAlbum,currentPicture);
	var toLoad2 = getPreviousPicture(currentAlbum,currentPicture);

	$('#' + currentAlbum + ' img').each(function () {
		var src = $(this).attr('src');
		var id = $(this).attr('id');
		if((id == toLoad1 || id == toLoad2 ) && typeof(src) == 'undefined' && src == null){
			console.log('picture: ' + id + ' preloaded');
			$(this).attr('src', source + "/" + currentAlbum + "/" + id);
		}
	});	
}