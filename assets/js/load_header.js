function setActiveNavItem() {

    console.log("function runs")

    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link1');

    console.log(navLinks);
    
    navLinks.forEach(link => {

        console.log("link not Found")

        const linkPath = link.getAttribute('href').split('/').pop();
        if (currentPath === linkPath) {
            console.log("link Found")
            link.closest('.nav-item').classList.add('active');
        }
    });
}

function adjustMainContentPadding() {
    const navbar = document.querySelector('.main-nav-box');
    const mainContent = document.querySelector('.main-content');
    
    if (navbar && mainContent) {
      const navbarHeight = navbar.offsetHeight;
      mainContent.style.paddingTop = `${navbarHeight}px`;
    }
  }

$(document).ready(function() {
    $("#header-placeholder").load("./assets/components/header.html");
    setTimeout(() => {
        adjustMainContentPadding();
        setActiveNavItem();
      }, 100);
});

$(document).ready(function() {
    $("#footer-placeholder").load("./assets/components/footer.html");
});

window.addEventListener('resize', adjustMainContentPadding);


$(document).ready(function () {
    $('#schedule_btn_form').on('click', function (e) {
        e.preventDefault();

        const name = $('#schedule_name').val().trim();
        const email = $('#schedule_email').val().trim();
        const phone = $('#schedule_phone').val().trim();
        const message = $('#schedule_message').val().trim();
        const messageDiv = $('.schedule_message');

        if (!name || !email || !phone || !message) {
            messageDiv.text('Please fill in all the fields.').css('color', 'red');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

        if (!emailRegex.test(email)) {
            messageDiv.text('Please enter a valid email address.').css('color', 'red');
            return;
        }

        if (!phoneRegex.test(phone)) {
            messageDiv.text('Please enter a valid phone number.').css('color', 'red');
            return;
        }

        $.ajax({
            url: './assets/php/submit-form-schedule.php',
            type: 'POST',
            data: {
                name: name,
                email: email,
                phone: phone,
                message: message
            },
            success: function (response) {
                messageDiv.text('Appointment scheduled successfully!').css('color', '#b8ffb8');
                $('#schedule_name, #schedule_email, #schedule_phone, #schedule_message').val('');
            },
            error: function () {
                messageDiv.text('An error occurred. Please try again later.').css('color', 'red');
            }
        });
    });
});