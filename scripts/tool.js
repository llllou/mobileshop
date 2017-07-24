var init=function() {
  $("html").css("font-size", window.innerWidth / 10 + "px");
};
function ItemList(container, response) {
  for (var i = 0; i < response.data.length; i++) {
    container.innerHTML += "<div class='item-column'><a href='detail.html?goods_id=" + response.data[i].goods_id + "'><img src='" + response.data[i].goods_thumb + "'/><span>" + response.data[i].goods_name + "</span></a></div>";
  }
};
function search(){
  $("#searchbar").on("submit",function(event){
    event.preventDefault();
    console.log("jump")
    location.assign("search.html?"+$("input[search]").val());
  })
};
function checkLogin(){
  if(localStorage.token){
    $(".user").append("<a href='cart.html' class='user-avatar'></a>")
  }
  else
  {
    $(".user").append("<a href='login.html' class='user-login'>登录</a> ")
  }
}