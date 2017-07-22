window.onload = function () {
  init();
//轮播图
  $.get("http://h6.duchengjiu.top/shop/api_goods.php", {"pagesize": "20"}, function (response) {
    console.log(response);
    var itemContainer = document.querySelector(".hot-item")
    new ItemList(itemContainer, response);
    for (var i = 0; i < 4; i++) {
      $(".carousel img").eq(i).attr("src", response.data[i].goods_thumb)
    }
    ;
  });
  $.get("http://h6.duchengjiu.top/shop/api_cat.php", function (response) {
    for (var i = 0; i < response.data.length; i++) {
      $("header aside .list").append("<div class='list-name' catid='"+response.data[i].cat_id+"'>" + response.data[i].cat_name + "</div>");
    }
  });
  var menu = document.querySelector(".menu");
  menu.addEventListener("touchstart", function () {
    $("header aside").toggle().animate({"left": "0"}, 300);
    $("header .list-name:eq(0)").addClass("current");
  }, false);
  var list = document.querySelector(".list");
  list.addEventListener("touchstart", function (event) {
    event.preventDefault();
    $("header .list-name").each(function () {
      $(this).removeClass("current")
    });
    var target = event.target || event.srcElement;
    if (target.className === "list-name") {
      $(target).addClass("current");
      $("header .show").empty();
      $.get("http://h6.duchengjiu.top/shop/api_goods.php", {"cat_id": target.getAttribute("catid")}, function (response) {
        for (var i = 0; i < response.data.length; i++) {
          $("header aside .show").append("<div class='show-column'><img src='" + response.data[i].goods_thumb + "' alt=''><p>" + response.data[i].goods_name + "</p></div>");

        }
      })
    }
  }, false);
  document.querySelector("header").addEventListener("touchmove", function (event) {
    event.preventDefault()
  }, false);
  var mask = $("header aside .mask")[0];
  mask.addEventListener("touchstart", function () {
    $("header aside").animate({"left": "0"}, 500).toggle();
  }, false)
};
$.get("http://h6.duchengjiu.top/shop/api_goods.php", {"cat_id": "45"}, function (response) {
  for (var i = 0; i < response.data.length; i++) {
    $("header aside .show").append("<div class='show-column'><img src='" + response.data[i].goods_thumb + "' alt=''><p>" + response.data[i].goods_name + "</p></div>");

  }
})
//从服务器获取数据
