/**
 * ============================================================
 * index.js - 首页专用逻辑
 * 功能：轮播公告、热门岗位渲染、Hero粒子效果
 * ============================================================
 */

(function () {
  'use strict';

  /* ===================== 轮播公告数据 ===================== */
  var carouselData = [
    {
      badge: { text: '热门', type: 'hot' },
      text:  '字节跳动2025届秋招提前批正式启动！算法/后端/前端等2000+岗位',
      link:  '#'
    },
    {
      badge: { text: '新机会', type: 'new' },
      text:  '华为2025届校招补录进行中，年薪最高45万，截止5月30日',
      link:  '#'
    },
    {
      badge: { text: '通知', type: 'info' },
      text:  '平台新增「三方协议填写模板」下载，避免签约踩坑！',
      link:  '#'
    },
    {
      badge: { text: '热门', type: 'hot' },
      text:  '腾讯2025校招转正率78%，面经合集已更新，点击查看',
      link:  '#'
    }
  ];

  /* ===================== 渲染轮播 ===================== */
  var track = document.getElementById('carouselTrack');
  var dots  = document.getElementById('carouselDots');
  var currentSlide = 0;
  var slideTimer  = null;

  function renderCarousel() {
    if (!track || !dots) return;

    // 渲染轮播项
    track.innerHTML = carouselData.map(function (item, idx) {
      return ''
        + '<div class="carousel-item' + (idx === 0 ? ' active' : '') + '" data-index="' + idx + '">'
        +   '<span class="ci-badge ' + item.badge.type + '">' + item.badge.text + '</span>'
        +   '<span class="ci-text">' + item.text + '</span>'
        +   '<a href="' + item.link + '" class="ci-link">查看详情 <i class="fas fa-chevron-right"></i></a>'
        + '</div>';
    }).join('');

    // 渲染指示点
    dots.innerHTML = carouselData.map(function (_, idx) {
      return '<div class="carousel-dot' + (idx === 0 ? ' active' : '') + '" data-index="' + idx + '"></div>';
    }).join('');

    // 绑定点击
    dots.querySelectorAll('.carousel-dot').forEach(function (dot) {
      dot.addEventListener('click', function () {
        goToSlide(parseInt(this.getAttribute('data-index'), 10));
      });
    });
  }

  function goToSlide(index) {
    var items = track.querySelectorAll('.carousel-item');
    var dotEls = dots.querySelectorAll('.carousel-dot');
    if (!items.length) return;

    items[currentSlide].classList.remove('active');
    dotEls[currentSlide].classList.remove('active');

    currentSlide = (index + items.length) % items.length;

    items[currentSlide].classList.add('active');
    dotEls[currentSlide].classList.add('active');
  }

  function startAutoPlay() {
    stopAutoPlay();
    slideTimer = setInterval(function () {
      goToSlide(currentSlide + 1);
    }, 4000);
  }

  function stopAutoPlay() {
    if (slideTimer) { clearInterval(slideTimer); slideTimer = null; }
  }

  // 初始化轮播
  renderCarousel();
  startAutoPlay();

  // 鼠标悬停暂停
  var wrapper = document.querySelector('.carousel-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAutoPlay);
    wrapper.addEventListener('mouseleave', startAutoPlay);
  }

  /* ===================== 热门岗位数据 ===================== */
  var hotJobs = [
    {
      logo:   '🏢',
      company:'字节跳动',
      title:   '后端开发工程师（应届生）',
      tags:    ['北京', '应届', '技术'],
      salary:  '35-45万/年',
      date:    '3天前',
      badge:   'hot'
    },
    {
      logo:   '🌐',
      company:'腾讯',
      title:   '前端开发工程师（2025校招）',
      tags:    ['深圳', '应届', '大厂'],
      salary:  '30-42万/年',
      date:    '1天前',
      badge:   'hot'
    },
    {
      logo:   '🔷',
      company:'华为',
      title:   'Java开发工程师（应届生）',
      tags:    ['上海', '应届', '通信'],
      salary:  '28-38万/年',
      date:    '5天前',
      badge:   'new'
    },
    {
      logo:   '🟢',
      company:'美团',
      title:   '算法工程师（应届生）',
      tags:    ['北京', '应届', '算法'],
      salary:  '32-44万/年',
      date:    '2天前',
      badge:   ''
    },
    {
      logo:   '🔶',
      company:'小米',
      title:   '测试开发工程师（校招）',
      tags:    ['北京', '应届', '智能制造'],
      salary:  '25-35万/年',
      date:    '4天前',
      badge:   'new'
    },
    {
      logo:   '🟣',
      company:'网易',
      title:   '数据分析师（2025校招）',
      tags:    ['杭州', '应届', '游戏'],
      salary:  '22-32万/年',
      date:    '1天前',
      badge:   ''
    }
  ];

  /* ===================== 渲染热门岗位 ===================== */
  var grid = document.getElementById('hotJobsGrid');

  function renderHotJobs() {
    if (!grid) return;

    grid.innerHTML = hotJobs.map(function (job) {
      var badgeHtml = job.badge
        ? '<span class="badge badge-' + (job.badge === 'hot' ? 'hot' : 'new') + '">'
          + (job.badge === 'hot' ? '🔥 热门' : '🆕 新机会')
          + '</span>'
        : '';

      return ''
        + '<div class="job-preview-card" onclick="location.href=\'job-detail.html\'">'
        +   '<div class="jpc-header">'
        +     '<div class="jpc-logo">' + job.logo + '</div>'
        +     '<div>'
        +       '<div class="jpc-company">' + job.company + '</div>'
        +       '<div class="jpc-job-title">' + job.title + '</div>'
        +     '</div>'
        +   '</div>'
        +   '<div class="jpc-tags">'
        +     badgeHtml
        +     job.tags.map(function (t) { return '<span class="jpc-tag">' + t + '</span>'; }).join('')
        +   '</div>'
        +   '<div class="jpc-footer">'
        +     '<span class="jpc-salary">' + job.salary + '</span>'
        +     '<span class="jpc-meta"><i class="far fa-clock"></i> ' + job.date + '</span>'
        +   '</div>'
        + '</div>';
    }).join('');
  }

  renderHotJobs();

  /* ===================== Hero 粒子效果（轻量） ===================== */
  var particleContainer = document.getElementById('heroParticles');
  if (particleContainer) {
    for (var i = 0; i < 20; i++) {
      var p = document.createElement('div');
      p.style.cssText = ''
        + 'position:absolute;'
        + 'width:' + (2 + Math.random() * 4) + 'px;'
        + 'height:' + (2 + Math.random() * 4) + 'px;'
        + 'background:' + (Math.random() > 0.5 ? 'rgba(79,110,247,0.6)' : 'rgba(0,212,255,0.6)') + ';'
        + 'border-radius:50%;'
        + 'top:' + Math.random() * 100 + '%;'
        + 'left:' + Math.random() * 100 + '%;'
        + 'animation:float ' + (10 + Math.random() * 20) + 's ease-in-out infinite;'
        + 'animation-delay:' + -(Math.random() * 20) + 's;';
      particleContainer.appendChild(p);
    }
  }

})();
