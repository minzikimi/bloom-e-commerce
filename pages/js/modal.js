document.addEventListener('DOMContentLoaded', function() {
  const loginIcon = document.getElementById("login-icon");
  const loginModal = document.getElementById("loginModal");
  const closeButton = loginModal.querySelector(".close-button");

  if (loginIcon && loginModal && closeButton) {
    loginIcon.addEventListener("click", function(e) {
      e.preventDefault();
      loginModal.showModal();
    });

    closeButton.addEventListener("click", function() {
      loginModal.close();
    });

    loginModal.addEventListener("click", function(e) {
      if (e.target === loginModal) {
        loginModal.close();
      }
    });
  } else {
    console.error("Cant find!");
  }
});