export default function logOut() {
  localStorage.removeItem("profile");
  window.location.href = "index.html";
}
