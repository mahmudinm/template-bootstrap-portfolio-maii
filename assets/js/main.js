/*--------------------------------------------------------------

    Theme Name: Maii
    Framework Type  : Bootstrap 
    Author: Mahmudinm
    Author URI: http://themeforest.net/user/mahmudinm
    Version: 1.0


--------------------------------------------------------------*/

/*--------------------------------------------------------------
# Table Content
	1.  Preloader
	2. 	Navbar Shrink on scroll
	3. 	One page nav
	4. 	Typed.js / Home
	5. 	About / animate progress bar
	6. 	Counter projects
	7. 	Portfolio
	8. 	Magnific Popup
	9. 	Slick / Testimonals Clients
	10. Ajax contact form

--------------------------------------------------------------*/


$(document).ready(function(){
	'use strict';

	/*--------------------------------------------------------------
	# Preloader
	--------------------------------------------------------------*/
	$('#status').delay(300).fadeOut(); // will first fade out the loading animation 
	$('#preloader').delay(300).fadeOut(); // will fade out the white DIV that covers the website. 
	$('body').delay(300).css({'overflow':'visible'});


	/*--------------------------------------------------------------
	# Navbar shrink on scroll
	--------------------------------------------------------------*/
	$(window).scroll(function(){
		if ($(document).scrollTop() > 50) {
			$('#navbar').addClass('shrink');
		} else {
			$('#navbar').removeClass('shrink');
		}
	});

	/*--------------------------------------------------------------
	# One page Nav
	--------------------------------------------------------------*/
	$('#navbar').onePageNav({
		currentClass: 'active',			
	});


	/*--------------------------------------------------------------
	# Typed.js / Home
	--------------------------------------------------------------*/
	var typed = new Typed('.typed', {
	  strings: ["DESIGNER", "DEVELOPER"],
	  typeSpeed: 100,
	  backSpeed: 100,
	  backDelay: 4000,
	  // showCursor: false,
 	  cursorChar: '',
	  loop: true
	});		

	/*--------------------------------------------------------------
	# About / animate progress bar
	--------------------------------------------------------------*/
	$(function(){
	  $(window).scroll(function(){
	    $(".progress-bar:not(.animated)").each(function(){
	      if ($(this).is(':visible')) {
            var progressBar = $(this); // $(this) would work too
            progressBar.animate({
                width: progressBar.data('width') + '%'
            }, 1000);
            progressBar.addClass('animated');
	      }
	    });
	  }); 
	}); 


	/*--------------------------------------------------------------
	#  Counter projects 
	--------------------------------------------------------------*/
    $('.counter').counterUp({
	    delay: 15,
	    time: 3000
	});


    /*--------------------------------------------------------------
    # Portfolio
    --------------------------------------------------------------*/
		// get the action filter option item on page load
	var $filterType = $('#filter li.active a').attr('class');

	// get and assign the portfolio element to the
	// $holder varible for use later
	var $holder = $('ul.portfolio_gallery');

	// clone all items within the pre-assigned $holder element
	var $data = $holder.clone();

	$('#filter li a').on('click', function(e) {
	    // reset the active class on all the buttons
	    $('#filter li').removeClass('active');
	    
	    // assign the class of the clicked filter option
	    // element to our $filterType variable
	    var $filterType = $(this).attr('class');
	    $(this).parent().addClass('active');
	    
	    if ($filterType == 'all') {
	        // assign all li items to the $filteredData var when
	        // the 'All' filter option is clicked
	        var $filteredData = $data.find('li');
	    } 
	    else {
	        // find all li elements that have our required $filterType
	        // values for the data-type element
	        var $filteredData = $data.find('li[data-type=' + $filterType + ']');
	    }
	    
	    // call quicksand and assign transition parameters
	    $holder.quicksand($filteredData, {
	        duration:600,
	        easing: 'easeInOutQuad'
	    });
	    return false;
	});

	/*--------------------------------------------------------------
	# Magnific Popup
	--------------------------------------------------------------*/
	$('.info').magnificPopup({
		type: 'image'
	});


	/*--------------------------------------------------------------
	# Slick / Testimonals Clients
	--------------------------------------------------------------*/
	$('.slick__testimonals').slick({
		infinite: true,
		speed: 300,
		slidesToShow: 2,
		slidesToScroll: 1,
		prevArrow: '<div class="slick-prev slick-nav-btn"><i class="fa fa-angle-left fa-2x"></i></div>',
		nextArrow: '<div class="slick-next slick-nav-btn"><i class="fa fa-angle-right fa-2x"></i></div>',
        autoplaySpeed: 4000,
		  responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
		        infinite: true,
		      }
		    }
		  ]

	});


	/*--------------------------------------------------------------
	# Ajax contact form
	--------------------------------------------------------------*/
	// Get the form.
	var form = $('#contact-form');

	// Get the messages div.
	var formMessages = $('#form-message');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('alert alert-danger');
			$(formMessages).addClass('alert alert-success');

			// Set the message text.
			$(formMessages).text(response);

			console.log("ok");

			// Clear the form.
			$('#contact-form input,#contact-form textarea').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('alert alert-success');
			$(formMessages).addClass('alert alert-danger');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});
	});

	

});