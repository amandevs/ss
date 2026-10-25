/**
 * DARGAH HAZRAT SHAH SHARAFAT ALI MIYAN R.H.
 * Official Interactive Web Script (Pure Vanilla JS)
 * Includes: Animated Silsila Lineage Explorer, Multi-language Sajrah Reader,
 * Universal Lightbox with Nav & Zoom, Mobile Bottom Bar, and Modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHijriDate();
  initOffCanvasMenu();
  initSajrahReader();
  initSilsilaExplorer();
  initUrsCountdown();
  initGalleryFilter();
  initLightboxModal();
  initVideoModal();
  initBookReader();
  initContactForm();
  initNewsletter();
  initStickyHeader();
  initMobileBottomBar();
  initPosterSlider();
});

/* ==========================================================================
   1. Live Islamic Hijri Date Calculation
   ========================================================================== */
function initHijriDate() {
  const hijriEl = document.getElementById('current-hijri-date');
  if (!hijriEl) return;
  
  try {
    const today = new Date();
    const hijriFormatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const formatted = hijriFormatter.format(today);
    hijriEl.textContent = `${formatted} AH`;
  } catch (e) {
    hijriEl.textContent = '1448 A.H. / Bareilly Sharif';
  }
}

/* ==========================================================================
   2. Page 2 Off-Canvas Full Navigation Drawer
   ========================================================================== */
function initOffCanvasMenu() {
  const overlay = document.getElementById('page2-overlay');
  const openBtns = document.querySelectorAll('.open-menu-drawer');
  const closeBtn = document.getElementById('page2-close-btn');

  if (!overlay) return;

  function openMenu() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  window.openPage2Menu = openMenu;
  window.closePage2Menu = closeMenu;

  openBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openMenu();
  }));

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeMenu();
    }
  });

  const drawerLinks = overlay.querySelectorAll('a');
  drawerLinks.forEach(link => link.addEventListener('click', closeMenu));
}

/* ==========================================================================
   3. Interactive Sajrah Sharif 4-Language Switcher
   ========================================================================== */
const sajrahData = {
  hinglish: {
    couplet: "Daad ras, faryaad ras, roshan zameer<br>Shah Saqlain o Sharafat dastgeer",
    meaning: "The reliever of distress, the listener of cries, of radiant inner soul — Shah Saqlain and Hazrat Sharafat are our blessed supporters.",
    verses: [
      "1. Ya Ilahi rahm farma Mustafa ke waaste, Ya Rasool Allah karam kije Khuda ke waaste",
      "2. Mushkilein hal kar shahe mardan Ali ke waaste, Kar bala e ranj o gham aal e nabi ke waaste",
      "3. Syed e Sajjad aur Baqir ke sadqe me sada, Noor e Jafar de hidayat kibriya ke waaste",
      "4. Ghaus ul Azam Sheikh e Jilan Qiblah e arwah e deen, Dastageeri ho madad gaar e wafa ke waaste",
      "5. Hazrat Mujaddid Alf e Saani noor e deen e Ahmedee, Qalb roshan kar ata e rehbari ke waaste",
      "6. Shah Basheer e Ba-Karam sultan e aalam auliya, Faiz pahuche qalb o jaan me aashiqui ke waaste",
      "7. Hazrat Qiblah Shah Sharafat Auliya e ba-safa, Hai tumhari zaat e aali roshni ke waaste",
      "8. Shah Shuja'at Ali Miyan aur Shah Saqlain Miyan, Har gada par ho karam ab faiz e daaim ke liye"
    ]
  },
  urdu: {
    couplet: "داد رس، فریاد رس، روشن ضمیر<br>شاہ ثقلین و شرافت دستگیر",
    meaning: "مصیبت میں مدد فرمانے والے، فریاد سننے والے، صاحبِ بصیرت و نور — حضرت شاہ ثقلین و شاہ شرافت ہمارے دستگیر ہیں۔",
    verses: [
      "۱. یا الٰہی رحم فرما مصطفیٰ کے واسطے، یا رسول اللہ کرم کیجے خدا کے واسطے",
      "۲. مشکلیں حل کر شہِ مرداں علی کے واسطے، کر بلا دور اے خدا آلِ نبی کے واسطے",
      "۳. سیّدِ سجّاد و باقر کے وسیلے سے سدا، نورِ جعفر دے ہدایت کبریا کے واسطے",
      "۴. غوثِ اعظم شیخِ جیلاں قبلۂ ارواحِ دیں، دستگیری ہو ہماری مصطفیٰ کے واسطے",
      "۵. حضرتِ مجدد الفِ ثانی نورِ دینِ احمدی، قلب روشن کر عطا فرمائیے رب کے واسطے",
      "۶. شاہ بشیرِ باکرم سلطانِ اقلیمِ صفا، فیض جاری ہو مدام اس دل میں الفت کے لئے",
      "۷. حضرتِ قبلہ شاہ شرافت میاں قطبِ زماں، فیض کا دریا رواں ہے تشنگاں کے واسطے",
      "۸. شاہ شجاعت علی میاں اور شاہ ثقلین میاں، بخش دے یارب طفیلِ اولیاء سب کے لئے"
    ]
  },
  hindi: {
    couplet: "दाद रस, फ़रियाद रस, रोशन ज़मीर<br>शाह सक़लैन व शराफ़त दस्तगीर",
    meaning: "फ़रियाद सुनने वाले, संकट हरने वाले, रोशन दिल वाले — हज़रत शाह सक़लैन और हज़रत शाह शराफ़त हमारे मददगार हैं।",
    verses: [
      "1. या इलाही रहम फ़रमा मुस्तफ़ा के वास्ते, या रसूल अल्लाह करम कीजे ख़ुदा के वास्ते",
      "2. मुश्किलें हल कर शहे मर्दां अली के वास्ते, दूर कर रंज-ओ-अलम आले नबी के वास्ते",
      "3. सैय्यद सज्जाद और बाक़िर के सदक़े में सदा, नूरे जाफ़र दे हिदायत किब्रिया के वास्ते",
      "4. गौसुल आज़म शेख़े जीलां क़िबला-ए-अरवाहे दीं, दस्तगीरी हो मददगारे वफ़ा के वास्ते",
      "5. हज़रत मुजद्दिद अल्फ़े सानी नूरे दीने अहमदी, क़ल्ब रोशन कर अता-ए-रहबरी के वास्ते",
      "6. शाह बशीर बा-करम सुल्ताने आलम औलिया, फ़ैज़ पहुंचे क़ल्ब-ओ-जां में आशिक़ी के वास्ते",
      "7. हज़रत क़िबला शाह शराफ़त औलिया-ए-बा-सफ़ा, है तुम्हारी ज़ाते आली रोशनी के वास्ते",
      "8. शाह शुजाअत अली मियां और शाह सक़लैन मियां, हर गदा पर हो करम अब फ़ैज़े दाइम के लिए"
    ]
  },
  gujarati: {
    couplet: "દાદ રસ, ફરિયાાદ રસ, રોશન ઝમીર<br>શાહ સકલૈન વ શરાફત દસ્તગીર",
    meaning: "ફરિયાદ સાંભળનારા, સંકટો દૂર કરનારા, રોશન દિલવાળા — હઝરત શાહ સકલૈન અને હઝરત શાહ શરાફત અમારા મદદગાર છે.",
    verses: [
      "1. યા ઇલાહી રહમ ફરમા મુસ્તફા કે વાસ્તે, યા રસૂલ અલ્લાહ કરમ કીજે ખુદા કે વાસ્તે",
      "2. મુશ્કિલેં હલ કર શહે મર્દાં અલી કે વાસ્તે, દૂર કર રંજ-ઓ-અલમ આલે નબી કે વાસ્તે",
      "3. સૈયદ સજ્જાદ ઔર બાકિર કે સદકે મેં સદા, નૂરે જાફર દે હિદાયત કિબ્રિયા કે વાસ્તે",
      "4. ગૌસુલ આઝમ શેખે જીલાં કિબલા-એ-અરવાહે દીં, દસ્તગીરી હો મદદગારે વફા કે વાસ્તે",
      "5. હઝરત મુજદ્દિદ અલ્ફે સાની નૂરે દીને અહમદી, કલ્બ રોશન કર અતા-એ-રહબરી કે વાસ્તે",
      "6. શાહ બશીર બા-કરમ સુલ્તાને આલમ ઔલિયા, ફૈઝ પહોંચે કલ્બ-ઓ-જાં મેં આશિકી કે વાસ્તે",
      "7. હઝરત કિબલા શાહ શરાફત ઔલિયા-એ-બા-સફા, હૈ તુમ્હારી ઝાતે આલી રોશની કે વાસ્તે",
      "8. શાહ શુજાઅત અલી મિયાં ઔર શાહ સકલૈન મિયાં, હર ગદા પર હો કરમ અબ ફૈઝે દાઇમ કે લિયે"
    ]
  }
};

function initSajrahReader() {
  const langBtns = document.querySelectorAll('.lang-btn');
  const coupletText = document.getElementById('sajrah-couplet-text');
  const coupletMeaning = document.getElementById('sajrah-couplet-meaning');
  const versesContainer = document.getElementById('sajrah-verses-container');

  if (!versesContainer) return;

  function loadLanguage(lang) {
    const data = sajrahData[lang] || sajrahData.hinglish;
    if (coupletText) coupletText.innerHTML = data.couplet;
    if (coupletMeaning) coupletMeaning.textContent = data.meaning;

    versesContainer.innerHTML = '';
    data.verses.forEach((v, index) => {
      const item = document.createElement('div');
      item.className = 'verse-item';
      
      const numSpan = document.createElement('span');
      numSpan.className = 'verse-index';
      numSpan.textContent = index + 1;

      const textSpan = document.createElement('div');
      textSpan.className = `verse-text ${lang}`;
      textSpan.textContent = v;

      if (lang === 'urdu') {
        item.appendChild(textSpan);
        item.appendChild(numSpan);
      } else {
        item.appendChild(numSpan);
        item.appendChild(textSpan);
      }

      versesContainer.appendChild(item);
    });
  }

  window.switchSajrahLang = function(lang) {
    langBtns.forEach(b => {
      if (b.getAttribute('data-lang') === lang) b.classList.add('active');
      else b.classList.remove('active');
    });
    loadLanguage(lang);
  };

  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = btn.getAttribute('data-lang');
      window.switchSajrahLang(lang);
    });
  });

  loadLanguage('hinglish');
}

/* ==========================================================================
   4. Animated Silsila-e-Aaliyah Lineage Explorer (Complete 37 Blessed Names)
   ========================================================================== */
function initSilsilaExplorer() {
  const cardsContainer = document.getElementById('silsila-cards-grid');
  const tableContainer = document.getElementById('silsila-table-body');
  const searchInput = document.getElementById('silsila-search-input');
  const filterPills = document.querySelectorAll('.silsila-pill');
  const viewBtns = document.querySelectorAll('.silsila-view-btn');
  const cardsWrap = document.getElementById('silsila-cards-view-wrap');
  const tableWrap = document.getElementById('silsila-table-view-wrap');

  if (!cardsContainer && !tableContainer) return;

  // Use global silsilaData from silsila-data.js if available, else fallback
  const data = (typeof silsilaData !== 'undefined') ? silsilaData : [];

  let currentFilter = 'all';
  let currentSearch = '';

  function renderSilsila() {
    const filtered = data.filter(item => {
      const matchFilter = currentFilter === 'all' || item.region === currentFilter;
      const matchSearch = currentSearch === '' || 
        item.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
        item.muqaam.toLowerCase().includes(currentSearch.toLowerCase()) ||
        item.visaal.toLowerCase().includes(currentSearch.toLowerCase()) ||
        item.hijri.toLowerCase().includes(currentSearch.toLowerCase());
      return matchFilter && matchSearch;
    });

    // 1. Render Card View
    if (cardsContainer) {
      cardsContainer.innerHTML = '';
      if (filtered.length === 0) {
        cardsContainer.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 2.5rem; color: var(--text-muted);">
            No blessed saint found matching "${currentSearch}". Please check spelling.
          </div>
        `;
      } else {
        filtered.forEach(item => {
          const card = document.createElement('div');
          card.className = 'silsila-saint-card';
          card.innerHTML = `
            <div class="saint-card-top">
              <span class="saint-num-badge">#${item.no}</span>
              <span class="saint-muqaam-tag">📍 ${item.muqaam.split(',')[0]}</span>
            </div>
            <h4 class="saint-card-name">${item.name}</h4>
            <div class="saint-card-title">${item.title}</div>
            <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 0.85rem;">
              ${item.desc}
            </p>
            <div class="saint-card-dates">
              <span><strong>Wisal:</strong> ${item.visaal}</span>
              <span><strong>Year:</strong> ${item.hijri}</span>
            </div>
          `;
          cardsContainer.appendChild(card);
        });
      }
    }

    // 2. Render Table View
    if (tableContainer) {
      tableContainer.innerHTML = '';
      if (filtered.length === 0) {
        tableContainer.innerHTML = `
          <tr>
            <td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-muted);">
              No holy saint found matching search criteria.
            </td>
          </tr>
        `;
      } else {
        filtered.forEach(item => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td style="width: 50px;"><span class="badge-no">${item.no}</span></td>
            <td class="saint-name-cell">
              <div>${item.name}</div>
              <small style="color: var(--gold-dark); font-weight: normal;">${item.title}</small>
            </td>
            <td><strong>${item.visaal}</strong></td>
            <td><span style="color: var(--emerald-primary); font-weight: 700;">${item.hijri}</span></td>
            <td><span style="display: inline-flex; align-items: center; gap: 0.3rem;">📍 ${item.muqaam}</span></td>
          `;
          tableContainer.appendChild(tr);
        });
      }
    }
  }

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim();
      renderSilsila();
    });
  }

  // Region filter pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-region') || 'all';
      renderSilsila();
    });
  });

  // View mode toggles (Cards vs Table)
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const view = btn.getAttribute('data-view');
      if (view === 'table') {
        if (cardsWrap) cardsWrap.style.display = 'none';
        if (tableWrap) tableWrap.style.display = 'block';
      } else {
        if (cardsWrap) cardsWrap.style.display = 'grid';
        if (tableWrap) tableWrap.style.display = 'none';
      }
    });
  });

  renderSilsila();
}

/* ==========================================================================
   5. Live Urs Mubarak Countdown Timer
   ========================================================================== */
function initUrsCountdown() {
  const daysEl = document.getElementById('urs-days');
  const hoursEl = document.getElementById('urs-hours');
  const minsEl = document.getElementById('urs-mins');
  const secsEl = document.getElementById('urs-secs');

  if (!daysEl) return;

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 45);
  targetDate.setHours(22, 0, 0, 0);

  function update() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    daysEl.textContent = d < 10 ? '0' + d : d;
    hoursEl.textContent = h < 10 ? '0' + h : h;
    minsEl.textContent = m < 10 ? '0' + m : m;
    secsEl.textContent = s < 10 ? '0' + s : s;
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   6. Filterable Gallery (Images / Categories)
   ========================================================================== */
function initGalleryFilter() {
  const tabBtns = document.querySelectorAll('.gallery-tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          item.style.display = 'block';
          item.style.animation = 'silsilaFadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. Universal Animated Lightbox with Next/Prev & Zoom
   ========================================================================== */
function initLightboxModal() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const modalCounter = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const downloadBtn = document.getElementById('lightbox-download');

  if (!modal || !modalImg) return;

  // Collect all zoomable image elements into an array
  let imageList = [];
  let currentIndex = 0;

  function refreshImageList() {
    const triggers = document.querySelectorAll('.gallery-item, .zoomable-img, .poster-thumb-wrap');
    const seen = new Set();
    imageList = Array.from(triggers).map(el => {
      const img = el.querySelector('img') || el;
      return {
        src: img.src,
        caption: el.getAttribute('data-caption') || img.alt || 'Dargah Hazrat Shah Sharafat Ali Miyan R.h.',
        element: el
      };
    }).filter(item => {
      if (!item.src || item.src.includes('data:')) return false;
      if (seen.has(item.src)) return false;
      seen.add(item.src);
      return true;
    });
  }

  refreshImageList();

  function showImage(index) {
    if (imageList.length === 0) return;
    if (index < 0) index = imageList.length - 1;
    if (index >= imageList.length) index = 0;
    currentIndex = index;

    const item = imageList[currentIndex];
    modalImg.src = item.src;
    if (modalCaption) modalCaption.textContent = item.caption;
    if (modalCounter) modalCounter.textContent = `Photo ${currentIndex + 1} of ${imageList.length}`;
    if (downloadBtn) {
      downloadBtn.href = item.src;
      downloadBtn.setAttribute('download', `dargah-photo-${currentIndex + 1}.jpg`);
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Attach event listeners to all triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.gallery-item, .zoomable-img, .poster-thumb-wrap');
    if (trigger) {
      e.preventDefault();
      refreshImageList();
      const img = trigger.querySelector('img') || trigger;
      const foundIdx = imageList.findIndex(item => item.src === img.src);
      showImage(foundIdx !== -1 ? foundIdx : 0);
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (prevBtn) prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });
  if (nextBtn) nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Keyboard navigation (ArrowLeft, ArrowRight, Escape)
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
}

/* ==========================================================================
   8. Video Player Modal
   ========================================================================== */
function initVideoModal() {
  const modal = document.getElementById('video-modal');
  const videoTitle = document.getElementById('video-modal-title');
  const videoFrame = document.getElementById('video-modal-frame');
  const closeBtn = document.getElementById('video-close');
  const playBtns = document.querySelectorAll('.video-card');

  if (!modal) return;

  playBtns.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h4')?.textContent || 'Urs Mubarak Presentation';
      if (videoTitle) videoTitle.textContent = title;
      if (videoFrame) {
        videoFrame.innerHTML = `
          <div style="width:100%; height:380px; background:#073822; border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; text-align:center; padding:2rem; box-shadow:inset 0 0 40px rgba(0,0,0,0.5);">
            <div style="width:68px; height:68px; border-radius:50%; background:#c59b27; display:flex; align-items:center; justify-content:center; font-size:2rem; margin-bottom:1rem; box-shadow:0 6px 20px rgba(197,155,39,0.4);">▶</div>
            <h3 style="color:#f7edd2; font-family:'Cinzel', serif; margin-bottom:0.5rem;">${title}</h3>
            <p style="font-size:0.9rem; color:rgba(255,255,255,0.8); max-width:480px;">Streaming live transmission & archival recordings from Khanqah-e-Saqlainia Sharafatiya, Bareilly Sharif.</p>
            <span style="font-size:0.75rem; background:rgba(255,255,255,0.15); padding:0.3rem 0.8rem; border-radius:9999px; margin-top:0.75rem; color:#dfb743;">Official Media Archive • alsaqlain.com</span>
          </div>
        `;
      }
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeVideo() {
    modal.classList.remove('open');
    if (videoFrame) videoFrame.innerHTML = '';
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeVideo);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeVideo();
  });
}

/* ==========================================================================
   9. Books Reader Modal
   ========================================================================== */
function initBookReader() {
  const readBtns = document.querySelectorAll('.btn-read-book');
  const modal = document.getElementById('book-reader-modal');
  const bookTitleEl = document.getElementById('reader-book-title');
  const readerContent = document.getElementById('reader-content-body');
  const closeBtn = document.getElementById('book-reader-close');

  if (!modal) return;

  const bookSamples = {
    'sajrah-sharif': {
      title: 'Sajrah Sharif (Silsila-e-Aaliyah Quadriyah Mujaddidiyah Sharafatiyah)',
      content: `
        <h3 style="font-family:'Cinzel', serif; color:#0a5333; margin-bottom:1rem; text-align:center;">شجرۂ شریف شرافتیہ ثقلینیہ</h3>
        <p style="text-align:center; font-family:'Amiri', serif; font-size:1.4rem; color:#c59b27; margin-bottom:1.5rem;">داد رس، فریاد رس، روشن ضمیر • شاہ ثقلین و شرافت دستگیر</p>
        <div style="background:#fdfaf0; border:1px solid rgba(197,155,39,0.3); border-radius:12px; padding:1.5rem; line-height:1.8; color:#19241f; font-size:0.95rem;">
          <p><strong>Introduction:</strong> The sacred Sajrah Mubarak contains the golden chain connecting the mureedeen and devotees through Hazrat Qiblah Shah Sharafat Ali Miyan R.h. and Hazrat Shah Saqlain Miyan R.h., ascending unbroken through the illustrious Awliya-e-Kiram to Sultan-ul-Awliya Ghaus-ul-Azam Sheikh Abdul Qadir Jilani (R.A.), Ameer-ul-Momineen Hazrat Ali Murtaza (R.A.), and the Crown of Creation, Sayyiduna wa Maulana Muhammad Mustafa ﷺ.</p>
          <hr style="border:none; border-top:1px dashed #c59b27; margin:1.2rem 0;">
          <p><strong>Daily Recitation (Wazifa):</strong> Devotees are encouraged to recite the sacred Shajra Sharif daily after Fajr or Isha prayers for divine tranquility, spiritual illumination, and barakah in life.</p>
        </div>
      `
    },
    'hayat-e-sharafat': {
      title: 'Hayat-e-Sharafat (Life & Miracles of Hazrat Shah Sharafat Ali Miyan R.h.)',
      content: `
        <h3 style="font-family:'Cinzel', serif; color:#0a5333; margin-bottom:1rem; text-align:center;">حیاتِ شرافت میاں رحمۃ اللہ علیہ</h3>
        <p style="text-align:center; font-family:'Cinzel', serif; font-size:1.1rem; color:#8f6e14; margin-bottom:1.5rem;">A Biography of Divine Love, Piety, and Selfless Service</p>
        <div style="background:#fdfaf0; border:1px solid rgba(197,155,39,0.3); border-radius:12px; padding:1.5rem; line-height:1.8; color:#19241f; font-size:0.95rem;">
          <p><strong>Birth & Lineage:</strong> Born on 27th Ramadan 1310 A.H. (29th April 1892) during Adhan-e-Saani of Jumu'atul Wada to mother Hameeda Khatoon R.A. in Kakrala, Badayun Sharif. His ancestors were renowned for unwavering steadfastness in Tahajjud, takbeer-e-oola, and arbitration for local disputes.</p>
          <p><strong>Foundation of Khanqah:</strong> On 1st January 1950, Hazrat established Khanqah-e-Sharafatiya in Mohalla Shahbad, Bareilly Sharif, which continues to be a fountainhead of spiritual solace, Langar-e-Aam, and interfaith harmony.</p>
        </div>
      `
    }
  };

  readBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const bookKey = btn.getAttribute('data-book') || 'sajrah-sharif';
      const sample = bookSamples[bookKey] || bookSamples['sajrah-sharif'];
      if (bookTitleEl) bookTitleEl.textContent = sample.title;
      if (readerContent) readerContent.innerHTML = sample.content;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeReader() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeReader);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeReader();
  });
}

/* ==========================================================================
   10. Interactive Contact Form Validation & Toast Notification
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in your Name, Email, and Message.', 'warning');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending Message...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      form.reset();
      showToast('Shukriya! Your message has been received by Khanqah administration.', 'success');
    }, 900);
  });
}

/* ==========================================================================
   11. Newsletter Subscription Handler
   ========================================================================== */
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form-action');
  forms.forEach(f => {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = f.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        showToast(`Subscribed successfully with ${input.value.trim()}! You will receive Urs & Khanqah updates.`, 'success');
        input.value = '';
      }
    });
  });
}

/* ==========================================================================
   12. Sticky Header Shadow on Scroll
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 6px 25px rgba(10, 83, 51, 0.1)';
    } else {
      header.style.boxShadow = '0 4px 20px rgba(10, 83, 51, 0.05)';
    }
  });
}

/* ==========================================================================
   13. Human Style Mobile Bottom Navigation Bar Tracking
   ========================================================================== */
function initMobileBottomBar() {
  const items = document.querySelectorAll('.mobile-bottom-item');
  if (!items.length) return;

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 200;
    const sections = ['home', 'sajrah', 'lineage', 'gallery', 'events'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          items.forEach(item => {
            if (item.getAttribute('href') === `#${id}`) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      }
    });
  });
}

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */
function showToast(message, type = 'info') {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  const icon = type === 'success' ? '✓' : (type === 'warning' ? '⚠' : 'ℹ');
  toast.innerHTML = `
    <span style="width:24px; height:24px; border-radius:50%; background:${type==='success'?'#0a5333':'#c59b27'}; color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:bold;">${icon}</span>
    <span style="font-size:0.88rem; font-weight:600; color:#19241f;">${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   Continuous Sliding Poster Carousel with Distinct Animations & Touch/Drag
   ========================================================================== */
function initPosterSlider() {
  const viewport = document.getElementById('posters-slider-viewport');
  const track = document.getElementById('posters-slider-track');
  const prevBtn = document.getElementById('posters-prev-btn');
  const nextBtn = document.getElementById('posters-next-btn');

  if (!viewport || !track) return;

  const originalCards = Array.from(track.querySelectorAll('.poster-card'));
  if (originalCards.length === 0) return;

  // Duplicate cards 3 times so track has 4 sets (12 cards total) for infinite looping
  const setSize = originalCards.length;
  for (let s = 0; s < 3; s++) {
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });
  }

  const allCards = Array.from(track.querySelectorAll('.poster-card'));

  function getSingleSetWidth() {
    if (allCards.length <= setSize) return 1200;
    const firstRect = allCards[0].getBoundingClientRect();
    const setRect = allCards[setSize].getBoundingClientRect();
    return Math.abs(setRect.left - firstRect.left);
  }

  let singleSetWidth = getSingleSetWidth();
  window.addEventListener('resize', () => {
    singleSetWidth = getSingleSetWidth();
  });

  let currentTranslate = 0;
  const baseSpeed = 0.85; // Elegant, readable continuous glide speed (~50px/sec)
  let speed = baseSpeed;
  let isHovered = false;
  let isDragging = false;
  let startX = 0;
  let dragStartTranslate = 0;
  let lastX = 0;
  let dragVelocity = 0;
  let hasMoved = false;

  // Continuous animation loop using requestAnimationFrame
  function step() {
    if (!isDragging) {
      if (isHovered) {
        // Smooth deceleration when hovering
        speed += (0 - speed) * 0.12;
      } else {
        // Smooth acceleration back to normal gliding speed
        speed += (baseSpeed - speed) * 0.06;
      }

      currentTranslate -= speed;

      // Invisible seamless infinite wrapping
      if (singleSetWidth > 0) {
        while (currentTranslate <= -singleSetWidth) {
          currentTranslate += singleSetWidth;
        }
        while (currentTranslate > 0) {
          currentTranslate -= singleSetWidth;
        }
      }

      track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
    }

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);

  // Hover detection to gently pause / resume sliding
  viewport.addEventListener('mouseenter', () => {
    isHovered = true;
  });

  viewport.addEventListener('mouseleave', () => {
    isHovered = false;
  });

  // Touch and Mouse Drag Support
  function onPointerDown(e) {
    if (e.target.closest('.btn-download-sm')) return; // Allow direct download button clicks
    isDragging = true;
    hasMoved = false;
    startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    lastX = startX;
    dragStartTranslate = currentTranslate;
    track.style.transition = 'none';
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX;
    if (Math.abs(diff) > 5) hasMoved = true;

    dragVelocity = currentX - lastX;
    lastX = currentX;

    currentTranslate = dragStartTranslate + diff;

    if (singleSetWidth > 0) {
      while (currentTranslate <= -singleSetWidth) {
        currentTranslate += singleSetWidth;
        dragStartTranslate += singleSetWidth;
      }
      while (currentTranslate > 0) {
        currentTranslate -= singleSetWidth;
        dragStartTranslate -= singleSetWidth;
      }
    }

    track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
  }

  function onPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    // Add smooth release inertia
    currentTranslate += dragVelocity * 6;
  }

  // Prevent drag-click conflicts on links/images if user actually dragged
  viewport.addEventListener('click', (e) => {
    if (hasMoved && !e.target.closest('.btn-download-sm')) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  viewport.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  viewport.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  // Previous & Next navigation button clicks
  function slideByCard(direction) {
    const cardWidth = allCards[0].offsetWidth + 32; // Card width + gap
    currentTranslate += direction * cardWidth;

    if (singleSetWidth > 0) {
      while (currentTranslate <= -singleSetWidth) {
        currentTranslate += singleSetWidth;
      }
      while (currentTranslate > 0) {
        currentTranslate -= singleSetWidth;
      }
    }

    track.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
    track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
    setTimeout(() => {
      track.style.transition = 'none';
    }, 450);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      slideByCard(1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      slideByCard(-1);
    });
  }

  // Interactive 3D Cursor Perspective Tilt on Cards
  allCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(850px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-10px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

