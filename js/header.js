const header = document.getElementById("main-header")
header.innerHTML = `
<!-- Top bar -->
<div class="top-bar">
    <div class="top-info">
        <div class="container">
            <ul class="personal-info">
                <li>
                    <p><a href="tel:+17138700330" target="_blank" style="color:#6c2e37"><i class="fa fa-phone"></i> (+1) 713-870-0330 </a></p>
                </li>
                <li>
                    <p style="color:#6c2e37">International Academy of Letters USA </p>
                </li>
                <li>
                    <p><a href="mailto:info@ialusa.org" target="_blank" style="color:#6c2e37"><i class="fa fa-envelope" aria-hidden="true"></i>
                    info@ialusa.org</a> </p>
                </li>
            </ul>

            <!-- Right Sec -->
            <div class="right-sec">

                <!-- Language 
                <select class="selectpicker">
  <option>English</option>
  <option>French</option>
  <option>Relish</option>
</select>-->

                <!-- social -->
                <ul class="social">
                    <li><a target="_blank" href="https://www.facebook.com/ghazanfar.hashmi.5"><i class="fa fa-facebook" ></i></a></li>
                    <li><a target="_blank" href="https://www.twitter.com/"><i class="fa fa-twitter" ></i></a></li>
                    <li><a href="https://www.youtube.com/channel/UCH9AiwAOnsZMvnluDkjfojA" target="_blank"><i class="fa fa-youtube"></i></a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
<style>
.ownmenu .hover:hover .ownmenu ul.dropdown{
    display:block!important;
}

.navbar .ownmenu .dropdown {
    position: relative;
}

.navbar .ownmenu .submenu {
    position: absolute;
    top: 100%;
    left: 0;
    display: none;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.navbar .ownmenu .dropdown:hover .submenu {
    display: block;
}

.navbar .ownmenu .submenu li {
    padding: 10px 0;
}

.navbar .ownmenu .submenu li a {
    color: #333;
    text-decoration: none;
}

.navbar .ownmenu .submenu li a:hover {
    color: white;
}


@media (max-width: 768px) {
    

    .navbar .ownmenu .dropdown-link::after {
        content: '\f107';
    }

    .navbar .ownmenu .submenu {
        display: none;
        position: relative;
        padding:0;
        padding-left: 20px;
    }
    .navbar .ownmenu .dropdown:hover .submenu{
        display:flex;
        flex-direction:column;
    }
}


.footer{
  color:#6c2e37;
  background:white!important;
  padding:3.5rem 0!important;
}

.list-style{
  list-style-type:none!important;
  cursor:pointer;
  font-size:2rem;
  opacity:.8;
 
}
.list-style li{
    padding-block:1.5rem;
    text-align:left;
    transition:border 0.2s ease-in-out;
    padding-inline:1rem;
}

.list-style li a{
     color:#6c2e37;
}

.list-style li:hover{
    border-bottom:1px solid #6c2e37;
}

.contact-col .list-style li a{
    display:flex;
    align-items:center;
    gap:1rem;
}

.footer-col .social li a{
    width:55px;
    height:55px;
    line-height:65px;
    background:white;
    color:#6c2e37;
}
.footer-col .social li a i{
    font-size:2.6rem;
    color:#6c2e37;
}

@media screen and (max-width:768px){

.footer-col-mob{
    border-top:1px solid #6c2e37;
}

.rights {
    display:flex;
    justify-content:center;
}

    .rights p{
        text-align:center;
    }
}

.mobile-menu-toggle {
  display: none;
}

@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: block;
    position: absolute;
    top: 40px;
    right: 10px;
    z-index: 9999;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    width: 40px;
    height: 40px;
    outline:none;
  }
  
   .mobile-menu-toggle:focus{
       outline:none;
       border:none;
   }

  .burger-icon {
    display: block;
    width: 25px;
    height: 3px;
    background-color: #6c2e37;
    position: relative;
    transition: background-color 0.3s ease-in-out;
  }

  .burger-icon:before,
  .burger-icon:after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-color: inherit;
    position: absolute;
    left: 0;
    transition: transform 0.3s ease-in-out;
  }

  .burger-icon:before {
    top: -10px;
  }

  .burger-icon:after {
    top: 10px;
  }

  /* Animation for the burger menu icon */
  .mobile-menu-open .burger-icon {
    background-color: #6c2e37;
  }

  .mobile-menu-open .burger-icon:before {
    transform: rotate(45deg);
    top: 0;
  }

  .mobile-menu-open .burger-icon:after {
    transform: rotate(-45deg);
    top: 0;
  }

  /* Show/hide the navigation menu */
  .mobile-menu-open ~ .nav {
    visibility:visible;
    display:block;
    transition:visibility 0.3s ease-in;
  }

  .nav {
   transition:visibility 0.3s ease-out;
  display:none;
    visibility:hidden;
  }
}


</style>
<!-- Navigation -->
<nav class="navbar">

<div class="sticky">
  <div class="container">
    <div class="logo">
      <a href="home">
        <img width="20%" class="img-responsive" src="images/logo.png" alt="">
      </a>
    </div>

    <!-- Mobile Menu Toggle Button -->
    <button id="mobile-menu-toggle" class="mobile-menu-toggle" aria-label="Toggle navigation">
      <span class="burger-icon"></span>
    </button>

     <!-- Nav -->
            <ul class="nav ownmenu">
                <li id="home"> <a href="/ialus/home">Home </a></li>
          
            
              <li id="about" class="dropdown"> <a href="#">About<span class="indicator"><i class="fa fa-angle-right"></i></span></a>
                    <ul class="submenu">
                        <li id="mission"><a href="/ialus/mission">Mission</a></li>
                        <li id="objective"><a href="/ialus/objective">Objectives</a></li>
                        <li id="accountability"><a href="/ialus/accountability">Accountability</a></li>
                    </ul>
                </li>
                 <li  class="dropdown"> <a href="#">Team<span class="indicator"><i class="fa fa-angle-right"></i></span></a>
                    <ul class="submenu" style="width:430%;">
                        <li id="leadership-&-governance"><a href="/ialus/leadership-&-governance">Leadership & Governance</a></li>
                        <li id="team"><a href="/ialus/team">Advisory Board</a></li>
                       
                    </ul>
                </li>
                
                <li id="events"> <a href="/ialus/events.php">Events </a></li>
                <li id="get-involved"> <a href="/ialus/get-involved">Get Involved</a> </li>
                <li id="gallery"> <a href="/ialus/gallery">Gallery</a> </li>
                <li id="contact"> <a href="/ialus/contact">Contact</a> </li>
            </ul>
  </div>
</div>

</nav>

`

const footer = document.getElementById("main-footer")
footer.innerHTML =`

<footer class="text-center footer text-center" style="border-top:1px solid #ab7079">
  <div class="container p-4">
    
      <div class="row  text-md-start mt-5">
        
          <!--Logo Start-->
        <div class="col-md-5 footer-col">
         <a href="home"><img width="40%" class="img-responsive" src="images/logo.png" alt="" ></a>
          
         <ul class="social">
                    <li><a href="https://www.facebook.com/ghazanfar.hashmi.5"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="https://www.twitter.com/"><i class="fa fa-twitter"></i></a></li>
                    <li><a href="https://www.youtube.com/channel/UCH9AiwAOnsZMvnluDkjfojA"><i class="fa fa-youtube"></i></a></li>
                    <li><a href="https://www.twitter.com/"><i class="fa fa-instagram"></i></a></li>
                    <li><a href="https://www.youtube.com/channel/UCH9AiwAOnsZMvnluDkjfojA"><i class="fa fa-linkedin"></i></a></li>
                </ul>
        </div>
        <!--Logo end-->
        
       
        
          
          <!--Quick links Start-->
        <div class="col-md-3 footer-col footer-col-mob">
        <ul class="list-style ps-0">
            <li class="pb-3"><a href="https://thealamgroup.com/ialus/#services-sec" style="text-decoration:none;">Our Work</a></li>
            <li class="pb-3"><a href="https://thealamgroup.com/ialus/#services-sec" style="text-decoration:none;">Our Principles</a></li>
            <li class="pb-3"><a href="https://thealamgroup.com/ialus/#services-sec" style="text-decoration:none;">Diplomacy</a></li>
            <li class="pb-3"><a href="https://thealamgroup.com/ialus/#services-sec" style="text-decoration:none;">Our Mission</a></li>
          </ul>
         
        </div>
        <!--QUick links end-->
       
        <!--Other Start-->
        <div class="col-md-4 footer-col contact-col footer-col-mob">
           <ul class="list-style ps-0">
            <li class="pb-3"><a href="tel:(+1) 713-870-0330" style="text-decoration:none;"><i class="fa fa-phone"></i>Main Office (+1) 713 - 870 0330</a></li>
            <li class="pb-3"><a href="mailto:info@ialusa.org" style="text-decoration:none;"><i class="fa fa-envelope" aria-hidden="true"></i>info@ialusa.org</a></li>
            <li class="pb-3"><a href="https://www.google.com/maps/place/15111+Turphin+Way,+Sugar+Land,+TX+77498,+USA/data=!4m2!3m1!1s0x8640de04cfaf130d:0x9b007ac3d7e50faa?sa=X&ved=2ahUKEwj__qWNvon_AhVScvEDHWFID4YQ8gF6BAgIEAI" style="text-decoration:none;"><i class="fa fa-map-marker" aria-hidden="true"></i>15111 Turphin Way Sugar Land TX 77498</a></li>
            
          </ul>
        </div>
        <!--Other end-->
      </div>
    
  </div>
</footer>
`


const rights = document.getElementById("main-rights")
rights.innerHTML =`<div class="container">
<div class="row">
    <div class="col-md-6">
        <p> © All Rights Reserved <a href="/ialus/home" style="color:white; margin-left:0;">IAL-USA</a> </p>
    </div>
    <div class="col-md-6 text-right"> <a href="/ialus/privacy-policy">Privacy Policy</a> <a href="/ialus/terms-and-conditions">Terms & Conditions</a> </div>
</div>
</div>
`


$(document).ready(function() {
  $('#mobile-menu-toggle').click(function() {
    $(this).toggleClass('mobile-menu-open');
  });
});

    var currentURL = window.location.href;

    // Get the filename from the URL
    var filename = currentURL.substr(currentURL.lastIndexOf("/") + 1);

    // Remove any query parameters from the filename
    if (filename.indexOf("?") !== -1) {
        filename = filename.substr(0, filename.indexOf("?"));
    }

    // Remove the file extension if present
    filename = filename.replace(/\.[^/.]+$/, "");

    // Add the "active" class to the corresponding menu item based on the filename
    document.getElementById(filename).classList.add("active");
