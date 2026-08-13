/* 9nagent — simulated Persian assistant demo
   Scripted, front-end only. No server, no API. Safe for GitHub Pages. */
(function () {
  'use strict';

  var SCENARIOS = {
    lead: {
      label: 'موتور سرنخ',
      name: 'دستیار فروش 9nagent',
      channel: 'دایرکت اینستاگرام · ساعت ۲۳:۴۱ · خارج از ساعت کاری',
      script: [
        { t: 'user', m: 'سلام، قیمت دوره‌تون چقدره؟' },
        { t: 'bot', m: 'سلام، وقتتون بخیر. الان خارج از ساعت کاریِ دفتریم، ولی من می‌تونم کامل راهنماییتون کنم. قیمت به نوع دوره بستگی داره — دنبال دوره‌ی فشرده هستید یا استاندارد؟', d: 900 },
        { t: 'sys', m: 'پاسخ اول در ۸ ثانیه · L-13 · L-20' },
        { t: 'user', m: 'فشرده. برای مهاجرت کاری لازمش دارم' },
        { t: 'bot', m: 'پس هدفتون آزمون رسمیه. دوره‌ی فشرده‌ی ما هشت هفته‌ست و سه سطح داره. برای اینکه عدد دقیق بدم نه بازه‌ی کلی: سطح فعلی زبانتون رو می‌دونید؟', d: 1100 },
        { t: 'user', m: 'تقریباً متوسط. تا آخر تابستون هم باید تموم بشه' },
        { t: 'sys', m: 'ارزیابی گفتگومحور: نیاز ✓ · زمان‌بندی ✓ · بودجه ⋯ · L-14' },
        { t: 'bot', m: 'عالی. با این شرایط دوره‌ی B2 فشرده دقیقاً مناسب شماست. یک سؤال آخر: بودجه‌ای که در نظر گرفتید در چه بازه‌ایه؟ می‌پرسم که گزینه‌ی درست رو پیشنهاد بدم، نه همه‌ی گزینه‌ها رو.', d: 1200 },
        { t: 'user', m: 'تا ۱۵ میلیون اوکیه' },
        { t: 'sys', m: 'امتیاز سرنخ: ۸۷ از ۱۰۰ — سرنخ داغ · L-15' },
        { t: 'bot', m: 'ممنون، همه‌چیز مشخصه. نوبت مشاوره‌ی فردا ساعت ۱۰ صبح رو براتون نگه داشتم و خلاصه‌ی همین گفتگو رو برای مشاور فرستادم — لازم نیست فردا از اول توضیح بدید.', d: 1300 },
        { t: 'sys', m: 'ثبت در CRM · تخصیص به کارشناس · L-26 · L-23' }
      ]
    },

    advisor: {
      label: 'دستیار مشاور',
      name: 'دستیار دفتر مهاجرتی',
      channel: 'واتساپ · دفتر مهاجرتی',
      script: [
        { t: 'user', m: 'سلام، شرایط اکسپرس‌انتری کانادا چیه؟' },
        { t: 'bot', m: 'سلام. برای اینکه جواب دقیق بدم و نه جواب کلیِ اینترنتی، سه عدد ازتون می‌گیرم: سن، بالاترین مدرک تحصیلی، و نمره‌ی آیلتس اگر دارید.', d: 900 },
        { t: 'user', m: '۳۱ سالمه، فوق لیسانس، آیلتس ۷' },
        { t: 'sys', m: 'پیش‌ارزیابی خودکار بر اساس معیارهای برنامه · M-03' },
        { t: 'bot', m: 'با این پروفایل، امتیاز تخمینی شما بین ۴۴۰ تا ۴۶۵ می‌شه. قرعه‌کشی‌های عمومی اخیر حدود ۴۹۰ بوده — یعنی فعلاً کمی پایین‌تر از خط هستید. سه راه واقعی برای جبرانش دارید. بگم؟', d: 1400 },
        { t: 'user', m: 'بله بفرمایید' },
        { t: 'bot', m: 'یک: آیلتس ۸ ← حدود ۲۵ امتیاز. دو: مدرک زبان فرانسه ← تا ۵۰ امتیاز. سه: نامزدی استانی ← ۶۰۰ امتیاز. برای پروفایل شما مسیر سوم از همه واقع‌بینانه‌تره و روی همون تمرکز می‌کنیم.', d: 1500 },
        { t: 'sys', m: 'چک‌لیست مدارک شخصی‌سازی‌شده تولید شد — ۱۱ قلم · M-02' },
        { t: 'bot', m: 'چک‌لیست مدارکِ مخصوص همین مسیر رو براتون فرستادم. برآورد شفاف هزینه‌ی کل — حق‌الوکاله، هزینه‌ی دولتی، ترجمه، آزمون و تمکن مالی — و جدول زمانی مرحله‌به‌مرحله هم داخل همون فایله.', d: 1300 },
        { t: 'sys', m: 'محاسبه‌گر هزینه و زمان‌بندی · M-05 · M-06' },
        { t: 'user', m: 'مشاوره‌ی حضوری می‌خوام' },
        { t: 'bot', m: 'حتماً. سه زمان خالی این هفته داریم: شنبه ۱۶:۰۰، دوشنبه ۱۱:۰۰، چهارشنبه ۱۷:۳۰. کدوم مناسبه؟ پرونده‌تون رو قبل از جلسه برای مشاور خلاصه می‌کنم.', d: 1200 },
        { t: 'sys', m: 'رزرو جلسه · دریافت بیعانه · بریفینگ مشاور · M-23 · M-24' }
      ]
    },

    booking: {
      label: 'دستیار نوبت',
      name: 'دستیار نوبت کلینیک',
      channel: 'پیامک · ۲۴ ساعت پیش از نوبت',
      script: [
        { t: 'bot', m: 'سلام آقای رضایی. نوبت شما فردا سه‌شنبه ساعت ۱۶:۳۰ با دکتر احمدی ثبت شده. برای تأیید عدد ۱، برای تغییر عدد ۲ را بفرستید.', d: 700 },
        { t: 'user', m: '۲' },
        { t: 'sys', m: 'لغو زودهنگام به‌جای غیبت ناگهانی · N-10' },
        { t: 'bot', m: 'بی‌مشکل، ممنون که زودتر خبر دادید. نزدیک‌ترین زمان‌های خالی: پنجشنبه ۱۰:۰۰، شنبه ۱۷:۰۰، یکشنبه ۱۲:۳۰. کدوم براتون بهتره؟', d: 1000 },
        { t: 'user', m: 'شنبه ۱۷' },
        { t: 'bot', m: 'ثبت شد — شنبه ساعت ۱۷:۰۰ با دکتر احمدی. تقویم پذیرش و تقویم دکتر هم همین الان به‌روز شد. یادآوری بعدی رو ۲۴ ساعت قبل می‌فرستم.', d: 1100 },
        { t: 'sys', m: 'همگام‌سازی تقویم · سکانس یادآوری · N-02 · N-08' },
        { t: 'sys', m: 'جای خالیِ فردا ۱۶:۳۰ آزاد شد ← اعلان آنی به لیست انتظار · N-14 · N-15' },
        { t: 'bot', m: 'خانم کریمی، یک نوبت برای فردا سه‌شنبه ساعت ۱۶:۳۰ آزاد شد. اگر می‌خواید براتون ثبت کنم، «بله» را بفرستید — نوبت به اولین تأییدکننده می‌رسه.', d: 1200 },
        { t: 'user', m: 'بله لطفاً' },
        { t: 'bot', m: 'ثبت شد. آدرس و مسیر پارکینگ رو هم فرستادم. فردا می‌بینیمتون.', d: 900 },
        { t: 'sys', m: 'جای خالی در ۴ دقیقه پر شد — درآمدِ آن نوبت حفظ شد' }
      ]
    }
  };

  var SVG_BOT = '<svg viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="12" rx="4"/><path d="M12 8V4"/><circle cx="12" cy="3" r="1.4"/><path d="M9 13.5h.01M15 13.5h.01"/><path d="M9.5 16.8h5"/></svg>';
  var SVG_SEND = '<svg viewBox="0 0 24 24"><path d="M4 12h14M12 5l7 7-7 7"/></svg>';

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }

  function initDemo(root) {
    var chat = root.querySelector('[data-chat]');
    var nameEl = root.querySelector('[data-bot-name]');
    var chanEl = root.querySelector('[data-bot-channel]');
    var opts = root.querySelectorAll('[data-scenario]');
    var replay = root.querySelector('[data-replay]');
    var only = root.getAttribute('data-only');
    var timers = [];
    var current = null;

    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    function scrollDown() { chat.scrollTop = chat.scrollHeight; }

    function typing() {
      var w = el('div', 'msg msg-bot typing', '<span></span><span></span><span></span>');
      w.style.padding = '11px 15px';
      chat.appendChild(w); scrollDown();
      return w;
    }

    function play(key) {
      clearTimers();
      current = key;
      var sc = SCENARIOS[key];
      if (!sc) return;
      chat.innerHTML = '';
      if (nameEl) nameEl.textContent = sc.name;
      if (chanEl) chanEl.textContent = sc.channel;
      opts.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-scenario') === key); });

      var t = 350;
      sc.script.forEach(function (step) {
        if (step.t === 'bot') {
          var wait = step.d || 900;
          timers.push(setTimeout(function () {
            var bubble = typing();
            timers.push(setTimeout(function () {
              bubble.remove();
              chat.appendChild(el('div', 'msg msg-bot', step.m));
              scrollDown();
            }, wait));
          }, t));
          t += wait + 700;
        } else if (step.t === 'user') {
          timers.push(setTimeout(function () {
            chat.appendChild(el('div', 'msg msg-user', step.m));
            scrollDown();
          }, t));
          t += 1000;
        } else {
          timers.push(setTimeout(function () {
            chat.appendChild(el('div', 'msg-sys', step.m));
            scrollDown();
          }, t));
          t += 750;
        }
      });
    }

    opts.forEach(function (b) {
      b.addEventListener('click', function () { play(b.getAttribute('data-scenario')); });
    });
    if (replay) replay.addEventListener('click', function () { play(current || only || 'lead'); });

    var first = only || (opts[0] && opts[0].getAttribute('data-scenario')) || 'lead';
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { io.unobserve(root); play(first); }
        });
      }, { threshold: 0.35 });
      io.observe(root);
    } else { play(first); }
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-demo]').forEach(initDemo);
    document.querySelectorAll('[data-icon="bot"]').forEach(function (n) { n.innerHTML = SVG_BOT; });
    document.querySelectorAll('[data-icon="send"]').forEach(function (n) { n.innerHTML = SVG_SEND; });
  });
})();
