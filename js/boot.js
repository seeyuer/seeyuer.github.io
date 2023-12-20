/* global Fluid */

Fluid.boot = {};

Fluid.boot.registerEvents = function () {
  Fluid.events.billboard();
  Fluid.events.registerNavbarEvent();
  Fluid.events.registerParallaxEvent();
  Fluid.events.registerScrollDownArrowEvent();
  // 文章页面调整评论区按钮
  Fluid.events.registerScrollToCommentsEvent();
  Fluid.events.registerScrollTopArrowEvent();
  Fluid.events.registerImageLoadedEvent();
};

Fluid.boot.refresh = function () {
  Fluid.plugins.fancyBox();
  Fluid.plugins.codeWidget();
  Fluid.events.refresh();
};

document.addEventListener('DOMContentLoaded', function () {
  Fluid.boot.registerEvents();
});
