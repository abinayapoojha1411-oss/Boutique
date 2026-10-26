/**
 * THE HIDDEN COURTYARD - BOUTIQUE HOTEL & HOMESTAY
 * Main Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initSoundAmbiance();
  initRoomModal();
  initTestimonialsSlider();
  initGalleryAndLightbox();
  initBookingEngine();
  initContactForm();
  initHeroBookingBar();
  highlightActiveNav();
});

/* ==========================================================================
   1. STICKY HEADER & SCROLL BEHAVIOR
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. MOBILE MENU DRAWER
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.mobile-backdrop');
  const closeLinks = document.querySelectorAll('.mobile-nav-link, .close-mobile-menu');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  closeLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. HIGHLIGHT ACTIVE NAV ITEM
   ========================================================================== */
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const page = currentPath.split('/').pop() || 'index.html';

  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPage = href.split('/').pop().split('#')[0];

    if (page === '' || page === 'index.html') {
      if (linkPage === '' || linkPage === 'index.html') {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    } else if (linkPage === page) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   4. WEB AUDIO AMBIANCE SYNTHESIZER (PROCEDURAL NATURE SOUND)
   ========================================================================== */
function initSoundAmbiance() {
  const ambianceBtn = document.getElementById('ambianceToggle');
  if (!ambianceBtn) return;

  let audioCtx = null;
  let isPlaying = false;
  let gainNode = null;
  let timerId = null;

  const startAmbiance = () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gainNode.connect(audioCtx.destination);

    // 1. Soft wind / foliage whisper (Bandpass filtered white noise)
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, audioCtx.currentTime);
    filter.Q.setValueAtTime(1.2, audioCtx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    whiteNoise.start();

    // 2. Procedural gentle bird chirp interval
    const playChirp = () => {
      if (!isPlaying) return;
      try {
        const osc = audioCtx.createOscillator();
        const chirpGain = audioCtx.createGain();

        const now = audioCtx.currentTime;
        const startFreq = 2200 + Math.random() * 800;
        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.exponentialRampToValueAtTime(startFreq + 900, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(startFreq - 200, now + 0.18);

        chirpGain.gain.setValueAtTime(0, now);
        chirpGain.gain.linearRampToValueAtTime(0.04, now + 0.04);
        chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

        osc.connect(chirpGain);
        chirpGain.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.2);
      } catch (err) {
        console.warn(err);
      }

      const nextInterval = 2500 + Math.random() * 4500;
      timerId = setTimeout(playChirp, nextInterval);
    };

    isPlaying = true;
    ambianceBtn.classList.add('playing');
    ambianceBtn.setAttribute('title', 'Pause Nature Ambience');
    const tooltip = ambianceBtn.querySelector('.ambiance-tooltip');
    if (tooltip) tooltip.textContent = 'Pause Nature Ambience';

    playChirp();
  };

  const stopAmbiance = () => {
    if (audioCtx) {
      audioCtx.suspend();
    }
    if (timerId) clearTimeout(timerId);
    isPlaying = false;
    ambianceBtn.classList.remove('playing');
    ambianceBtn.setAttribute('title', 'Play Nature Ambience');
    const tooltip = ambianceBtn.querySelector('.ambiance-tooltip');
    if (tooltip) tooltip.textContent = 'Play Courtyard Ambience';
  };

  ambianceBtn.addEventListener('click', () => {
    if (isPlaying) {
      stopAmbiance();
    } else {
      startAmbiance();
    }
  });
}

/* ==========================================================================
   5. ROOM DETAILS MODAL & QUICK BOOK
   ========================================================================== */
function initRoomModal() {
  const modal = document.getElementById('roomDetailsModal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close-btn');
  const backdrop = modal.querySelector('.modal-backdrop-area');

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  // Attach to all "View Details" buttons
  document.addEventListener('click', (e) => {
    const detailsBtn = e.target.closest('.view-room-details-btn');
    if (detailsBtn) {
      const roomId = detailsBtn.getAttribute('data-room-id');
      openRoomDetails(roomId);
    }

    const bookBtn = e.target.closest('.book-room-btn');
    if (bookBtn) {
      const roomId = bookBtn.getAttribute('data-room-id');
      if (roomId) {
        window.location.href = `book.html?room=${encodeURIComponent(roomId)}`;
      }
    }
  });
}

function openRoomDetails(roomId) {
  const modal = document.getElementById('roomDetailsModal');
  if (!modal || !window.ROOMS_DATA) return;

  const room = window.ROOMS_DATA.find(r => r.id === roomId) || window.ROOMS_DATA[0];
  if (!room) return;

  // Set texts
  modal.querySelector('#modalRoomName').textContent = room.name;
  modal.querySelector('#modalRoomSubtitle').textContent = room.subtitle;
  modal.querySelector('#modalRoomPrice').textContent = room.priceFormatted;
  modal.querySelector('#modalRoomDesc').textContent = room.description;
  modal.querySelector('#modalRoomSize').textContent = room.size;
  modal.querySelector('#modalRoomCapacity').textContent = room.capacity;
  modal.querySelector('#modalRoomBed').textContent = room.bedType;
  modal.querySelector('#modalRoomView').textContent = room.view;

  // Set Gallery
  const mainImg = modal.querySelector('#modalMainImg');
  const subImg1 = modal.querySelector('#modalSubImg1');
  const subImg2 = modal.querySelector('#modalSubImg2');

  if (mainImg) mainImg.src = room.gallery[0] || room.image;
  if (subImg1) subImg1.src = room.gallery[1] || room.image;
  if (subImg2) subImg2.src = room.gallery[2] || room.gallery[0];

  // Set Amenities
  const amenitiesContainer = modal.querySelector('#modalAmenitiesList');
  if (amenitiesContainer) {
    amenitiesContainer.innerHTML = room.amenities.map(a => `
      <div class="modal-amenity-card">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-terracotta">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${a.name}</span>
      </div>
    `).join('');
  }

  // Set Highlights
  const highlightsContainer = modal.querySelector('#modalHighlightsList');
  if (highlightsContainer) {
    highlightsContainer.innerHTML = room.highlights.map(h => `
      <li style="display:flex; align-items:center; gap:8px; font-size:0.9rem; margin-bottom:8px; color:var(--color-text-secondary);">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-olive)" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 8 12 12 14 14"></polyline>
        </svg>
        ${h}
      </li>
    `).join('');
  }

  // Set Book CTA
  const bookBtn = modal.querySelector('#modalBookBtn');
  if (bookBtn) {
    bookBtn.onclick = () => {
      window.location.href = `book.html?room=${encodeURIComponent(room.id)}`;
    };
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   6. HERO QUICK BOOKING BAR
   ========================================================================== */
function initHeroBookingBar() {
  const checkinInput = document.getElementById('heroCheckin');
  const checkoutInput = document.getElementById('heroCheckout');
  const guestsSelect = document.getElementById('heroGuests');
  const submitBtn = document.getElementById('heroCheckAvailability');

  if (!checkinInput || !checkoutInput || !submitBtn) return;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 2);

  const formatDate = (date) => date.toISOString().split('T')[0];

  checkinInput.min = formatDate(today);
  checkinInput.value = formatDate(today);

  checkoutInput.min = formatDate(tomorrow);
  checkoutInput.value = formatDate(tomorrow);

  checkinInput.addEventListener('change', () => {
    const selectedCheckin = new Date(checkinInput.value);
    const minCheckout = new Date(selectedCheckin);
    minCheckout.setDate(minCheckout.getDate() + 1);
    checkoutInput.min = formatDate(minCheckout);
    if (new Date(checkoutInput.value) <= selectedCheckin) {
      checkoutInput.value = formatDate(minCheckout);
    }
  });

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;
    const guests = guestsSelect ? guestsSelect.value : '2';

    const params = new URLSearchParams();
    if (checkin) params.set('checkin', checkin);
    if (checkout) params.set('checkout', checkout);
    if (guests) params.set('guests', guests);

    window.location.href = `book.html?${params.toString()}`;
  });
}

/* ==========================================================================
   7. TESTIMONIALS SLIDER
   ========================================================================== */
function initTestimonialsSlider() {
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const container = document.querySelector('.testimonial-slider-wrapper');

  if (!cards.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;

  const showSlide = (index) => {
    if (index < 0) index = cards.length - 1;
    if (index >= cards.length) index = 0;
    currentIndex = index;

    cards.forEach((card, i) => {
      card.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  };

  const nextSlide = () => showSlide(currentIndex + 1);
  const prevSlide = () => showSlide(currentIndex - 1);

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      showSlide(idx);
    });
  });

  const startAutoplay = () => {
    autoplayTimer = setInterval(nextSlide, 6000);
  };

  const stopAutoplay = () => {
    if (autoplayTimer) clearInterval(autoplayTimer);
  };

  if (container) {
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);
  }

  startAutoplay();
}

/* ==========================================================================
   8. FILTERABLE GALLERY & LIGHTBOX
   ========================================================================== */
function initGalleryAndLightbox() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('galleryLightbox');

  // Filter functionality
  if (filterTabs.length && galleryItems.length) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');
        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Lightbox functionality
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxCounter = lightbox.querySelector('.lightbox-counter');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentGalleryList = [];
  let currentIdx = 0;

  const getVisibleItems = () => {
    const items = Array.from(document.querySelectorAll('.gallery-item'));
    return items.filter(el => el.style.display !== 'none');
  };

  const updateLightboxContent = () => {
    if (!currentGalleryList.length) return;
    const currentItem = currentGalleryList[currentIdx];
    const imgEl = currentItem.querySelector('img');
    const title = currentItem.getAttribute('data-title') || imgEl.alt || 'The Hidden Courtyard';
    const fullSrc = currentItem.getAttribute('data-full-src') || imgEl.src;

    lightboxImg.src = fullSrc;
    lightboxTitle.textContent = title;
    lightboxCounter.textContent = `${currentIdx + 1} / ${currentGalleryList.length}`;
  };

  const openLightbox = (index) => {
    currentGalleryList = getVisibleItems();
    if (!currentGalleryList.length) return;
    currentIdx = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const visible = getVisibleItems();
      const idx = visible.indexOf(item);
      openLightbox(idx >= 0 ? idx : 0);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrap')) {
      closeLightbox();
    }
  });

  const nextLightbox = () => {
    if (!currentGalleryList.length) return;
    currentIdx = (currentIdx + 1) % currentGalleryList.length;
    updateLightboxContent();
  };

  const prevLightbox = () => {
    if (!currentGalleryList.length) return;
    currentIdx = (currentIdx - 1 + currentGalleryList.length) % currentGalleryList.length;
    updateLightboxContent();
  };

  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextLightbox(); });
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevLightbox(); });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
  });
}

/* ==========================================================================
   9. BOOKING ENGINE & PRICE CALCULATOR (book.html)
   ========================================================================== */
function initBookingEngine() {
  const form = document.getElementById('bookingInquiryForm');
  if (!form) return;

  const roomSelect = document.getElementById('bookRoom');
  const checkinInput = document.getElementById('bookCheckin');
  const checkoutInput = document.getElementById('bookCheckout');
  const guestsSelect = document.getElementById('bookGuests');

  // Summary elements
  const summaryRoomName = document.getElementById('summaryRoomName');
  const summaryRoomImg = document.getElementById('summaryRoomImg');
  const summaryNights = document.getElementById('summaryNights');
  const summaryRatePerNight = document.getElementById('summaryRatePerNight');
  const summarySubtotal = document.getElementById('summarySubtotal');
  const summaryTaxes = document.getElementById('summaryTaxes');
  const summaryGrandTotal = document.getElementById('summaryGrandTotal');

  // Read URL query params
  const urlParams = new URLSearchParams(window.location.search);
  const paramRoom = urlParams.get('room');
  const paramCheckin = urlParams.get('checkin');
  const paramCheckout = urlParams.get('checkout');
  const paramGuests = urlParams.get('guests');

  // Dates initialization
  const today = new Date();
  const defaultCheckoutDate = new Date(today);
  defaultCheckoutDate.setDate(defaultCheckoutDate.getDate() + 2);

  const formatDate = (d) => d.toISOString().split('T')[0];

  checkinInput.min = formatDate(today);
  checkinInput.value = paramCheckin || formatDate(today);

  checkoutInput.min = formatDate(new Date(today.getTime() + 86400000));
  checkoutInput.value = paramCheckout || formatDate(defaultCheckoutDate);

  if (paramGuests && guestsSelect) {
    guestsSelect.value = paramGuests;
  }

  // Preselect room
  if (paramRoom && roomSelect) {
    const matchedOption = Array.from(roomSelect.options).find(opt =>
      opt.value.toLowerCase() === paramRoom.toLowerCase() ||
      opt.text.toLowerCase().includes(paramRoom.toLowerCase())
    );
    if (matchedOption) {
      roomSelect.value = matchedOption.value;
    }
  }

  const updateCalculations = () => {
    const checkin = new Date(checkinInput.value);
    const checkout = new Date(checkoutInput.value);

    // Ensure checkout is at least 1 day after checkin
    if (checkout <= checkin) {
      const nextDay = new Date(checkin);
      nextDay.setDate(nextDay.getDate() + 1);
      checkoutInput.value = formatDate(nextDay);
    }

    const diffTime = Math.abs(new Date(checkoutInput.value) - new Date(checkinInput.value));
    const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    const selectedRoomId = roomSelect.value;
    const roomObj = window.ROOMS_DATA ? window.ROOMS_DATA.find(r => r.id === selectedRoomId) : null;
    const pricePerNight = roomObj ? roomObj.price : 8500;
    const roomName = roomObj ? roomObj.name : 'Courtyard Room';
    const roomImg = roomObj ? roomObj.image : 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80';

    const subtotal = pricePerNight * nights;
    const taxes = Math.round(subtotal * 0.12); // 12% GST standard
    const grandTotal = subtotal + taxes;

    if (summaryRoomName) summaryRoomName.textContent = roomName;
    if (summaryRoomImg) summaryRoomImg.src = roomImg;
    if (summaryNights) summaryNights.textContent = `${nights} ${nights === 1 ? 'Night' : 'Nights'}`;
    if (summaryRatePerNight) summaryRatePerNight.textContent = `₹${pricePerNight.toLocaleString('en-IN')}`;
    if (summarySubtotal) summarySubtotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    if (summaryTaxes) summaryTaxes.textContent = `₹${taxes.toLocaleString('en-IN')}`;
    if (summaryGrandTotal) summaryGrandTotal.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
  };

  checkinInput.addEventListener('change', () => {
    const selected = new Date(checkinInput.value);
    const nextDay = new Date(selected);
    nextDay.setDate(nextDay.getDate() + 1);
    checkoutInput.min = formatDate(nextDay);
    updateCalculations();
  });

  checkoutInput.addEventListener('change', updateCalculations);
  roomSelect.addEventListener('change', updateCalculations);
  updateCalculations();

  // Form submission with validation
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Full Name
    const nameInput = document.getElementById('bookName');
    const nameErr = document.getElementById('nameError');
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameErr.style.display = 'block';
      nameInput.focus();
      isValid = false;
    } else {
      nameErr.style.display = 'none';
    }

    // Validate Email
    const emailInput = document.getElementById('bookEmail');
    const emailErr = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailErr.style.display = 'block';
      if (isValid) emailInput.focus();
      isValid = false;
    } else {
      emailErr.style.display = 'none';
    }

    // Validate Phone
    const phoneInput = document.getElementById('bookPhone');
    const phoneErr = document.getElementById('phoneError');
    const phoneDigits = phoneInput.value.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      phoneErr.style.display = 'block';
      if (isValid) phoneInput.focus();
      isValid = false;
    } else {
      phoneErr.style.display = 'none';
    }

    if (!isValid) return;

    // Display loading state on submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Processing Inquiry...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      // Generate reference ID
      const refId = 'HC-' + Math.floor(100000 + Math.random() * 900000);
      showBookingSuccess(refId, {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        room: roomSelect.options[roomSelect.selectedIndex].text,
        checkin: checkinInput.value,
        checkout: checkoutInput.value,
        guests: guestsSelect.value
      });

      form.reset();
      updateCalculations();
    }, 900);
  });
}

function showBookingSuccess(refId, details) {
  const modal = document.getElementById('bookingSuccessModal');
  if (!modal) {
    alert("Thank you for your inquiry! We will get back to you within a few hours. Reference ID: " + refId);
    return;
  }

  modal.querySelector('#successRefId').textContent = `Inquiry Reference: ${refId}`;
  modal.querySelector('#successDetailsSummary').innerHTML = `
    <p><strong>Guest:</strong> ${details.name}</p>
    <p><strong>Room:</strong> ${details.room}</p>
    <p><strong>Dates:</strong> ${details.checkin} to ${details.checkout} (${details.guests} Guests)</p>
  `;

  // Pre-fill WhatsApp quick link with this reference
  const waBtn = modal.querySelector('#successWhatsAppBtn');
  if (waBtn) {
    const text = `Hello The Hidden Courtyard, I have just submitted booking inquiry #${refId} for ${details.room} (${details.checkin} to ${details.checkout}). Please confirm availability!`;
    waBtn.href = `https://wa.me/919876543212?text=${encodeURIComponent(text)}`;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  const closeBtn = modal.querySelector('.modal-close-btn');
  const dismissBtn = modal.querySelector('.dismiss-success-modal');

  const close = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.onclick = close;
  if (dismissBtn) dismissBtn.onclick = close;
  modal.onclick = (e) => {
    if (e.target === modal) close();
  };
}

/* ==========================================================================
   10. CONTACT FORM VALIDATION & SUBMISSION (contact.html)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const phone = document.getElementById('contactPhone');
    const message = document.getElementById('contactMessage');

    const nameErr = document.getElementById('contactNameError');
    const emailErr = document.getElementById('contactEmailError');
    const messageErr = document.getElementById('contactMessageError');

    if (!name.value.trim()) {
      nameErr.style.display = 'block';
      isValid = false;
    } else {
      nameErr.style.display = 'none';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      emailErr.style.display = 'block';
      isValid = false;
    } else {
      emailErr.style.display = 'none';
    }

    if (!message.value.trim() || message.value.trim().length < 5) {
      messageErr.style.display = 'block';
      isValid = false;
    } else {
      messageErr.style.display = 'none';
    }

    if (!isValid) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `Sending Message...`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      const successBox = document.getElementById('contactSuccessBox');
      if (successBox) {
        successBox.style.display = 'block';
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        alert("Thank you! Your message has been received. Our team will contact you shortly.");
      }
      form.reset();
    }, 800);
  });
}
