/**
 * Created by llllou on 2017/7/23 0023.
 */
init();
window.onresize = function () {
  init();
}
$("submit").click(function (event) {
  event.preventDefault();
  $.post("http://h6.duchengjiu.top/shop/api_user.php", {
    "Content-Type": "application/x-www-form-urlencoded",
    "status": "login",
    "username": $("#username").val(),
    "password": $("#password").val()
  }, function (response) {
    console.log(response);
    if (response.code === 0) {
      localStorage.token = response.data.token
      location.assign("index.html")
    }
    else {
      $(".alert").css("display", "block");
      $(".mask").css("display", "block");
      $(".alert .down p").text(response.message+"!")

    }
    $(".alert .up .icon")[0].addEventListener("touchstart", function () {
      $(".alert").css("display", "none");
      $(".mask").css("display", "none");
    },false);
  }
  )
})