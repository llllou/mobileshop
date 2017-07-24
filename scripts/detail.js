/**
 * Created by llllou on 2017/7/24 0024.
 */
window.onload=function(){
  init();
  window.onresize=init;
  $.get(option.detail,{"goods_id":getQuery("goods_id")},function(response){
    console.log(response);
    $(".container .item-img img").attr("src",response.data[0].goods_thumb);
    $(".container .des").text(response.data[0].goods_desc);
    $(".container .name").text(response.data[0].goods_name);
    $(".container .price").text("￥"+response.data[0].price);
    var mySwiper = new Swiper(".swiper-container",{
      slideClass : "container"
    });
    $("header li")[0].addEventListener("touchstart",function(){
      mySwiper.slideTo(0, 1000, false);
      $("header li").removeClass("current");
      $(this).addClass("current");

    });
    $("header li")[1].addEventListener("touchstart",function(){
      mySwiper.slideTo(1, 1000, false)
      $("header li").removeClass("current");
      $(this).addClass("current");
    });
    $("header li")[2].addEventListener("touchstart",function(){
      mySwiper.slideTo(2, 1000, false)
      $("header li").removeClass("current");
      $(this).addClass("current");
    })
    $("html")[0].addEventListener("touchend",function(){
      $("header li").removeClass("current");
      $("header li").eq(mySwiper.activeIndex).addClass("current")
    })
  })
};