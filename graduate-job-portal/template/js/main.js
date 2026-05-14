/**
 * ============================================================
 * main.js - 全站通用交互逻辑
 * 功能：导航栏滚动、移动端菜单、数字递增动画、通用工具函数
 * ============================================================
 */

(function () {
  'use strict';

  /* ===================== 导航栏滚动效果 ===================== */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* ===================== 移动端菜单 ===================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks     = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('mobile-open');
      // 按钮动画
      const spans = this.querySelectorAll('span');
      if (navLinks.classList.contains('mobile-open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });

    // 点击导航链接后关闭菜单
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('mobile-open');
        var spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      });
    });
  }

  /* ===================== 数字递增动画 ===================== */
  function animateCountUp(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    var duration  = 2000;           // 动画持续2秒
    var startTime = null;
    var startVal  = 0;

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      // easeOutExpo 缓动
      var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      var current = Math.floor(eased * target);
      el.textContent = current.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(step);
  }

  // 当元素进入视口时触发数字动画
  var countEls = document.querySelectorAll('.stat-num[data-target]');
  if ('IntersectionObserver' in window && countEls.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCountUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    countEls.forEach(function (el) { observer.observe(el); });
  }

  /* ===================== 滚动入场动画 ===================== */
  var fadeEls = document.querySelectorAll('.fade-in-up');
  if ('IntersectionObserver' in window && fadeEls.length > 0) {
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(function (el) {
      el.style.animationPlayState = 'paused';
      fadeObserver.observe(el);
    });
  }

  /* ===================== 工具函数：防抖 ===================== */
  function debounce(fn, delay) {
    var timer = null;
    return function () {
      var ctx  = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(ctx, args); }, delay);
    };
  }

  /* ===================== 导出全局API ===================== */
  window.App = {
    debounce: debounce,
    animateCountUp: animateCountUp
  };

})();
