;(function($) {
  /* 執行順序 - 網頁本身的HTML載入後就觸發 */
  $(document).ready(function () {
    edit_viwe_margin_bottom_zero(true);
    /* 移除分類樓層介紹文的row className ，預設為 false */
    if(false){$("#category_descr").removeClass("row");}
    /* 是否關閉放大鏡功能，預設為 true */
    magnifier(true);
    /* 手機板時，menu樓層可以自由伸縮,預設是 false */
    slideToggleForMenu(false);





    function slideToggleForMenu(event) {
      if (event) {
        const windowWidth = 768,                              //視窗寬度多少以下執行伸縮
              menuName = $('aside>ul'),                       //要伸縮的 DOM class name
              menuBtn = $('aside>.aside-title'),              //觸發伸縮的按鈕 DOM class name
              sToggle = function() {
                menuName.stop().slideToggle('normal',false);  //防止 click 重複觸發 slideToggle
                menuBtn.toggleClass('is-active');             //當展開後會加上 class="is-active",以方便控制樣式
              },
              pMenu = function() {
                const hasClass = menuBtn.hasClass('is-active');
                let browserWidth = window.innerWidth;          //取得瀏覽器寬度
                if (browserWidth < windowWidth) {
                  menuBtn.off("click").on("click", sToggle);
                  (hasClass)?menuName.show():menuName.hide();
                } else {
                  menuName.show();
                  menuBtn.off();
                }
              };
        pMenu();
        /*
        防止resize重複事件觸發:說明
        A:resize觸發時，每 ms (微秒) 就會執行一次
        B:設定setTimeout，每 1 ms過 100 ms才執行的 setTimeout() 事件觸發
        C:在 setTimeout() 之前加入 clearTimeout()事件：
        在每 ms就會新增 1 個 100 ms的 setTimeout() 的任務在排隊，
        而在此步驟則是在每 ms 就會把先前新增的 setTimeout() 的任務清除，隨後在新增一個 setTimeout() 的任務
        所以我們的代碼只會在最後一個 setTimeout() 裡才會被執行
        */
        window.addEventListener('resize', function(){//A
          let timer
          window.clearTimeout(timer);//C
          timer = window.setTimeout( function(){
            pMenu();
          }, 100); //B
        });
      }
    }

    function magnifier(use) {
      const prod_img = document.getElementById("prod_img");
      if (use && prod_img) {
        const cloneZoomImg = document.getElementById("zoom_01").cloneNode(false);
        prod_img.innerHTML = "";
        // 把原本的ID 改名稱
        document.getElementById("zoom_01").id = "zoom_02";
        cloneZoomImg.style.position = "relative";
        cloneZoomImg.style.maxWidth = "100%";
        cloneZoomImg.style.maxHeight = "100%";
        cloneZoomImg.style.width = "auto";
        cloneZoomImg.style.margin = "0 auto";
        prod_img.appendChild(cloneZoomImg);
        var prodImgH = $('#zoom_01').height(),
          prodImgW = $('#zoom_01').width();
        if (prodImgH > prodImgW) {
          $("#prod_img").css({ "text-align": "center", "height": "42.892vh" });
        }
        $(".zoomContainer").css("pointer-events","none");
      }
    }

    function news_breadcrumb_text(n) {
      if (n !== undefined) {
        return $("div#LinkContainer span[itemscope][itemtype='http://data-vocabulary.org/Breadcrumb']").eq(n).text();
      } else {
        return $("div#LinkContainer span[itemscope][itemtype='http://data-vocabulary.org/Breadcrumb']").last().text();
      }
    }

    function category_breadcrumb_text(n) {
      if (n !== undefined) {
        return $("ol.breadcrumb li span[itemprop='title']").eq(n).text();
      } else {
        return $("ol.breadcrumb li span[itemprop='title']").last().text();
      }
    }

    function edit_mode_left_img_right_text(n,type,selector) {
      switch(type) {
        case "text":
          return $(selector).html($("div.article-content div[class^='article-news3-'].Pro_content2:eq("+ n +") div").html());
          break;
        case "img":
          return $("div.article-content div[class^='article-news3-'].Pro_content2:eq("+ n +") div img").clone().appendTo(selector);
          break;
        case "bgimg":
          return $(selector).css("background-image","url(" + $("div.article-content div[class^='article-news3-'].Pro_content2:eq("+ n +") div img").attr("src") + ")");
          break;
        default:
          return "請正確輸入參數，謝謝！";
      }
    }

    function edit_mode_stagger_img_text(n,type,selector){
      switch(type) {
        case "text":
          return $(selector).html($("div.article-content div[class^='article-news2-'].Pro_content:eq("+ n +") div").html());
          break;
        case "img":
          return $("div.article-content div[class^='article-news2-'].Pro_content:eq("+ n +") div img").clone().appendTo(selector);
          break;
        case "bgimg":
          return $(selector).css("background-image","url(" + $("div.article-content div[class^='article-news2-'].Pro_content:eq("+ n +") div img").attr("src") + ")");
          break;
        default:
          return "請正確輸入參數，謝謝！";
      }
    }

    function edit_mode_top_img_bottom_text(n,type,selector) {
      switch(type) {
        case "text":
          return $(selector).text($("article.article-content div.arti-news p").eq(n).text());
          break;
        case "img":
          return $("article.article-content div.arti-news img").eq(n).clone().appendTo(selector);
          break;
        case "bgimg":
          return $(selector).css("background-image","url(" + $("article.article-content div.arti-news img").eq(n).attr("src") + ")");
          break;
        default:
          return "請正確輸入參數，謝謝！";
      }
    }

    function edit_viwe_margin_bottom_zero(n) {
      if(n) {$("div.article-content div[class^='article-news3-'].Pro_content2:empty,div.article-content div[class^='article-news2-'].Pro_content:empty").css("display", "none");}
    }
  });
})(jQuery)
