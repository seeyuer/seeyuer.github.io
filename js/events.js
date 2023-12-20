/* global Fluid */

HTMLElement.prototype.wrap = function (wrapper) {
  this.parentNode.insertBefore(wrapper, this);
  this.parentNode.removeChild(this);
  wrapper.appendChild(this);
};

Fluid.events = {

  registerNavbarEvent: function () {
    var navbar = jQuery('#navbar');
    if (navbar.length === 0) {
      return;
    }
    var submenu = jQuery('#navbar .dropdown-menu');
    if (navbar.offset().top > 0) {
      navbar.removeClass('navbar-dark');
      submenu.removeClass('navbar-dark');
    }
    Fluid.utils.listenScroll(function () {
      navbar[navbar.offset().top > 50 ? 'addClass' : 'removeClass']('top-nav-collapse');
      submenu[navbar.offset().top > 50 ? 'addClass' : 'removeClass']('dropdown-collapse');
      if (navbar.offset().top > 0) {
        navbar.removeClass('navbar-dark');
        submenu.removeClass('navbar-dark');
      } else {
        navbar.addClass('navbar-dark');
        submenu.removeClass('navbar-dark');
      }
    });
    jQuery('#navbar-toggler-btn').on('click', function () {
      jQuery('.animated-icon').toggleClass('open');
      jQuery('#navbar').toggleClass('navbar-col-show');
    });
  },

  registerParallaxEvent: function () {
    var ph = jQuery('#banner[parallax="true"]');
    if (ph.length === 0) {
      return;
    }
    var board = jQuery('#board');
    if (board.length === 0) {
      return;
    }
    var parallax = function () {
      var pxv = jQuery(window).scrollTop() / 5;
      var offset = parseInt(board.css('margin-top'), 10);
      var max = 96 + offset;
      if (pxv > max) {
        pxv = max;
      }
      ph.css({
        transform: 'translate3d(0,' + pxv + 'px,0)'
      });
      var sideCol = jQuery('.side-col');
      if (sideCol) {
        sideCol.css({
          'padding-top': pxv + 'px'
        });
      }
    };
    Fluid.utils.listenScroll(parallax);
  },

  registerScrollDownArrowEvent: function () {
    var scrollbar = jQuery('.scroll-down-bar');
    if (scrollbar.length === 0) {
      return;
    }
    scrollbar.on('click', function () {
      Fluid.utils.scrollToElement('#board', -jQuery('#navbar').height());
    });
  },

  registerScrollTopArrowEvent: function () {
    var topArrow = jQuery('#scroll-top-button');
    if (topArrow.length === 0) {
      return;
    }
    var board = jQuery('#board');
    if (board.length === 0) {
      return;
    }
    var posDisplay = false;
    var scrollDisplay = false;
    // Position
    var setTopArrowPos = function () {
      var boardRight = board[0].getClientRects()[0].right;
      var bodyWidth = document.body.offsetWidth;
      var right = bodyWidth - boardRight;
      posDisplay = right >= 50;
      topArrow.css({
        'bottom': posDisplay && scrollDisplay ? '20px' : '-60px',
        'right': right - 64 + 'px'
      });
    };
    setTopArrowPos();
    jQuery(window).resize(setTopArrowPos);
    // Display
    var headerHeight = board.offset().top;
    Fluid.utils.listenScroll(function () {
      var scrollHeight = document.body.scrollTop + document.documentElement.scrollTop;
      scrollDisplay = scrollHeight >= headerHeight;
      topArrow.css({
        'bottom': posDisplay && scrollDisplay ? '20px' : '-60px'
      });
    });
    // Click
    topArrow.on('click', function () {
      jQuery('body,html').animate({
        scrollTop: 0,
        easing: 'swing'
      });
    });
  },

  // 文章页面调整评论区按钮
  registerScrollToCommentsEvent: function () {
    var offsetToComments = 70;
    var bottomComment = jQuery('#scroll-comment-button');
    if (bottomComment.length === 0) {
      return;
    }
    var board = jQuery('#board');
    if (board.length === 0) {
      return;
    }
    var posDisplay = false;
    var scrollDisplay = false;
    // Position
    var setCommentButtonPos = function () {
      var boardRight = board[0].getClientRects()[0].right;
      var bodyWidth = document.body.offsetWidth;
      var right = bodyWidth - boardRight;
      posDisplay = right >= 50;
      bottomComment.css({
        'bottom': posDisplay && scrollDisplay ? '80px' : '-60px',
        'right': right - 64 + 'px'
      });
    };
    setCommentButtonPos();
    jQuery(window).resize(setCommentButtonPos);
    // Display
    var headerHeight = board.offset().top;
    Fluid.utils.listenScroll(function () {
      var scrollHeight = document.body.scrollTop + document.documentElement.scrollTop;
      scrollDisplay = scrollHeight >= headerHeight;
      bottomComment.css({
        'bottom': posDisplay && scrollDisplay ? '80px' : '-60px'
      });
    });
    var setCommentButtonPos = function () {
      var boardRight = board[0].getClientRects()[0].right;
      var bodyWidth = document.body.offsetWidth;
      var right = bodyWidth - boardRight;
      posDisplay = right >= 50;
      bottomComment.css({
        'bottom': posDisplay && scrollDisplay ? '20px' : '-60px',
        'right': right - 64 + 'px'
      });
    };
    // Click
    bottomComment.on('click', function () {
      var commentsSection = jQuery('#comments');
      if (commentsSection.length > 0) {
        var scrollTo = commentsSection.offset().top - offsetToComments;
        jQuery('body,html').animate({
          scrollTop: scrollTo,
          easing: 'swing'
        });
      }
    });
    // Button Aimation
    let commentsSection = document.querySelector("#comments"); // 获取评论区的div元素
    let scrollButton = document.querySelector("#scroll-comment-button"); // 获取跳转按钮元素
    // 添加页面滚动事件监听
    document.addEventListener("scroll", handleScroll);
    // 页面滚动事件处理函数
    function handleScroll() {
      // 获取评论区相对于页面的位置
      const sectionRect = commentsSection.getBoundingClientRect();
      // 评论区顶部相对于当前页面顶部的垂直距离
      const distanceFromTop = sectionRect.top;
      // 如果评论区顶部在页面高度内
      if (distanceFromTop > window.innerHeight && distanceFromTop > 0) {
        // 显示跳转按钮，应用淡入效果
        scrollButton.style.visibility = "visible";
        scrollButton.style.opacity = "1";
        scrollButton.style.transition = "background-color .2s, bottom .3s, opacity .5s, color .3s";
      } else {
        // 隐藏跳转按钮，应用淡出效果
        scrollButton.style.visibility = "hidden";
        scrollButton.style.opacity = "0";
        scrollButton.style.transition = "background-color .2s, bottom .3s, visibility 0s .5s, opacity .5s";
      }
    }
  },

  registerImageLoadedEvent: function () {
    if (!('NProgress' in window)) { return; }

    var bg = document.getElementById('banner');
    if (bg) {
      var src = bg.style.backgroundImage;
      var url = src.match(/\((.*?)\)/)[1].replace(/(['"])/g, '');
      var img = new Image();
      img.onload = function () {
        window.NProgress && window.NProgress.inc(0.2);
      };
      img.src = url;
      if (img.complete) { img.onload(); }
    }

    var notLazyImages = jQuery('main img:not([lazyload])');
    var total = notLazyImages.length;
    for (const img of notLazyImages) {
      const old = img.onload;
      img.onload = function () {
        old && old();
        window.NProgress && window.NProgress.inc(0.5 / total);
      };
      if (img.complete) { img.onload(); }
    }
  },

  registerRefreshCallback: function (callback) {
    if (!Array.isArray(Fluid.events._refreshCallbacks)) {
      Fluid.events._refreshCallbacks = [];
    }
    Fluid.events._refreshCallbacks.push(callback);
  },

  refresh: function () {
    if (Array.isArray(Fluid.events._refreshCallbacks)) {
      for (var callback of Fluid.events._refreshCallbacks) {
        if (callback instanceof Function) {
          callback();
        }
      }
    }
  },

  billboard: function () {
    if (!('console' in window)) {
      return;
    }
    // eslint-disable-next-line no-console
    console.log(`
-------------------------------------------------
|                                               |
|      ________  __            _        __      |
|     |_   __  |[  |          (_)      |  ]     |
|       | |_ \\_| | | __   _   __   .--.| |      |
|       |  _|    | |[  | | | [  |/ /'\`\\' |      |
|      _| |_     | | | \\_/ |, | || \\__/  |      |
|     |_____|   [___]'.__.'_/[___]'.__.;__]     |
|                                               |
|            Powered by Hexo x Fluid            |
| https://github.com/fluid-dev/hexo-theme-fluid |
|                                               |
-------------------------------------------------
    `);
  }
};
