document.addEventListener("DOMContentLoaded", () => {
    const routes = {
        "/index.html": "/index.html",
        "/pages/about-us/aboutus.html": "/pages/about-us/aboutus.html",
        "/pages/product-listing/listing.html": "/pages/product-listing/listing.html",
        "/pages/contact-us/contactus.html": "/pages/contact-us/contactus.html",
    };

    function navigate(path) {
        if (routes[path]) {
            window.location.href = routes[path];
        } else {
            window.location.href = "/pages/404notFound/404notFound.html";
        }
    }

    const navLinks = document.querySelectorAll(".main-nav a, .footer-links a");
    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const path = link.getAttribute("href");
            navigate(path);
        });
    });
});
