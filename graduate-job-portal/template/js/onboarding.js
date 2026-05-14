/**
 * ============================================================
 * onboarding.js - 入职材料清单页逻辑
 * 功能：按公司类型展示清单、勾选进度、打印
 * ============================================================
 */

(function () {
  'use strict';

  /* ===================== 全量清单数据 ===================== */
  var checklistData = {
    tech: {
      name: '互联网/科技大厂',
      categories: [
        {
          title: '基础身份材料',
          icon:  'fa-id-card',
          iconCls:'blue',
          items: [
            { text: '身份证原件 + 复印件 × 3',         important: true  },
            { text: '最高学历毕业证 + 学位证原件及复印件', important: true  },
            { text: '学信网《教育部学历证书注册备案表》',  important: true  },
            { text: '上一家公司离职证明（如有）',          important: false },
            { text: '银行卡（工资卡，一般指定银行）',     important: true  },
            { text: '个人证件照（白底/蓝底 1寸 4张）',  important: false },
          ]
        },
        {
          title: '三方协议相关',
          icon:  'fa-file-signature',
          iconCls:'orange',
          items: [
            { text: '三方协议原件（应届生必带）',        important: true  },
            { text: '三方协议填写模板参考',              important: false },
            { text: 'Offer 录用函 / 录用邮件截图打印',   important: true  },
            { text: '落户材料（如公司有落户指标）',       important: false },
          ]
        },
        {
          title: '体检报告',
          icon:  'fa-notes-medical',
          iconCls:'green',
          items: [
            { text: '入职体检报告（3个月内有效）',      important: true  },
            { text: '体检项目：常规+胸透+心电图+血常规',important: false },
            { text: '部分大厂要求指定医院体检，注意HR通知', important: false },
          ]
        },
        {
          title: '背景调查材料',
          icon:  'fa-user-check',
          iconCls:'purple',
          items: [
            { text: '实习/工作经历证明（背调用）',       important: false },
            { text: '实习主管/导师联系方式（备用）',     important: false },
            { text: '无犯罪记录证明（部分外企/国企要求）',important: false },
          ]
        },
        {
          title: '入职当天物品',
          icon:  'fa-briefcase',
          iconCls:'cyan',
          items: [
            { text: '笔记本电脑（如公司不提供）',        important: false },
            { text: '笔记本 + 笔（入职培训用）',          important: false },
            { text: '充电器 / 充电宝',                   important: false },
            { text: '入职当天下雨备伞',                  important: false },
          ]
        }
      ]
    },
    state: {
      name: '国企/事业单位',
      categories: [
        {
          title: '基础身份材料',
          icon:  'fa-id-card',
          iconCls:'blue',
          items: [
            { text: '身份证原件 + 复印件 × 5',         important: true  },
            { text: '毕业证 + 学位证原件及复印件 × 2',  important: true  },
            { text: '学信网学历认证报告',                important: true  },
            { text: '户口本首页 + 本人页复印件',          important: true  },
            { text: '证件照（1寸 6张，2寸 2张）',      important: true  },
          ]
        },
        {
          title: '编制/档案材料',
          icon:  'fa-archive',
          iconCls:'orange',
          items: [
            { text: '三方协议（应届生）',                important: true  },
            { text: '档案转移单 / 调档函',               important: true  },
            { text: '党员组织关系转移介绍信（党员）',     important: false },
            { text: '户籍证明（办理户口用）',             important: false },
          ]
        },
        {
          title: '体检及政审',
          icon:  'fa-notes-medical',
          iconCls:'green',
          items: [
            { text: '公务员/事业单位体检标准报告',        important: true  },
            { text: '无犯罪记录证明',                    important: true  },
            { text: '个人征信报告（部分涉密岗位要求）',   important: false },
          ]
        },
        {
          title: '入职当天物品',
          icon:  'fa-briefcase',
          iconCls:'cyan',
          items: [
            { text: '签字笔 + 记事本',                   important: false },
            { text: '水杯 / 个人用品',                   important: false },
          ]
        }
      ]
    },
    foreign: {
      name: '外企',
      categories: [
        {
          title: '基础身份材料',
          icon:  'fa-id-card',
          iconCls:'blue',
          items: [
            { text: '身份证原件 + 复印件',               important: true  },
            { text: '毕业证 + 学位证原件及复印件',        important: true  },
            { text: '英文版简历（打印备用）',            important: false },
            { text: '护照（如有跨国业务）',              important: false },
          ]
        },
        {
          title: '体检报告',
          icon:  'fa-notes-medical',
          iconCls:'green',
          items: [
            { text: '入职体检报告',                      important: true  },
            { text: '部分外企要求心理健康评估',           important: false },
          ]
        },
        {
          title: '入职当天物品',
          icon:  'fa-briefcase',
          iconCls:'cyan',
          items: [
            { text: '笔记本电脑（如公司不提供）',        important: false },
            { text: '笔记本 + 笔',                       important: false },
          ]
        }
      ]
    },
    sme: {
      name: '中小民企',
      categories: [
        {
          title: '基础身份材料',
          icon:  'fa-id-card',
          iconCls:'blue',
          items: [
            { text: '身份证原件 + 复印件',               important: true  },
            { text: '毕业证原件及复印件',                important: true  },
            { text: '银行卡（工资卡）',                  important: true  },
            { text: '个人证件照 2张',                    important: false },
          ]
        },
        {
          title: '入职当天物品',
          icon:  'fa-briefcase',
          iconCls:'cyan',
          items: [
            { text: '笔记本 + 笔',                       important: false },
            { text: '个人水杯',                          important: false },
          ]
        }
      ]
    }
  };

  var currentType   = 'tech';
  var checkedState = {};   // { 'tech-0-0': true }

  /* ===================== 渲染清单 ===================== */
  function renderList() {
    var container = document.getElementById('obList');
    if (!container) return;

    var data = checklistData[currentType];
    if (!data) return;

    container.innerHTML = '';

    data.categories.forEach(function (cat, ci) {
      var catEl = document.createElement('div');
      catEl.className = 'ob-cat';

      // 头部
      var header = document.createElement('div');
      header.className = 'ob-cat-header';
      header.innerHTML = ''
        + '<div class="ob-cat-icon ' + cat.iconCls + '"><i class="fas ' + cat.icon + '"></i></div>'
        + '<span class="ob-cat-title">' + cat.title + '</span>'
        + '<span class="ob-cat-count">' + cat.items.length + '项</span>'
        + '<i class="fas fa-chevron-down ob-cat-toggle"></i>';
      header.addEventListener('click', function () {
        this.classList.toggle('collapsed');
      });

      // 子项
      var itemsWrap = document.createElement('div');
      itemsWrap.className = 'ob-cat-items';

      cat.items.forEach(function (item, ii) {
        var key = currentType + '-' + ci + '-' + ii;
        var checked = !!checkedState[key];

        var itemEl = document.createElement('div');
        itemEl.className = 'ob-item' + (checked ? ' checked' : '');
        itemEl.setAttribute('data-key', key);
        itemEl.onclick = function () { toggleItem(key); };

        var tagHtml = '';
        if (item.important) tagHtml = '<span class="ob-item-tag important">必带</span>';
        else tagHtml = '<span class="ob-item-tag optional">选带</span>';

        itemEl.innerHTML = ''
          + '<div class="ob-cb"><i class="fas fa-check"></i></div>'
          + '<span class="ob-item-text">' + item.text + '</span>'
          + tagHtml;

        itemsWrap.appendChild(itemEl);
      });

      catEl.appendChild(header);
      catEl.appendChild(itemsWrap);
      container.appendChild(catEl);
    });

    updateProgress();
  }

  /* ===================== 勾选切换 ===================== */
  window.toggleItem = function (key) {
    checkedState[key] = !checkedState[key];
    var el = document.querySelector('[data-key="' + key + '"]');
    if (el) {
      el.classList.toggle('checked');
    }
    updateProgress();
  };

  /* ===================== 更新进度 ===================== */
  function updateProgress() {
    var data = checklistData[currentType];
    if (!data) return;

    var total = 0;
    data.categories.forEach(function (cat, ci) {
      cat.items.forEach(function (_, ii) {
        total++;
      });
    });

    var checked = 0;
    data.categories.forEach(function (cat, ci) {
      cat.items.forEach(function (_, ii) {
        if (checkedState[currentType + '-' + ci + '-' + ii]) checked++;
      });
    });

    var pct = total > 0 ? Math.round(checked / total * 100) : 0;

    var textEl = document.getElementById('obProgressText');
    var fillEl = document.getElementById('obProgressFill');
    if (textEl) textEl.textContent = checked + '/' + total + ' (' + pct + '%)';
    if (fillEl) fillEl.style.width = pct + '%';
  }

  /* ===================== 切换公司类型 ===================== */
  window.switchType = function (btn, type) {
    currentType = type;
    document.querySelectorAll('.ob-type-btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    renderList();
  };

  /* ===================== 重置 ===================== */
  window.resetChecklist = function () {
    if (!confirm('确定重置所有勾选状态？')) return;
    checkedState = {};
    renderList();
  };

  /* ===================== 打印 ===================== */
  window.printChecklist = function () {
    window.print();
  };

  /* ===================== 初始化 ===================== */
  renderList();

})();
