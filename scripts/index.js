window.onload = function () {
  init();
  checkLogin();
  search();
//生成界面
  $.get("http://h6.duchengjiu.top/shop/api_goods.php", {"pagesize": "20"}, function (response) {
    var itemContainer = document.querySelector(".hot-item");
    new ItemList(itemContainer, response);
    //生成商品列表
    $(".hot-item").css("height", ($(".item-column")[0].offsetHeight) * ($(".item-column").length + 2) / 2 + "px");
    //设置容器高度
    for (var i = 0; i < 5; i++) {
      $(".carousel img").eq(i).attr("src", response.data[i].goods_thumb);
      $(".carousel a").eq(i).attr("href", "detail.html?goods_id=" + response.data[i].goods_id)
    }
    //为轮播图添加图片
    var Myswiper = new Swiper(".swiper-container",{
      loop:true,
      autoplay:3000
    })

  });
  //轮播图
  $.get("http://h6.duchengjiu.top/shop/api_cat.php", function (response) {
    for (var i = 0; i < response.data.length; i++) {
      $("header aside .list").append("<div class='list-name' catid='" + response.data[i].cat_id + "'>" + response.data[i].cat_name + "</div>");
    }
  });
  //获得商品分类列表

  var menu = document.querySelector(".menu");
  menu.addEventListener("touchstart", function () {
    $("header aside").toggle().animate({"left": "0"}, 300);
    $("header .list-name:eq(0)").addClass("current");
  }, false);
  //切换侧边栏的显示
  var list = document.querySelector(".list");
  list.addEventListener("touchstart", function (event) {
    event.preventDefault();
    $("header .list-name").each(function () {
      $(this).removeClass("current")
    });
    //排他算法，去除多余current
    var target = event.target || event.srcElement;
    if (target.className === "list-name") {
      $(target).addClass("current");
      $("header .show").empty();
      $.get("http://h6.duchengjiu.top/shop/api_goods.php", {"cat_id": target.getAttribute("catid")}, function (response) {
        for (var i = 0; i < response.data.length; i++) {
          $("header aside .show").append("<div class='show-column'><img src='" + response.data[i].goods_thumb + "' alt=''><p><a href='detail.html?goods_id=" + response.data[i].goods_id + "'>" + response.data[i].goods_name + "</a></p></div>");

        }
      })
    }
    ;

  });
  //菜单页面切换;
  var mask = $("header aside .mask")[0];
  mask.addEventListener("touchstart", function (event) {
    event.preventDefault();
    $("header aside").animate({"left": "0"}, 500).toggle();
  }, false);
  var show = document.querySelector("header .show");

  function scroll(container) {
    var start = 0;
    var delta = 0
    var now   = 0;
    var arr   = [];
    container.addEventListener("touchstart", function (event) {
      if (event.touches.length > 1)return;
      if (!container.style.webkitTransform)container.style.webkitTransform = "translateY(0)";
      container.style.webkitTransition = "none"
      start                            = event.touches[0].clientY
    }, true)
    container.addEventListener("touchmove", function (event) {
      event.preventDefault();
      delta = event.touches[0].clientY - start;
      now += delta;
      start = event.touches[0].clientY;
      if (now > 0)now = 0;
      else if (now < ~container.offsetHeight + container.parentNode.offsetHeight / 2)now = ~container.offsetHeight + container.parentNode.offsetHeight / 2;
      container.style.webkitTransform = "translateY(" + now + "px)";
      arr.push(event.touches[0].clientY)
    }, true);
    container.addEventListener("touchend", function (event) {
      now += (arr[arr.length - 1] - arr[arr.length - 2]) * 5;
      container.style.webkitTransition = "all 0.5s ease 0s";
      container.style.webkitTransform  = "translateY(" + now + "px)";
      arr                              = [];
    }, true);
  }

  scroll(show);
//惯性滚动
  document.querySelector("header aside").addEventListener("touchmove", function (event) {
    event.preventDefault()
  });
//关闭菜单页面
  $.get("http://h6.duchengjiu.top/shop/api_goods.php", {"cat_id": "45"}, function (response) {
    for (var i = 0; i < response.data.length; i++) {
      $("header aside .show").append("<div class='show-column'><img src='" + response.data[i].goods_thumb + "' alt=''><p><a href='detail.html?goods_id=" + response.data[i].goods_id + "'>" + response.data[i].goods_name + "</a></p></div>")
    }
  });
  $("html")[0].addEventListener('touchmove', function (event) {
    if ($("body")[0].scrollTop > 100) {
      $(".back-top").css("display", "block")
    }
    else {
      $(".back-top").css("display", "none")
    }
  });
  $(".back-top")[0].addEventListener("touchstart", function (event) {
    event.preventDefault();
    $("body").animate({"scrollTop": "0"}, 500, "linear", function () {
      $(".back-top").css("display", "none")
    });
  }, true)
}
//返回顶部摁钮

