(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function initScrollReveal() {
    var elements = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

    if (!elements.length) {
      return;
    }

    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      elements.forEach(function (element) {
        element.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px'
    });

    elements.forEach(function (element) {
      observer.observe(element);
    });
  }

  function initActiveNavigation() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a[href^="#"]'));

    if (!links.length || !('IntersectionObserver' in window)) {
      return;
    }

    var sections = links
      .map(function (link) {
        return document.querySelector(link.getAttribute('href'));
      })
      .filter(Boolean);

    if (!sections.length) {
      return;
    }

    function setCurrent(id) {
      links.forEach(function (link) {
        if (link.getAttribute('href') === '#' + id) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setCurrent(entry.target.id);
        }
      });
    }, {
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0
    });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function initLightbox() {
    var dialog = document.getElementById('lightbox');
    var openers = Array.prototype.slice.call(document.querySelectorAll('.photo-button'));

    if (!dialog || !openers.length) {
      return;
    }

    var image = document.getElementById('lightbox-image');
    var title = document.getElementById('lightbox-title');
    var caption = document.getElementById('lightbox-caption');
    var closeButton = dialog.querySelector('.lightbox__close');
    var previousButton = dialog.querySelector('.lightbox__nav--prev');
    var nextButton = dialog.querySelector('.lightbox__nav--next');
    var currentIndex = 0;
    var lastTrigger = null;

    function render() {
      var opener = openers[currentIndex];
      var thumbnail = opener.querySelector('img');
      var figure = opener.closest('figure');
      var figureCaption = figure ? figure.querySelector('figcaption') : null;

      image.src = thumbnail.getAttribute('src');
      image.alt = thumbnail.alt || 'Photograph of Srushti Didi';
      title.textContent = 'Memory ' + (currentIndex + 1) + ' of ' + openers.length;
      caption.textContent = figureCaption ? figureCaption.textContent.trim() : '';
    }

    function finishClose() {
      document.body.classList.remove('dialog-open');

      if (lastTrigger && document.contains(lastTrigger)) {
        lastTrigger.focus();
      }

      lastTrigger = null;
    }

    function closeDialog() {
      if (!dialog.open) {
        return;
      }

      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
        finishClose();
      }
    }

    function openDialog(index, trigger) {
      currentIndex = index;
      lastTrigger = trigger;
      render();

      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }

      document.body.classList.add('dialog-open');

      if (closeButton) {
        closeButton.focus();
      }
    }

    function step(direction) {
      currentIndex = (currentIndex + direction + openers.length) % openers.length;
      render();
    }

    openers.forEach(function (opener, index) {
      opener.addEventListener('click', function () {
        openDialog(index, opener);
      });
    });

    if (closeButton) {
      closeButton.addEventListener('click', closeDialog);
    }

    if (previousButton) {
      previousButton.addEventListener('click', function () {
        step(-1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', function () {
        step(1);
      });
    }

    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) {
        closeDialog();
      }
    });

    dialog.addEventListener('close', finishClose);

    document.addEventListener('keydown', function (event) {
      if (!dialog.open) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        step(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        step(1);
      } else if (event.key === 'Escape') {
        event.preventDefault();
        closeDialog();
      }
    });
  }

  function initSurprise() {
    var card = document.querySelector('.surprise-card');
    var button = document.getElementById('surprise-button');
    var message = document.getElementById('surprise-message');
    var confettiLayer = document.getElementById('confetti-layer');
    var heartsLayer = document.getElementById('celebration-hearts');
    var cleanupTimer = null;
    var colors = ['#e58baf', '#8e3157', '#c7a252', '#fadce7', '#a83c68'];

    if (!card || !button || !message) {
      return;
    }

    function random(min, max) {
      return min + Math.random() * (max - min);
    }

    function clearParticles() {
      if (confettiLayer) {
        confettiLayer.textContent = '';
      }

      if (heartsLayer) {
        heartsLayer.textContent = '';
      }

      if (cleanupTimer !== null) {
        window.clearTimeout(cleanupTimer);
        cleanupTimer = null;
      }
    }

    function createHearts() {
      if (reducedMotion.matches || !heartsLayer) {
        return;
      }

      var fragment = document.createDocumentFragment();

      for (var index = 0; index < 14; index += 1) {
        var heart = document.createElement('span');
        heart.className = 'heart-particle';
        heart.textContent = '♥';
        heart.style.setProperty('--x', random(5, 92).toFixed(2) + '%');
        heart.style.setProperty('--drift', random(-70, 70).toFixed(0) + 'px');
        heart.style.setProperty('--size', random(12, 24).toFixed(0) + 'px');
        heart.style.setProperty('--duration', random(2.4, 4.2).toFixed(2) + 's');
        heart.style.setProperty('--delay', random(0, 0.7).toFixed(2) + 's');
        heart.style.setProperty('--particle-color', colors[index % colors.length]);
        fragment.appendChild(heart);
      }

      heartsLayer.appendChild(fragment);
    }

    function createConfetti() {
      if (reducedMotion.matches || !confettiLayer) {
        return;
      }

      var fragment = document.createDocumentFragment();

      for (var index = 0; index < 70; index += 1) {
        var piece = document.createElement('span');
        piece.className = 'confetti-piece';
        piece.style.setProperty('--x', random(2, 98).toFixed(2) + '%');
        piece.style.setProperty('--width', random(5, 11).toFixed(0) + 'px');
        piece.style.setProperty('--height', random(8, 16).toFixed(0) + 'px');
        piece.style.setProperty('--duration', random(2.6, 4).toFixed(2) + 's');
        piece.style.setProperty('--delay', random(0, 0.45).toFixed(2) + 's');
        piece.style.setProperty('--sway', random(-90, 90).toFixed(0) + 'px');
        piece.style.setProperty('--spin', random(360, 900).toFixed(0) + 'deg');
        piece.style.setProperty('--particle-color', colors[index % colors.length]);
        fragment.appendChild(piece);
      }

      confettiLayer.appendChild(fragment);
    }

    function celebrate() {
      clearParticles();
      card.classList.remove('is-celebrating');
      void card.offsetWidth;
      card.classList.add('is-celebrating');
      message.hidden = false;
      button.setAttribute('aria-expanded', 'true');
      button.textContent = 'Celebrate Once More ❤️';
      createHearts();
      createConfetti();
      cleanupTimer = window.setTimeout(clearParticles, 4200);
    }

    button.addEventListener('click', celebrate);
  }

  function initHeartCursor() {
    var root = document.documentElement;
    var finePointer = window.matchMedia('(pointer: fine)');
    var anyFinePointer = window.matchMedia('(any-pointer: fine) and (any-hover: hover)');
    var moveEvent = 'PointerEvent' in window ? 'pointermove' : 'mousemove';
    var trailColors = ['#e58baf', '#d76b98', '#f4a9c6', '#a83c68', '#c96f9b'];
    var cursor = null;
    var trail = null;
    var frame = null;
    var currentX = -100;
    var currentY = -100;
    var targetX = -100;
    var targetY = -100;
    var previousX = null;
    var previousY = null;
    var lastSpawn = 0;
    var active = false;
    var hostObserver = null;

    function supportsFinePointer() {
      return finePointer.matches || anyFinePointer.matches;
    }

    function applyMotionPreference() {
      if (!active || !cursor) {
        return;
      }

      var isStatic = reducedMotion.matches;
      root.classList.toggle('heart-cursor--static', isStatic);

      if (isStatic) {
        if (frame !== null) {
          window.cancelAnimationFrame(frame);
          frame = null;
        }
        clearTrail();
      } else {
        scheduleFrame();
      }
    }

    function decorateHost() {
      var openDialog = document.querySelector('dialog[open]');
      var host = openDialog || document.body;

      if (!cursor || !trail || cursor.parentNode === host) {
        return;
      }

      host.appendChild(trail);
      host.appendChild(cursor);
    }

    function createElements() {
      if (cursor && trail) {
        return;
      }

      trail = document.createElement('div');
      trail.className = 'heart-trail';
      trail.setAttribute('aria-hidden', 'true');

      cursor = document.createElement('div');
      cursor.className = 'heart-cursor';
      cursor.setAttribute('aria-hidden', 'true');
      cursor.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="rgba(255,255,255,0.9)" stroke-width="0.8" d="M12 21s-7.8-4.9-9.7-9.3C.7 8.4 2.4 5 5.6 5c2 0 3.4 1.1 4.4 2.5C10.9 6.1 12.4 5 14.4 5c3.2 0 4.9 3.4 3.3 6.7C19.8 16.1 12 21 12 21z"/></svg>';

      decorateHost();
    }

    function clearTrail() {
      if (trail) {
        trail.textContent = '';
      }
    }

    function destroyElements() {
      if (cursor) {
        cursor.remove();
      }

      if (trail) {
        trail.remove();
      }

      cursor = null;
      trail = null;
      root.classList.remove('has-heart-cursor');
      root.classList.remove('heart-cursor--static');
      currentX = -100;
      currentY = -100;
      targetX = -100;
      targetY = -100;
      previousX = null;
      previousY = null;
      lastSpawn = 0;
    }

    function scheduleFrame() {
      if (frame === null && active) {
        frame = window.requestAnimationFrame(animateCursor);
      }
    }

    function animateCursor() {
      frame = null;

      if (!active || !cursor) {
        return;
      }

      var deltaX = targetX - currentX;
      var deltaY = targetY - currentY;
      currentX += deltaX * 0.26;
      currentY += deltaY * 0.26;
      cursor.style.transform = 'translate3d(' + currentX.toFixed(2) + 'px, ' + currentY.toFixed(2) + 'px, 0) translate(-50%, -50%)';

      if (Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1) {
        scheduleFrame();
      }
    }

    function spawnTrail(x, y, deltaX, deltaY) {
      if (!trail || document.hidden || reducedMotion.matches) {
        return;
      }

      var count = 2 + (Math.random() > 0.55 ? 1 : 0);
      var speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY) || 1;
      var backX = -deltaX / speed;
      var backY = -deltaY / speed;
      var fragment = document.createDocumentFragment();

      for (var index = 0; index < count; index += 1) {
        var particle = document.createElement('span');
        var offset = 7 + index * 5 + Math.random() * 8;
        var rotation = Math.round((Math.random() - 0.5) * 36);

        particle.className = 'heart-trail__particle';
        particle.textContent = '♥';
        particle.style.setProperty('--x', (x + backX * offset + (Math.random() - 0.5) * 12).toFixed(1) + 'px');
        particle.style.setProperty('--y', (y + backY * offset + (Math.random() - 0.5) * 12).toFixed(1) + 'px');
        particle.style.setProperty('--size', (7 + Math.random() * 7).toFixed(1) + 'px');
        particle.style.setProperty('--duration', Math.round(720 + Math.random() * 380) + 'ms');
        particle.style.setProperty('--delay', Math.round(index * 35 + Math.random() * 50) + 'ms');
        particle.style.setProperty('--drift-x', ((Math.random() - 0.5) * 34).toFixed(1) + 'px');
        particle.style.setProperty('--drift-y', (-30 - Math.random() * 38).toFixed(1) + 'px');
        particle.style.setProperty('--rotate', rotation + 'deg');
        particle.style.setProperty('--rotate-end', (rotation + (Math.random() > 0.5 ? 28 : -28)) + 'deg');
        particle.style.setProperty('--particle-color', trailColors[Math.floor(Math.random() * trailColors.length)]);
        particle.addEventListener('animationend', function (event) {
          event.currentTarget.remove();
        }, { once: true });
        fragment.appendChild(particle);
      }

      trail.appendChild(fragment);

      while (trail.childElementCount > 36) {
        trail.firstElementChild.remove();
      }
    }

    function onPointerMove(event) {
      if (!active || !cursor || document.hidden) {
        return;
      }

      if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') {
        return;
      }

      targetX = event.clientX;
      targetY = event.clientY;
      cursor.classList.add('is-visible');

      if (event.target && event.target.closest) {
        cursor.classList.toggle('is-active', Boolean(event.target.closest('a, button, [role="button"]')));
      }

      if (reducedMotion.matches) {
        currentX = targetX;
        currentY = targetY;
        previousX = targetX;
        previousY = targetY;
        cursor.style.transform = 'translate3d(' + currentX + 'px, ' + currentY + 'px, 0) translate(-50%, -50%)';
        return;
      }

      if (previousX === null) {
        currentX = targetX;
        currentY = targetY;
        previousX = targetX;
        previousY = targetY;
        cursor.style.transform = 'translate3d(' + currentX + 'px, ' + currentY + 'px, 0) translate(-50%, -50%)';
      }

      var distance = Math.sqrt((targetX - previousX) * (targetX - previousX) + (targetY - previousY) * (targetY - previousY));
      var now = window.performance && window.performance.now ? window.performance.now() : Date.now();

      if (distance >= 12 && now - lastSpawn >= 42) {
        spawnTrail(targetX, targetY, targetX - previousX, targetY - previousY);
        lastSpawn = now;
        previousX = targetX;
        previousY = targetY;
      }

      scheduleFrame();
    }

    function onPointerOut(event) {
      if (!event.relatedTarget && cursor) {
        cursor.classList.remove('is-visible');
      }
    }

    function onWindowBlur() {
      if (cursor) {
        cursor.classList.remove('is-visible');
      }
    }

    function onVisibilityChange() {
      if (!active) {
        return;
      }

      if (document.hidden) {
        if (cursor) {
          cursor.classList.remove('is-visible');
        }
        clearTrail();
      } else {
        scheduleFrame();
      }
    }

    function sync() {
      if (supportsFinePointer()) {
        if (!active) {
          active = true;
          createElements();
          decorateHost();

          if (!cursor || !cursor.parentNode) {
            active = false;
            destroyElements();
            return;
          }

          root.classList.add('has-heart-cursor');
          document.addEventListener(moveEvent, onPointerMove, { passive: true });
          document.addEventListener('pointerout', onPointerOut, true);
          window.addEventListener('blur', onWindowBlur);
          document.addEventListener('visibilitychange', onVisibilityChange);

          if ('MutationObserver' in window) {
            hostObserver = new MutationObserver(decorateHost);
            hostObserver.observe(document.body, { attributes: true, attributeFilter: ['open'], subtree: true });
          }
        }

        applyMotionPreference();
        return;
      }

      if (!active) {
        return;
      }

      active = false;
      document.removeEventListener(moveEvent, onPointerMove);
      document.removeEventListener('pointerout', onPointerOut, true);
      window.removeEventListener('blur', onWindowBlur);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      if (hostObserver) {
        hostObserver.disconnect();
        hostObserver = null;
      }

      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }

      clearTrail();
      destroyElements();
    }

    function watchMedia(query) {
      if (query.addEventListener) {
        query.addEventListener('change', sync);
      } else if (query.addListener) {
        query.addListener(sync);
      }
    }

    watchMedia(finePointer);
    watchMedia(anyFinePointer);
    watchMedia(reducedMotion);
    sync();
  }

  initScrollReveal();
  initActiveNavigation();
  initLightbox();
  initSurprise();
  initHeartCursor();
})();
