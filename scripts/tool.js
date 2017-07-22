var init=function() {
  $("html").css("font-size", window.innerWidth / 10 + "px");
};
function ItemList(container, response) {
  for (var i = 0; i < response.data.length; i++) {
    container.innerHTML += "<div class='item-column'><a href='detail.html?goods_id=" + response.data[i].goods_id + "'><img src='" + response.data[i].goods_thumb + "'/><span>" + response.data[i].goods_name + "</span></a></div>";
  }
};
