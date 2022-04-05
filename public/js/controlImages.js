 //Slider controls
        var currentImage = $(this).attr('data-slide-to');
        currentImage =  11;
        var imagesTotal = $('.carousel-item').length;

        //Previous image control
        $('a.carousel-control-prev').click(function () {
            currentImage -= $('div.carousel-item').index() + 1;
            if(currentImage == 1 || currentImage == 0 || currentImage < 0) {
                loadPreviousImages();
                
            } 
        });

        //Next image control
        $('a.carousel-control-next').click(function () {
            currentImage += $('div.carousel-item').index() + 1;
            if (currentImage == imagesTotal) {
                loadNextImages();
            }
        });

        //Images selected randomly
        function changeImage(imageNumber) {            
            var image = parseInt(imageNumber) + 1;
            currentImage = image;
            
            if (currentImage == 1) {
                loadPreviousImages();
            }

            if (currentImage == imagesTotal) {
                loadNextImages();
            }
            
        }

        function loadPreviousImages() {
            var currentSlide = document.getElementById('index_1');
                anAttr = 'prev-slides';
                
                if (currentSlide.getAttribute(anAttr) == 'true') {
                    var fName = currentSlide.getAttribute('fname');
                    var currentURL = decodeURIComponent((window.location.href + '').replace(/\+/g, '%20'));
                    var newURL = currentURL.slice(0, currentURL.lastIndexOf('\\') + 1) + fName;
                    window.location.assign(newURL);
                }
        }

        function loadNextImages() {
            var currentSlide = document.getElementById('index_' + currentImage);
                console.log("currentslide", currentSlide);
                anAttr = 'more-slides';

                if (currentSlide.getAttribute(anAttr) == 'true') {
                    var fName = currentSlide.getAttribute('fname');
                    var currentURL = decodeURIComponent((window.location.href + '').replace(/\+/g, '%20'));
                    var newURL = currentURL.slice(0, currentURL.lastIndexOf('\\') + 1) + fName;
                    window.location.assign(newURL);
                }
                

        }