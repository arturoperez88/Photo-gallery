//created all varibles needed with dtached elments using JQuery
//varibles needed for the overlay, images and caption
var $overlay = $('<div id="overlay"></div>');
var $image = $('<img id="lbImage">');
var $caption = $('<p></p>');


// Varibles Needed for the arrows and to filter thru the images
var $btnPrev = $('<button id="btnPrev"> < </button>');
var $btnNext = $('<button id="btnNext"> > </button>');
var $btnExit = $('<button id="btnExit"> X </button>');
var index = 0;

// appended overlay to the body, and and detached elaments to overaly
$("body").append($overlay)
$($overlay).append($image)
$($overlay).append($caption)
$($overlay).append($btnPrev)
$($overlay).append($btnNext)
$($overlay).append($btnExit)

//1. capture the click event on a link to an image 

$("#imageGallery a").click(function(event) {

	//This prevents the link from going to its defult location.
	event.preventDefault();

  //This allows the overlay to show when you click on a photo 
	$overlay.fadeIn(1000);

	//This gets the href value from the images that get clicked on. and i added a new varible to it, to distnguish it, in the next step.
	var $imageLocation = $(this).attr("href");

// this updates overlay with the image that was clicked. It adds the href from the <a> to the detached <img>  src atribute.
	$image.attr("src", $imageLocation);

// This gets childes data-title
	var imgCaption = $(this).children("img").attr("data-title");
  // This adds the text from the data-title 
	$caption.text(imgCaption);

  $currentImg = $(this).children("img");

});

//////////////////////////////// BUTTON NEX AND PREV FUNCTION//////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//Display next image
var next = function(e) {
  $imgLocation = $currentImg.parents("li").next().children("a").attr("href");
  $image.attr("src", $imgLocation);
  imgCaption = $currentImg.parents("li").next().children("a").children("img").attr("data-title");
  $caption.text(imgCaption);
  $overlay.show();
  $currentImg = $currentImg.parents("li").next().children("a").children("img");
};

//Display previous image
var prev = function() {
  $imgLocation = $currentImg.parents("li").prev().children("a").attr("href");
  $image.attr("src", $imgLocation);
  imgCaption = $currentImg.parents("li").prev().children("a").children("img").attr("data-title");
  $caption.text(imgCaption);
  $overlay.show();
  $currentImg = $currentImg.parents("li").prev().children("a").children("img");
};

//Display next image by clicking "next" button
$('#btnNext').click(function() {
  if ($currentImg.parents("li").next().children("a").children("img").length !== 0) {
      next();
  } 
});

//Display previous image by clicking "previous" button
$('#btnPrev').click(function() {
  if ($currentImg.parents("li").prev().children("a").children("img").length !== 0) {
    prev();
  } 
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//When X is clicked
$("#btnExit").click(function() {
    //Hide the overlay
    $overlay.slideUp(500);
});


//Hide overaly when clicked on
$image.click(function(){
	$overlay.fadeOut(1000);
});


////////////////////SEARCH BOX/////////////////////

//this just creats an varible for the input element
var $search = $('input');

// This gets the value of what the users type into the input box and the .tolowerCaase converts evrything to a lowercase.// 
$search.keyup(function(){
  var userInput = $(this).val().toLowerCase();

    //This adds the same function to each <img> elemnt
  $('#imageGallery img').each(function(){
    var altText = $(this).attr('alt').toLowerCase();
 

    if(altText.search(userInput) > -1){
      $(this).parent().parent().fadeIn(500);  
    } else {                                     
      $(this).parent().parent().fadeOut(500); 
    }
  });
});

  ///////////NOTS FOR SERCH BOX CODE////////////
  /* .parent() allows you to taget the parent of an elemant, 
  In this case the parent of the image witch is the <a> but,
   since the img and <a> are both childes of the list item, 
   the fadeIn and fadeOut methds dont work very well. By adding .parent() . parent() twice, 
   it allows it to go back twice and target the <li> witch makes things fade out properly */ 

