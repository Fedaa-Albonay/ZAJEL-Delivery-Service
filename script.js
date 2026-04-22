// 1. SELECTING ELEMENTS & UI ANIMATION
const x = document.getElementById("login-form");
const y = document.getElementById("register-form");
const z = document.getElementById("btn-active");

function register() {
    x.style.left = "-450px"; 
    x.style.opacity = "0";   
    y.style.left = "0";      
    y.style.opacity = "1";
    z.style.left = "110px";
}

function login() {
    x.style.left = "0";      
    x.style.opacity = "1";
    y.style.left = "450px";  
    y.style.opacity = "0";
    z.style.left = "0px";
}


// 2. REGISTRATION LOGIC
const regForm = document.getElementById('register-form');
if (regForm) {
    regForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const pass = document.getElementById('reg-pass').value;

        if (pass.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        if (!email.includes('@')) {
            alert("Please enter a valid email address.");
            return;
        }

        const userData = { name, email, pass };
        localStorage.setItem(email, JSON.stringify(userData));
        alert("Registration successful! You can now log in.");
        login();
    });
}


// 3. LOGIN LOGIC
const logForm = document.getElementById('login-form');
if (logForm) {
    logForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-pass').value;

        const storedData = localStorage.getItem(email);

        if (storedData) {
            const userData = JSON.parse(storedData);
            if (userData.pass === pass) {
                alert("Welcome back, " + userData.name + "!");
                window.location.href = "index.html";
            } else {
                alert("Incorrect password. Please try again.");
            }
        } else {
            alert("Email not found. Please sign up first.");
        }
    });
}

// 4. TRACKING SYSTEM LOGIC
const trackingForm = document.getElementById('tracking-form'); 
const trackingInput = document.getElementById('track');
const resultDiv = document.getElementById('tracking-result');

if (trackingForm) {
    trackingForm.addEventListener('submit', function(e) { 
        e.preventDefault(); 
        
        const trackNumber = trackingInput.value.trim().toUpperCase();

        // DESIGNING THE RESULT DIV
        resultDiv.style.display = 'block';
        resultDiv.style.marginTop = '20px';
        resultDiv.style.padding = '15px';
        resultDiv.style.borderRadius = '8px';
        resultDiv.style.textAlign = 'center';

        // CHECKING THE TRACKING NUMBER
        if (trackNumber === 'ZAJ-12345678') {
            resultDiv.innerHTML = `✅ <strong> Shipment status: </strong> Received at Abu Dhabi warehouse - Delivering now 🚚 `;
            resultDiv.style.backgroundColor = '#d4edda'; 
            resultDiv.style.color = '#155724';
            resultDiv.style.border = '1px solid #c3e6cb';
        } else {
            resultDiv.innerHTML = `❌ Sorry, Shipment Number <strong>${trackNumber}</strong> Does Not Exist. Please Check Your Tracking Number Again.`;
            resultDiv.style.backgroundColor = '#f8d7da'; 
            resultDiv.style.color = '#721c24';
            resultDiv.style.border = '1px solid #f5c6cb';
        }
    });
}

// 5. CONTACT US FORM LOGIC

const contactForm = document.getElementById('contact-form');
const contactResult = document.getElementById('contact-result');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Stop the page from refreshing
        e.preventDefault();

        const userName    = document.getElementById('name').value;
        const userEmail   = document.getElementById('email').value;
        const userPhone   = document.getElementById('number').value;
        const userMessage = document.getElementById('message').value;
        
        //Simple Validation: Ensure message is long enough
        if (userMessage.length < 10) {
            alert("Please provide a more detailed message (at least 10 characters).");
            return;
        }

        //Success Action: UI U[date
        contactForm.style.display = 'none';
        contactResult.style.display = 'block';
        contactResult.innerHTML = `
            <div class="success-card">
                <i class="fa-solid fa-circle-check" style="font-size: 3rem; color: #28a745; margin-bottom: 15px;"></i>
                <h3 style="color: #1d3557; margin-bottom: 10px;">Message Sent Successfully!</h3>
                <p style="color: #666;">Thank you, <strong>${userName}</strong>. We have received your inquiry and will contact you at <strong>${userEmail}</strong> within 24 hours.</p>
                <button onclick="location.reload()" class="btn" style="margin-top: 20px;">Send Another Message</button>
            </div>
        `;

        // Developer Log: (Simulating sending to a server)
        console.log("Form Submitted to Zajel System:", {
            sender: userName,
            contact: userEmail,
            phone: userPhone,
            content: userMessage,
            timestamp: new Date().toLocaleString()
        });
    });
}

// 6. PHONE NUMBER WITH COUNTRY CODE
const phoneInput = document.querySelector("#number");
if (phoneInput) {
    const iti = window.intlTelInput(phoneInput, {
        preferredCountries: ["ae", "sa", "eg", "jo", "kw", "om", "qa", "bh", "ly", "ma", "tn", "dz", "sd", "ye", "sy", "iq", "lb", "syr", "ps", "so", "er", "dj", "km", "mr", "tn"],
        initialCountry: "ae",
        separateDialCode: true,
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            const fullNumber = iti.getNumber();
            console.log("Full Phone Number with Code:", fullNumber);
        });
    }
}

// 7. AUTO-SCROLL LOGIC (Optional if CSS is used)
const scrollContainer = document.querySelector('.cards-container');

scrollContainer.addEventListener('wheel', (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});

// 8. DARK MODE LOGIC
const modeToggle = document.getElementById('dark-mode-toggle');
const modeIcon = document.getElementById('mode-icon');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    modeIcon.classList.replace('fa-moon', 'fa-sun');
}

modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        modeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        localStorage.setItem('theme', 'light');
        modeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});