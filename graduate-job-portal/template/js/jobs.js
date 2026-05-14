/**
 * ============================================================
 * jobs.js - 岗位列表页逻辑
 * 功能：岗位数据渲染、筛选、排序、分页加载
 * ============================================================
 */

(function () {
  'use strict';

  /* ===================== 全量模拟数据 ===================== */
  var allJobs = [
    { logo:'🏢', company:'字节跳动', title:'后端开发工程师（应届生）', tags:['北京','应届','技术'],     salary:'35-45万/年', date:'3天前',  city:'北京', type:'技术' },
    { logo:'🌐', company:'腾讯',     title:'前端开发工程师（2025校招）', tags:['深圳','应届','大厂'],     salary:'30-42万/年', date:'1天前',  city:'深圳', type:'技术' },
    { logo:'🔷', company:'华为',     title:'Java开发工程师（应届生）',   tags:['上海','应届','通信'],     salary:'28-38万/年', date:'5天前',  city:'上海', type:'技术' },
    { logo:'🟢', company:'美团',     title:'算法工程师（应届生）',       tags:['北京','应届','算法'],     salary:'32-44万/年', date:'2天前',  city:'北京', type:'技术' },
    { logo:'🔶', company:'小米',     title:'测试开发工程师（校招）',     tags:['北京','应届','智能制造'], salary:'25-35万/年', date:'4天前',  city:'北京', type:'技术' },
    { logo:'🟣', company:'网易',     title:'数据分析师（2025校招）',     tags:['杭州','应届','游戏'],     salary:'22-32万/年', date:'1天前',  city:'杭州', type:'技术' },
    { logo:'🟠', company:'京东',     title:'产品经理（应届生）',         tags:['北京','应届','电商'],     salary:'25-35万/年', date:'2天前',  city:'北京', type:'产品' },
    { logo:'🔵', company:'百度',     title:'AI算法工程师（校招）',       tags:['北京','应届','AI'],        salary:'35-48万/年', date:'6天前',  city:'北京', type:'技术' },
    { logo:'🟡', company:'阿里巴巴', title:'Java后端开发（应届生）',     tags:['杭州','应届','大厂'],     salary:'30-42万/年', date:'3天前',  city:'杭州', type:'技术' },
    { logo:'⚪', company:'拼多多',   title:'前端工程师（2025校招）',     tags:['上海','应届','电商'],     salary:'32-45万/年', date:'1天前',  city:'上海', type:'技术' },
    { logo:'🎯', company:'哔哩哔哩', title:'UI设计师（应届生）',         tags:['上海','应届','设计'],     salary:'20-28万/年', date:'4天前',  city:'上海', type:'设计' },
    { logo:'📱', company:'OPPO',    title:'嵌入式开发工程师（校招）',   tags:['深圳','应届','硬件'],     salary:'24-34万/年', date:'5天前',  city:'深圳', type:'技术' },
  ];

  var displayedCount = 0;
  var pageSize      = 6;
  var currentSort   = 'default';
  var activeTags    = [];

  /* ===================== 渲染卡片 ===================== */
  function renderJobCard(job) {
    return ''
      + '<div class="job-card fade-in-up" onclick="location.href=\'job-detail.html\'">'
      +   '<div class="job-card-header">'
      +     '<div class="jc-logo">' + job.logo + '</div>'
      +     '<div class="jc-info">'
      +       '<div class="jc-company">' + job.company + '</div>'
      +       '<div class="jc-title">' + job.title + '</div>'
      +     '</div>'
      +     '<div class="jc-salary">' + job.salary + '</div>'
      +   '</div>'
      +   '<div class="job-card-tags">'
      +     job.tags.map(function(t){ return '<span class="jc-tag">' + t + '</span>'; }).join('')
      +   '</div>'
      +   '<div class="job-card-footer">'
      +     '<div class="jc-meta">'
      +       '<span><i class="far fa-clock"></i> ' + job.date + '</span>'
      +       '<span><i class="fas fa-map-marker-alt"></i> ' + job.city + '</span>'
      +     '</div>'
      +     '<span style="color:var(--accent);font-size:0.82rem;font-weight:600;">查看详情 →</span>'
      +   '</div>'
      + '</div>';
  }

  /* ===================== 筛选 + 排序 ===================== */
  function getFilteredJobs() {
    var city   = document.getElementById('filterCity').value;
    var type   = document.getElementById('filterType').value;
    var search = document.getElementById('searchInput').value.trim().toLowerCase();

    var result = allJobs.filter(function (j) {
      if (city && j.city !== city) return false;
      if (type && j.type !== type) return false;
      if (search && j.company.toLowerCase().indexOf(search) === -1 && j.title.toLowerCase().indexOf(search) === -1) return false;
      if (activeTags.length > 0) {
        var match = false;
        for (var i = 0; i < activeTags.length; i++) {
          if (j.title.indexOf(activeTags[i]) !== -1 || j.tags.indexOf(activeTags[i]) !== -1) { match = true; break; }
        }
        if (!match) return false;
      }
      return true;
    });

    // 排序
    if (currentSort === 'salary') {
      result.sort(function (a, b) {
        var aMin = parseInt(a.salary.match(/\d+/)[0], 10);
        var bMin = parseInt(b.salary.match(/\d+/)[0], 10);
        return bMin - aMin;
      });
    } else if (currentSort === 'date') {
      var order = { '1天前':1, '2天前':2, '3天前':3, '4天前':4, '5天前':5, '6天前':6, '7天前':7 };
      result.sort(function (a, b) { return (order[a.date] || 99) - (order[b.date] || 99); });
    }

    return result;
  }

  /* ===================== 加载岗位 ===================== */
  function loadJobs(reset) {
    var grid = document.getElementById('jobsGrid');
    if (!grid) return;

    if (reset) {
      displayedCount = 0;
      grid.innerHTML = '';
    }

    var filtered = getFilteredJobs();
    var toShow = filtered.slice(displayedCount, displayedCount + pageSize);

    toShow.forEach(function (job, idx) {
      var div = document.createElement('div');
      div.innerHTML = renderJobCard(job);
      var card = div.firstElementChild;
      card.classList.add('delay-' + ((idx % 5) + 1));
      grid.appendChild(card);
    });

    displayedCount += toShow.length;

    // 更新计数
    var countEl = document.getElementById('resultCount');
    if (countEl) countEl.textContent = filtered.length;

    // 隐藏"加载更多"
    var btn = document.getElementById('loadMoreBtn');
    if (btn) btn.style.display = displayedCount >= filtered.length ? 'none' : 'inline-flex';
  }

  /* ===================== 全局函数 ===================== */
  window.applyFilters = function () { loadJobs(true); };
  window.loadMore     = function () { loadJobs(false); };
  window.setSort      = function (btn, sort) {
    currentSort = sort;
    document.querySelectorAll('.sort-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    loadJobs(true);
  };
  window.toggleTag = function (el) {
    var tag = el.textContent.trim();
    var idx = activeTags.indexOf(tag);
    if (idx === -1) { activeTags.push(tag); el.classList.add('active'); }
    else { activeTags.splice(idx, 1); el.classList.remove('active'); }
    loadJobs(true);
  };

  /* ===================== 初始化 ===================== */
  loadJobs(true);

  // 搜索框回车
  var searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keyup', function (e) {
      if (e.key === 'Enter') window.applyFilters();
    });
  }

})();
