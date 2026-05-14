/**
 * ============================================================
 * offer-compare.js - Offer智能对比页逻辑
 * 功能：添加/删除Offer、多维度对比、推荐结果
 * ============================================================
 */

(function () {
  'use strict';

  var offers    = [];   // 存储所有Offer数据
  var maxOffers = 3;

  /* ===================== Offer 模板数据 ===================== */
  var emptyOffer = function (idx) {
    return {
      id:         Date.now() + idx,
      company:     '',
      position:    '',
      salary:      '',
      bonus:       '',
      stock:       '',
      workHours:   '',
      location:    '',
      housing:     '',
      insurance:   '',
      promoSpeed:  '3',
      overall:     ''
    };
  };

  /* ===================== 渲染输入卡片 ===================== */
  function renderCards() {
    var container = document.getElementById('ocCards');
    var countEl   = document.getElementById('offerCount');
    var btnWrap   = document.getElementById('compareBtnWrap');
    if (!container) return;

    // 更新计数
    if (countEl) countEl.textContent = offers.length;

    // 显示/隐藏对比按钮
    if (btnWrap) btnWrap.style.display = offers.length >= 2 ? 'block' : 'none';

    // 隐藏结果
    var result = document.getElementById('ocResult');
    if (result) result.style.display = 'none';

    container.innerHTML = '';

    // 渲染已有Offer卡片
    offers.forEach(function (offer, idx) {
      var card = document.createElement('div');
      card.className = 'oc-card fade-in-up';
      card.innerHTML = ''
        + '<div class="oc-card-header">'
        +   '<div class="oc-card-title"><span class="oc-num">' + (idx + 1) + '</span> Offer #' + (idx + 1) + '</div>'
        +   '<button class="oc-remove-btn" onclick="removeOffer(' + offer.id + ')" title="删除">'
        +     '<i class="fas fa-trash-alt"></i>'
        +   '</button>'
        + '</div>'
        + '<div class="oc-field-row">'
        +   '<div class="oc-field">'
        +     '<label>公司名称</label>'
        +     '<input type="text" placeholder="如：字节跳动" value="' + (offer.company || '') + '" onchange="updateOffer(' + offer.id + ',\'company\',this.value)">'
        +   '</div>'
        +   '<div class="oc-field">'
        +     '<label>岗位名称</label>'
        +     '<input type="text" placeholder="如：后端开发" value="' + (offer.position || '') + '" onchange="updateOffer(' + offer.id + ',\'position\',this.value)">'
        +   '</div>'
        + '</div>'
        + '<div class="oc-field-row">'
        +   '<div class="oc-field">'
        +     '<label>年薪（万）</label>'
        +     '<input type="number" placeholder="如：40" value="' + (offer.salary || '') + '" onchange="updateOffer(' + offer.id + ',\'salary\',this.value)">'
        +   '</div>'
        +   '<div class="oc-field">'
        +     '<label>年终奖（月数）</label>'
        +     '<input type="number" placeholder="如：4" value="' + (offer.bonus || '') + '" onchange="updateOffer(' + offer.id + ',\'bonus\',this.value)">'
        +   '</div>'
        + '</div>'
        + '<div class="oc-field-row">'
        +   '<div class="oc-field">'
        +     '<label>股票/期权</label>'
        +     '<select onchange="updateOffer(' + offer.id + ',\'stock\',this.value)">'
        +       '<option value="">请选择</option>'
        +       '<option value="有"' + (offer.stock === '有' ? ' selected' : '') + '>有</option>'
        +       '<option value="无"' + (offer.stock === '无' ? ' selected' : '') + '>无</option>'
        +     '</select>'
        +   '</div>'
        +   '<div class="oc-field">'
        +     '<label>工作强度</label>'
        +     '<select onchange="updateOffer(' + offer.id + ',\'workHours\',this.value)">'
        +       '<option value="">请选择</option>'
        +       '<option value="965"' + (offer.workHours === '965' ? ' selected' : '') + '>965</option>'
        +       '<option value="985"' + (offer.workHours === '985' ? ' selected' : '') + '>985</option>'
        +       '<option value="大小周"' + (offer.workHours === '大小周' ? ' selected' : '') + '>大小周</option>'
        +       '<option value="996"' + (offer.workHours === '996' ? ' selected' : '') + '>996</option>'
        +     '</select>'
        +   '</div>'
        + '</div>'
        + '<div class="oc-field-row">'
        +   '<div class="oc-field">'
        +     '<label>工作地点</label>'
        +     '<input type="text" placeholder="如：北京" value="' + (offer.location || '') + '" onchange="updateOffer(' + offer.id + ',\'location\',this.value)">'
        +   '</div>'
        +   '<div class="oc-field">'
        +     '<label>住房补贴</label>'
        +     '<select onchange="updateOffer(' + offer.id + ',\'housing\',this.value)">'
        +       '<option value="">请选择</option>'
        +       '<option value="有补贴"' + (offer.housing === '有补贴' ? ' selected' : '') + '>有补贴</option>'
        +       '<option value="无补贴"' + (offer.housing === '无补贴' ? ' selected' : '') + '>无补贴</option>'
        +     '</select>'
        +   '</div>'
        + '</div>'
        + '<div class="oc-field">'
        +   '<label>补充医疗保险</label>'
        +   '<select onchange="updateOffer(' + offer.id + ',\'insurance\',this.value)">'
        +     '<option value="">请选择</option>'
        +     '<option value="有"' + (offer.insurance === '有' ? ' selected' : '') + '>有（含家属）</option>'
        +     '<option value="部分"' + (offer.insurance === '部分' ? ' selected' : '') + '>有（仅员工）</option>'
        +     '<option value="无"' + (offer.insurance === '无' ? ' selected' : '') + '>无</option>'
        +   '</select>'
        + '</div>'
        + '<div class="oc-field">'
        +   '<label>晋升速度（1-5，5=最快）</label>'
        +   '<select onchange="updateOffer(' + offer.id + ',\'promoSpeed\',this.value)">'
        +     '<option value="1"' + (offer.promoSpeed === '1' ? ' selected' : '') + '>1 - 很慢</option>'
        +     '<option value="2"' + (offer.promoSpeed === '2' ? ' selected' : '') + '>2 - 较慢</option>'
        +     '<option value="3"' + (offer.promoSpeed === '3' ? ' selected' : '') + '>3 - 一般</option>'
        +     '<option value="4"' + (offer.promoSpeed === '4' ? ' selected' : '') + '>4 - 较快</option>'
        +     '<option value="5"' + (offer.promoSpeed === '5' ? ' selected' : '') + '>5 - 很快</option>'
        +   '</select>'
        + '</div>';
      container.appendChild(card);
    });
  }

  /* ===================== 全局函数 ===================== */
  window.addOffer = function () {
    if (offers.length >= maxOffers) {
      alert('最多添加 ' + maxOffers + ' 个 Offer');
      return;
    }
    offers.push(emptyOffer(offers.length));
    renderCards();
  };

  window.removeOffer = function (id) {
    offers = offers.filter(function (o) { return o.id !== id; });
    renderCards();
  };

  window.updateOffer = function (id, field, value) {
    var offer = offers.find(function (o) { return o.id === id; });
    if (offer) offer[field] = value;
  };

  window.resetAll = function () {
    if (!confirm('确定清空所有 Offer 数据？')) return;
    offers = [];
    renderCards();
    var result = document.getElementById('ocResult');
    if (result) result.style.display = 'none';
  };

  /* ===================== 执行对比 ===================== */
  window.doCompare = function () {
    // 校验
    var unfilled = offers.filter(function (o) { return !o.company || !o.salary; });
    if (unfilled.length > 0) { alert('请填写所有 Offer 的公司名称和年薪！'); return; }

    var result = document.getElementById('ocResult');
    var table  = document.getElementById('ocTable');
    var rec    = document.getElementById('ocRecommend');
    if (!result || !table || !rec) return;

    // 计算得分（简易）
    offers.forEach(function (o) {
      var score = 0;
      score += (parseFloat(o.salary) || 0) * 1.2;
      score += (parseInt(o.bonus) || 0) * 3;
      score += (o.stock === '有') ? 15 : 0;
      score += (o.workHours === '965') ? 20 : (o.workHours === '985') ? 15 : (o.workHours === '大小周') ? 8 : 0;
      score += (o.housing === '有补贴') ? 10 : 0;
      score += (o.insurance === '有') ? 10 : (o.insurance === '部分') ? 5 : 0;
      score += (parseInt(o.promoSpeed) || 3) * 4;
      o._score = Math.round(score * 10) / 10;
    });

    offers.sort(function (a, b) { return b._score - a._score; });
    var bestId = offers[0].id;

    // 渲染对比表格
    var dimensions = [
      { key:'company',     label:'公司名称',     isText:true  },
      { key:'position',    label:'岗位',         isText:true  },
      { key:'salary',     label:'年薪（万）',   isNum:true  },
      { key:'bonus',      label:'年终奖（月）', isNum:true  },
      { key:'stock',      label:'股票/期权',    isText:true  },
      { key:'workHours',  label:'工作强度',     isText:true  },
      { key:'location',   label:'工作地点',     isText:true  },
      { key:'housing',    label:'住房补贴',     isText:true  },
      { key:'insurance',  label:'医疗保险',     isText:true  },
      { key:'promoSpeed', label:'晋升速度',     isNum:true  },
      { key:'_score',     label:'综合得分',     isNum:true, isScore:true }
    ];

    var thead = '<thead><tr><th>对比维度</th>'
              + offers.map(function (o) { return '<th>' + (o.company || '未命名') + '</th>'; }).join('')
              + '</tr></thead>';
    var tbody = '<tbody>';

    dimensions.forEach(function (dim) {
      tbody += '<tr><td style="font-weight:600;color:var(--text-primary)">' + dim.label + '</td>';
      offers.forEach(function (o) {
        var val = o[dim.key];
        var isBest = (o.id === bestId);
        var cls = '';
        if (dim.isNum || dim.isScore) {
          cls = isBest ? 'best-col' : 'worst-col';
        }
        tbody += '<td class="' + cls + '">' + (val || '-') + '</td>';
      });
      tbody += '</tr>';
    });
    tbody += '</tbody>';

    table.innerHTML = thead + tbody;

    // 推荐结果
    var best = offers[0];
    rec.innerHTML = ''
      + '<div class="oc-rec-header">'
      +   '<div class="oc-rec-icon"><i class="fas fa-trophy"></i></div>'
      +   '<div>'
      +     '<div class="oc-rec-title">🏆 推荐选择：' + (best.company || 'Offer #1') + '</div>'
      +     '<div class="oc-rec-subtitle">综合得分最高 · 建议优先考虑</div>'
      +   '</div>'
      + '</div>'
      + '<div class="oc-rec-reason">'
      +   '<p><strong>推荐理由：</strong></p>'
      +   '<ul>'
      +     '<li>年薪 ' + (best.salary || '-') + ' 万，在选项中' + (offers.length > 1 ? (offers[1].salary && best.salary > offers[1].salary ? '领先' : '相当') : '') + '</li>'
      +     '<li>工作强度 ' + (best.workHours || '未填') + '，工作生活平衡较好</li>'
      +     '<li>晋升速度评分 ' + (best.promoSpeed || '-') + '/5，发展空间' + (best.promoSpeed >= 4 ? '大' : '一般') + '</li>'
      +     '<li>补充医疗' + (best.insurance === '有' ? '含家属，福利完善' : '基础') + '</li>'
      +   '</ul>'
      +   '<p style="margin-top:var(--space-md);color:var(--accent);font-weight:600;">⚠️ 以上分析仅供参考，请结合自身职业规划综合判断。</p>'
      + '</div>';

    result.style.display = 'block';
    result.scrollIntoView({ behavior:'smooth', block:'start' });
  };

  /* ===================== 初始化：添加两个示例 ===================== */
  // 默认不添加，让用户自己添加
  renderCards();

})();
