 
<?php
  //Database connection
 $dbHost = "localhost";
 $dbUser = "thealamg_ialus";
 $dbPass = "ialus12345@";
 $dbName = "thealamg_ialus";


 $conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);

 if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
 }

 //Retrieve dates from the database
    $sql = "SELECT date FROM posts";
    $result = $conn->query($sql);

     $dates = array();
    if ($result->num_rows > 0) {
     while ($row = $result->fetch_assoc()) {
         $dates[] = $row['date'];
     }
 }

// Convert the dates array to a JSON string
 $datesJson = json_encode($dates);

 //Pass the datesJson variable to your JavaScript code
 echo "<script>var postDates = $datesJson;</script>";

 $conn->close();
 ?>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="M_Adnan">
<title>IAL-USA - EVENTS</title>

<!-- Favicon -->
<link rel="icon" type="image/png" sizes="16x16" href="images/logo.png">

<!-- Bootstrap Core CSS -->
<link href="css/bootstrap.min.css" rel="stylesheet">

<!-- Custom CSS -->
<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="css/ionicons.min.css" rel="stylesheet">
<link href="css/main.css" rel="stylesheet">
<link href="css/style.css" rel="stylesheet">
<link href="css/responsive.css" rel="stylesheet">
<link rel="stylesheet" href="css/style_upcoming.css">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.5.5/css/simple-line-icons.min.css" integrity="sha512-QKC1UZ/ZHNgFzVKSAhV5v5j73eeL9EEN289eKAEFaAjgAiobVAnVv/AGuPbXsKl1dNoel3kNr6PYnSiTzVVBCw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/ionicons/7.1.2/esm/ionicons.min.js" integrity="sha512-2ySmquu6HK3CAvwLllh0R8K8buFPMZsUwWLZIlB7WW8c8ilUtoNyhsmEsQn2U0IV1USr2Oc/9DJzlr4cxAbuxA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<!-- Online Fonts -->
<link href='https://fonts.googleapis.com/css?family=Raleway:400,600,800,200,500' rel='stylesheet' type='text/css'>
<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600italic,400italic,300,300italic,600,700,700italic,800,800italic' rel='stylesheet' type='text/css'>
<link href='https://fonts.googleapis.com/css?family=Libre+Baskerville:400italic,400,700' rel='stylesheet' type='text/css'>

<!-- COLORS -->
<link rel="stylesheet" id="color" href="css/colors/default.css">

<!-- JavaScripts -->
<script src="js/modernizr.js"></script>

<style>
  .blog-slider__content > *{
    opacity: 1;
  }
  .blog-slider__img img{
    opacity: 1;
  }
  .blog-slider__img{
    background-image: unset;
  }
  .blog-slider__img:after{
    opacity: 0.1;
  }
  @media screen  and (max-width: 768px) {
    .blog-slider{
      margin-block:15rem!important;
    }
        .sub-bnr h1{
            font-size:42px;
        }
        .sub-bnr::after{
            background-color:rgba(0, 0, 0, 0.5);
        }
    
  }
</style>
</head>
<body>

<!-- Wrap -->
<div id="wrap"> 
  
  <!-- header -->
  <header id="main-header">

  </header>
  
  <!-- SUB BANNER -->
  <section class="sub-bnr bnr-1" data-stellar-background-ratio="0.5">
    <div class="position-center-center">
      <div class="container">
        <h1>EVENTS</h1>
        <!-- Breadcrumbs -->
        <ol class="breadcrumb">
          <li><a href="#">Home</a></li>
          <li class="active">Events</li>
        </ol>
      </div>
    </div>
  </section>
  
  <!-- Content -->
  <div id="content" > 
    
        <!-- Portfolio -->
            <section class="portfolio light-gray-bg padding-top-70 padding-bottom-20">
                <div class="container">
                   

                    <!-- PORTOFLIO ITEMS FILTER -->
                    <div class="text-center">
                        <div id="ajax-work-filter" class="cbp-l-filters-buttonCenter filter-style-2">
                            <div data-filter=".past" class="cbp-filter-item-active cbp-filter-item"> Our Recent Past Events
                                <div class="cbp-filter-counter"></div>
                            </div>
                            <div data-filter=".upcoming" class="cbp-filter-item"> Upcoming Events
                                <div class="cbp-filter-counter"></div>
                            </div>
                           
                            
                        </div>
                    </div>
                </div>

                <!-- PORTFOLIO ROW -->
                <div class="ajax-work eventsSec col-3">    
                    <!-- ITEMS -->
                    <div class="cbp-item upcoming dial sec storage">
                        <article class="item"><img class="img-responsive" src="images/photofunny.net_.jpg" alt="">
                            <!-- Hover -->
                            <div class="over-detail">
                                <!-- Link -->
                                <div class="top-detail">
                                     <a href="events/upcoming-events/Future of Pakistan-USA Relations.html" target="_blank"><i class="fa fa-link"></i> </a> 
                                    
                                </div>
                                <!-- TITTLE HEADING -->
                                <div class="bottom-detail">
                                    <h3>Future of Pakistan-USA Relations- a way forward
                                        Keynote Speakers:<br>
                                        1-Elizanmbeth Horst<br>
                                        Principal Deputy Assistant Secretary of State  South and Central Asia<br>
                                        2- Masood Khan<br>
                                        Pakistan’s Ambassador to the United States</h3>
                                    <span> Date: July 18,2023 <br> Timing: 10.00 am</span> </div>
                            </div>
                        </article>
                    </div>

                </div>

                <!--PAST EVENTS-->
                <script>

                    var eventTitle = [
                        "Renowned American think tank Wilson Center and International Academy of Letters USA jointly organized a conference on the Future of Pakistan-USA relations at Wilson Center Wangton D.C.",
                        "On the eve of 33rd anniversary of the fall of Berlin Wall, an International conference was held in Berlin Germany. Ghazanfar Hashmi, President International Academy of Letters USA was the keynote speaker of the opening session. Ambassadors from European countries, senior diplomats, former heads of states, ",
                        "International Academy of Letters USA and Ismaili Council for the Southwestern USA organized a Dialogue on Pak- USA Relations. Mr. Michael Kugelman, ",
                        "Hobby School of Public Affairs, University of Houston in association with The Jinnah Institute USA and International Academy of Letters USA organized a dialogue on Pak- USA Relations with Ambassador Masood Khan,",
                        "Ambassadors of Pakistan to United States of America 🇺🇸 at Ary Digital & IAL event “ Dialogue”",
                        "Meet the Writer",
                        "“Shaam e Faiz” and  “A Conversation with Moneeza Hashmi”",
                        "Dialogue with His Excellency Dr. Asad Majeed Khan, Ambassador of Pakistan",
                        "Congressman Al Green, Congressman Randy Weber, Pakistani Ambassador to USA, Dr. Asad Majeed Khan, National Deputy Finance Chair..",
                        "Had a wonderful dialogue today with Dr. Ishrat Hussain, former Advisor to Prime Minister on Pakistan’s economic situation and his latest book.."
                    ];

                    var eventImages = [
                        "event1.jpg",
                        "event2.jpg",
                        "event3.jpg",
                        "event4.jpg",
                        "Ambassadors-of-Pakistan-960x500.jpg",
                        "Meet-the-Writer-960x500.jpg",
                        "Shaam-e-Faiz-960x500.jpg",
                        "dialogue-with-embassadir-of-pakistan-960x500.jpg",
                        "session-with-Congresswoman-Shiela-Jackson-960x500.jpg",
                        "Dr.-Ishrat-Hussain-768x412.jpg"
                    ];

                    var eventDate = [
                        
                        "27 APRIL,2023",
                        "9 NOVEMBER,2022",
                        "1 AUGUST,2022",
                        "2 JULY,2022",
                        "5 MAY",
                        "3 FEB",
                        "13 JULY",
                        "29 JULY",
                        "7 AUGUST",
                        "14 DECEMBER"
                    ];
                   

                    
                     var eventPages = [
                        
                        "Renowned American think tank Wilson Center",
                        "On the eve of 33rd anniversary of the fall of Berlin Wall",
                        "Ismaili Council for the Southwestern USA",
                        "Hobby School of Public Affairs",
                        "Ambassadors of Pakistan",
                        "Meet the Writer",
                        "Shaam e Faiz",
                        "Dialogue with His Excellency Dr. Asad Majeed Khan",
                        "In a special session with Congresswoman Shiela Jackson Lee",
                        "dialogue today with Dr. Ishrat Hussain, former Advisor to Prime Minister on Pakistan"
                    ];

                    const eventsSec = document.querySelectorAll(".eventsSec");
                    for (let i = 0; i < eventTitle.length; i++) {
                     
                    eventsSec[0].innerHTML += ` <div class="cbp-item past dial sec storage">
                        <article class="item"><img class="img-responsive" src="images/pastevents/${eventImages[i]}" alt="">
                            <!-- Hover -->
                            <div class="over-detail">
                                <!-- Link -->
                                <div class="top-detail"> 
                                <a href="events/past-events/post.php?title=${postDates[i]}" target="_blank" ><i class="fa fa-link"></i> </a>  
                                </div>
                                <!-- TITTLE HEADING -->
                                <div class="bottom-detail">
                                    <h3>${eventTitle[i]}</h3>
                                    <span>${eventDate[i]}</span> </div>
                            </div>
                        </article>
                    </div>`;
                    
eventPages = eventPages.map(title => title.replace(/\s+/g, ''));
                  // Output the modified titles
console.log(eventPages);
                }
                
                </script>

            </section>
    
    
    
    
    
    
    
    
  
    

     <script>

//     var eventTitle = [
//         "Renowned American think tank Wilson Center and International Academy of Letters USA jointly organized a conference on the Future of Pakistan-USA relations at Wilson Center Wangton D.C.",
//         "On the eve of 33rd anniversary of the fall of Berlin Wall, an International conference was held in Berlin Germany. Ghazanfar Hashmi, President International Academy of Letters USA was the keynote speaker of the opening session. Ambassadors from European countries, senior diplomats, former heads of states, ",
//         "International Academy of Letters USA and Ismaili Council for the Southwestern USA organized a Dialogue on Pak- USA Relations. Mr. Michael Kugelman, ",
//         "Hobby School of Public Affairs, University of Houston in association with The Jinnah Institute USA and International Academy of Letters USA organized a dialogue on Pak- USA Relations with Ambassador Masood Khan,",
//         "Ambassadors of Pakistan to United States of America 🇺🇸 at Ary Digital & IAL event “ Dialogue”",
//         "Meet the Writer",
//         "“Shaam e Faiz” and  “A Conversation with Moneeza Hashmi”",
//         "Dialogue with His Excellency Dr. Asad Majeed Khan, Ambassador of Pakistan",
//     ];

//     var eventImages = [
//         "event1.jpg",
//         "event2.jpg",
//         "event3.jpg",
//         "event4.jpg",
//         "slide-1.jpg",
//         "slide-2.jpg",
//         "slide-3.jpg",
//         "slide-4.jpg"
//     ];

//     var eventDate = [
        
//         "29 APRIL,23",
//         "9 NOVEMBER,22",
//         "1 AUGUST,22",
//         "2 JULY,22",
//         "5 MAY",
//         "3 FEB",
//         "13 JULY",
//         "29 JULY"
//     ];

//     const eventsSec = document.querySelectorAll("#content");
//     for (let i = 0; i < eventTitle.length; i++) {
     
//     eventsSec[0].innerHTML += ` 
//     <div class="blog-slider" style="margin-block:2rem ;">
//       <div class="blog-slider__wrp swiper-wrapper">
//         <div class="blog-slider__item swiper-slide">
//           <div class="blog-slider__img">
            
//             <img src="images/pastevents/${eventImages[i]}" alt="">
//           </div>
//           <div class="blog-slider__content">
//             <span class="blog-slider__code">${eventDate[i]}</span>
//             <div class="blog-slider__title"></div>
//             <div class="blog-slider__text">${eventTitle[i]} </div>
           
//           </div>
//         </div>   
//       </div>
//     </div>
//   </div>
//     `;
// }
// </script>

  
  
 
        <!-- FOOTER -->
        <footer id="main-footer">
            
        </footer>

        <!-- RIGHTS -->
        <div class="rights" id="main-rights">
            
        </div>
</div>
<script src="js/jquery-1.11.0.min.js"></script> 
<script src="js/bootstrap.min.js"></script> 
<script src="js/own-menu.js"></script> 
<script src="js/jquery.isotope.min.js"></script> 
<script src="js/jquery.flexslider-min.js"></script> 
<script src="js/jquery.countTo.js"></script> 
<script src="js/owl.carousel.min.js"></script> 
<script src="js/jquery.cubeportfolio.min.js"></script> 
<script src="js/jquery.colio.min.js"></script> 
<script src="js/jquery.timelinr-0.9.54.js"></script> 
<script src="js/main.js"></script>
<script src="js/header.js"></script>
</body>
</html>