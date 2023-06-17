


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="M_Adnan">
    <title>IAL-USA</title>

    <!-- Favicon -->
    <link rel="icon" type="image/png" sizes="16x16" href="/ialus/images/logo.png">

    <!-- Bootstrap Core CSS -->
    <link href="/ialus/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="/ialus/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/ialus/css/ionicons.min.css" rel="stylesheet">
    <link href="/ialus/css/main.css" rel="stylesheet">
    <link href="/ialus/css/style.css" rel="stylesheet">
    <link href="/ialus/css/responsive.css" rel="stylesheet">
    <link rel="stylesheet" href="/ialus/css/homeform.css">
    <link rel="stylesheet" href="/ialus/css/posts.css">

    <!-- Online Fonts -->
    <link href='https://fonts.googleapis.com/css?family=Raleway:400,600,800,200,500' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600italic,400italic,300,300italic,600,700,700italic,800,800italic' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Libre+Baskerville:400italic,400,700' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.5.5/css/simple-line-icons.min.css" integrity="sha512-QKC1UZ/ZHNgFzVKSAhV5v5j73eeL9EEN289eKAEFaAjgAiobVAnVv/AGuPbXsKl1dNoel3kNr6PYnSiTzVVBCw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- COLORS -->
    <link rel="stylesheet" id="color" href="/ialus/css/colors/default.css">

    <!-- JavaScripts -->
    <script src="/ialus/js/modernizr.js"></script>
</head>

<body>

    <!-- Wrap -->
    <div id="wrap">

        <!-- header -->
        <header id="main-header">

        </header>
            
<style>
    
    
    .slider-container {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  padding:0;
  margin: 0;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.slider.active {
  opacity: 1;
}

.slide-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #ffffff;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  display:flex;
  align-items:center;
  flex-direction:column;
}

.slider-heading {
  color: #ffffff;
  font-size: 55px;
  line-height: 62px;
  margin: 14px 0 9px;
  font-weight: 700;
  text-transform:uppercase;
}

.slider-paragraph {
  color: #ffffff;
  font-size: 18px;
  line-height: 30px;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  margin: 0 0 30px;
   text-transform:uppercase;
}

@media screen and (max-width:768px){
    .slider-heading {
        font-size:40px;
    }
    .slider-paragraph {
  font-size: 16px;
        
    }
}

.slide-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: top center;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
   /* Add overlay */
   overflow: hidden;
}



.slider-navigation {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
}


.slider-button {
    font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  padding: 1.5rem 3rem;
  background-color: transparent;
  color: #ffffff;
  border:2px solid white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out,color 0.2s ease-in-out;
  
}


.slider-button-prev {
  margin-right: 10px;
  position: absolute;
  left: 2%;
  opacity:0.5;
  transition:opacity 0.3s ease-in;
  padding: 0.8rem 1.5rem;
}

.slider-button-prev:hover {opacity:1;}

.slider-button-next {
  margin-left: 10px;
  position: absolute;
  right: 2%;
  opacity:0.5;
    padding: 0.8rem 1.5rem;

}

.slider-button-next:hover {opacity:1;}


.slider-button:hover {
  background-color: white;
  color:black;
}

@media screen and (max-width:768px){
    .slider-button-next, .slider-button-prev {
        display:none;
    }
}
</style>

    <!-- Main content -->
<main class="container" style="margin-block:3rem;">
    <div class="col-lg-12 col-sm-12">

        <?php
        // Database connection
        $dbHost = "localhost";
        $dbUser = "thealamg_ialus";
        $dbPass = "ialus12345@";
        $dbName = "thealamg_ialus";

        $conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $title = $_GET["title"];

        // Retrieve post data from the database
        $sql = "SELECT * FROM posts WHERE date = '$title'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $postTitle = urldecode($row["title"]);
            $postContent = $row["content"];
            $postImages = explode(",", $row["image"]);

            if (count($postImages) > 1) {
                // Display slider
                echo '
                <div class="slider-container">
                    ';
                foreach ($postImages as $index => $postImage) {
                    echo '
                    <div class="slider' . ($index == 0 ? ' active' : '') . '">
                        <div class="slide-content">
                            <!-- Slider content -->
                        </div>
                        <div class="slide-image" style="background-image: url(' . $postImage . ');"></div>
                    </div>
                    ';
                }
                echo '
                    <div class="slider-navigation">
                        <button class="slider-button slider-button-prev" onclick="prevSlide()">&lt;</button>
                        <button class="slider-button slider-button-next" onclick="nextSlide()">&gt;</button>
                    </div>
                </div>
                <hr>
                ';
            } else {
                // Display single image
                echo '
                <figure>
                    <img src="' . $postImages[0] . '" alt="Post Image" width="100%">
                </figure>
                <hr>
                ';
            }

            echo '
            <hgroup>
                <h2>' . $postTitle . '</h2>
            </hgroup>
            <p>' . $postContent . '</p>
            ';
        } else {
            echo "Post not found.";
        }

        $conn->close();
        ?>

    </div>
</main>

        
        <!-- FOOTER -->
        <footer id="main-footer">
            
        </footer>

        <!-- RIGHTS -->
        <div class="rights" id="main-rights">
            
        </div>
        
        

       
    </div>
    <script src="/ialus/js/jquery-1.11.0.min.js"></script>
    <script src="/ialus/js/bootstrap.min.js"></script>
    <script src="/ialus/js/own-menu.js"></script>
    <script src="/ialus/js/jquery.isotope.min.js"></script>
    <script src="/ialus/js/jquery.flexslider-min.js"></script>
    <script src="/ialus/js/jquery.countTo.js"></script>
    <script src="/ialus/js/owl.carousel.min.js"></script>
    <script src="/ialus/js/jquery.cubeportfolio.min.js"></script>
    <script src="/ialus/js/jquery.colio.min.js"></script>
    <script src="/ialus/js/main.js"></script>
    <script src="/ialus/js/header.js"></script>
    <script src="/ialus/js/homeform.js"></script>
    
     <script >
const slides = document.querySelectorAll('.slider');
const slideContents = document.querySelectorAll('.slide-content');
const slideImages = document.querySelectorAll('.slide-image');
let currentSlide = 0;
let slideInterval;

// Show the first slide initially
slides[currentSlide].classList.add('active');
slideContents[currentSlide].style.opacity = '1';
slideImages[currentSlide].style.opacity = '1';

// Start the slide interval
startSlideInterval();

function startSlideInterval() {
  slideInterval = setInterval(nextSlide, 3000);
}

function nextSlide() {
  slides[currentSlide].classList.remove('active');
  slideContents[currentSlide].style.opacity = '0';
  slideImages[currentSlide].style.opacity = '0';
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
  slideContents[currentSlide].style.opacity = '1';
  slideImages[currentSlide].style.opacity = '1';
}

function prevSlide() {
  slides[currentSlide].classList.remove('active');
  slideContents[currentSlide].style.opacity = '0';
  slideImages[currentSlide].style.opacity = '0';
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  slideContents[currentSlide].style.opacity = '1';
  slideImages[currentSlide].style.opacity = '1';
}

// Pause the slide interval on mouseenter
for (let i = 0; i < slides.length; i++) {
  slides[i].addEventListener('mouseenter', pauseSlideInterval);
}

// Resume the slide interval on mouseleave
for (let i = 0; i < slides.length; i++) {
  slides[i].addEventListener('mouseleave', startSlideInterval);
}

function pauseSlideInterval() {
  clearInterval(slideInterval);
}


const sliderContainer = document.querySelector('.slider-container');
let touchStartX = 0;
let touchEndX = 0;

sliderContainer.addEventListener('touchstart', handleTouchStart);
sliderContainer.addEventListener('touchend', handleTouchEnd);

function handleTouchStart(event) {
  touchStartX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipe();
}

function handleSwipe() {
  const swipeThreshold = 100; // Adjust the threshold value as desired

  if (touchEndX - touchStartX > swipeThreshold) {
    // Swiped right (previous slide)
    prevSlide();
  } else if (touchStartX - touchEndX > swipeThreshold) {
    // Swiped left (next slide)
    nextSlide();
  }
}



  </script>

</body>

</html>