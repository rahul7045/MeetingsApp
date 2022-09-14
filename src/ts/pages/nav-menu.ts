const init = () => {

  const menuToggler = document.querySelector(".menu-toggler");

  const nav = document.querySelector(".navbar");

  const logoutBtn = document.querySelector("#btn-logout");



  const user = document.getElementById("user");

  (user as HTMLElement).textContent = ` ${localStorage.getItem("email")}`;

  

  (menuToggler as HTMLElement).addEventListener("click", function () {
    (nav as HTMLElement).classList.toggle("d-sm-none");
  });
  // (logoutBtn as HTMLElement).addEventListener("click", function () {
  //   localStorage.clear();
  //   window.location.href = "./login.html";
  // });
};

export default init;