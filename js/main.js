/* Dr. Andrés Humphreys — shared behaviour for every page. */
(function () {
    'use strict';

    var WHATSAPP_URL = 'https://wa.me/541141411075?text=Hola!%20Quiero%20solicitar%20un%20turno%20con%20el%20Doctor%20Humphreys';

    var NAV = [
        { key: 'index', href: 'index.html', label: 'Inicio' },
        { key: 'acerca', href: 'acerca-de-mi.html', label: 'Acerca de mí' },
        { key: 'consultorios', href: 'consultorios.html', label: 'Consultorios y contacto' },
        { key: 'informacion', href: 'informacion.html', label: 'Información al paciente' }
    ];

    var PAGES = {
        '': 'index', 'index.html': 'index', 'acerca-de-mi.html': 'acerca',
        'consultorios.html': 'consultorios', 'informacion.html': 'informacion'
    };

    var ICONS = {
        pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
        phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
        mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
        clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
        check: '<path d="M20 6 9 17l-5-5"/>',
        alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
        arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
        download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
        search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
        printer: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
        menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
        close: '<path d="M18 6 6 18M6 6l12 12"/>',
        steth: '<path d="M5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 12 0V4a2 2 0 0 0-2-2h-1"/><path d="M8 15v1a6 6 0 0 0 12 0v-4"/><circle cx="20" cy="10" r="2"/>',
        shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
        video: '<rect x="2" y="5" width="14" height="14" rx="2"/><path d="m22 8-6 4 6 4z"/>',
        chevron: '<path d="m6 9 6 6 6-6"/>',
        calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
        file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/>',
        heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
        whatsapp: '<path stroke="none" fill="currentColor" d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>'
    };

    function icon(name, cls) {
        return '<svg class="i ' + (cls || '') + '" aria-hidden="true" focusable="false"><use href="#i-' + name + '"/></svg>';
    }

    function injectSprite() {
        var symbols = Object.keys(ICONS).map(function (name) {
            var vb = name === 'whatsapp' ? '0 0 16 16' : '0 0 24 24';
            return '<symbol id="i-' + name + '" viewBox="' + vb + '">' + ICONS[name] + '</symbol>';
        }).join('');
        var holder = document.createElement('div');
        holder.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">' + symbols + '</svg>';
        document.body.insertBefore(holder.firstChild, document.body.firstChild);
    }

    // Replace <i data-icon="name"></i> placeholders with inline SVG icons.
    function hydrateIcons() {
        document.querySelectorAll('[data-icon]').forEach(function (el) {
            el.outerHTML = icon(el.getAttribute('data-icon'), el.getAttribute('data-class') || '');
        });
    }

    function renderHeader(active) {
        var host = document.getElementById('site-header');
        if (!host) return;
        var links = NAV.map(function (n) {
            return '<a href="' + n.href + '" class="nav-link' + (n.key === active ? ' active' : '') + '"' +
                (n.key === active ? ' aria-current="page"' : '') + '>' + n.label + '</a>';
        }).join('');
        host.outerHTML =
            '<header class="site-header">' +
            '<a class="skip-link" href="#contenido">Saltar al contenido</a>' +
            '<div class="container nav-row">' +
            '<a href="index.html" class="brand"><img src="assets/logo.svg" alt="" width="34" height="34"><span>Dr. Andrés Humphreys</span></a>' +
            '<button class="menu-btn" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="site-nav">' + icon('menu') + '</button>' +
            '<nav id="site-nav" class="site-nav" aria-label="Principal">' + links +
            '<a href="consultorios.html#turnos" class="btn btn-primary nav-cta">' + icon('calendar') + 'Reservar turno</a>' +
            '<a href="tel:1141411075" class="nav-tel">' + icon('phone') + '11-4141-1075</a></nav>' +
            '</div><div class="nav-scrim" hidden></div></header>';
    }

    function renderFooter() {
        var host = document.getElementById('site-footer');
        if (!host) return;
        host.outerHTML =
            '<footer class="site-footer"><div class="container footer-grid">' +
            '<div><a href="index.html" class="brand brand-light"><img src="assets/logo.svg" alt="" width="34" height="34"><span>Dr. Andrés Humphreys</span></a>' +
            '<p>Ginecólogo. Acreditado en Patología del Tracto Genital Inferior y Colposcopia.</p></div>' +
            '<div><h2>Consultorios</h2>' +
            '<p class="with-icon">' + icon('pin') + '<span>Temperley: Av. Meeks 1313, 1er piso, depto 4</span></p>' +
            '<p class="with-icon">' + icon('pin') + '<span>Palermo: Av. Santa Fe 3242, 9no piso, depto F</span></p>' +
            '<p class="with-icon">' + icon('phone') + '<span><a href="tel:42443486">4244-3486</a> · <a href="tel:1141411075">11-4141-1075</a></span></p></div>' +
            '<div><h2>Seguí leyendo</h2>' +
            NAV.slice(1).map(function (n) { return '<p><a href="' + n.href + '">' + n.label + '</a></p>'; }).join('') + '</div>' +
            '</div><div class="container footer-bottom"><p>&copy; ' + new Date().getFullYear() +
            ' Dr. Andrés Humphreys. Todos los derechos reservados.</p></div></footer>' +
            '<a class="wa-fab" href="' + WHATSAPP_URL + '" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp">' + icon('whatsapp') + '</a>' +
            '<div class="mobile-bar"><a href="consultorios.html#turnos" class="btn btn-primary">' + icon('calendar') + 'Reservar turno</a>' +
            '<a href="tel:1141411075" class="btn btn-ghost" aria-label="Llamar al 11-4141-1075">' + icon('phone') + '</a></div>';
    }

    function setupBarVisibility() {
        var targets = document.querySelectorAll('[data-hide-bar]');
        if (!targets.length || !('IntersectionObserver' in window)) return;
        var visible = new Set();
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) { e.isIntersecting ? visible.add(e.target) : visible.delete(e.target); });
            document.body.classList.toggle('bar-hidden', visible.size > 0);
        });
        targets.forEach(function (t) { io.observe(t); });
    }

    function setupMenu() {
        var btn = document.querySelector('.menu-btn');
        var nav = document.getElementById('site-nav');
        var scrim = document.querySelector('.nav-scrim');
        if (!btn || !nav) return;
        function focusables() {
            return [btn].concat(Array.prototype.slice.call(nav.querySelectorAll('a[href], button')));
        }
        function set(open) {
            var was = nav.classList.contains('open');
            nav.classList.toggle('open', open);
            scrim.hidden = !open;
            document.body.classList.toggle('no-scroll', open);
            btn.setAttribute('aria-expanded', String(open));
            btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
            btn.innerHTML = icon(open ? 'close' : 'menu');
            if (open && !was) {
                var first = nav.querySelector('a[href]');
                if (first) first.focus();
            } else if (!open && was) {
                btn.focus();
            }
        }
        btn.addEventListener('click', function () { set(!nav.classList.contains('open')); });
        scrim.addEventListener('click', function () { set(false); });
        nav.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
        document.addEventListener('keydown', function (e) {
            if (!nav.classList.contains('open')) return;
            if (e.key === 'Escape') { set(false); return; }
            if (e.key !== 'Tab') return;
            var items = focusables();
            var first = items[0], last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            else if (items.indexOf(document.activeElement) === -1) { e.preventDefault(); first.focus(); }
        });
        window.addEventListener('resize', function () { if (window.innerWidth > 860 && nav.classList.contains('open')) set(false); });
    }

    function setupCarousels() {
        document.querySelectorAll('[data-carousel]').forEach(function (c) {
            var track = c.querySelector('.carousel-track');
            var slides = c.querySelectorAll('.carousel-track img');
            var dotsHost = c.querySelector('.carousel-dots');
            var cur = 0;
            slides.forEach(function (_, i) {
                var d = document.createElement('button');
                d.type = 'button';
                d.className = 'carousel-dot';
                d.setAttribute('aria-label', 'Foto ' + (i + 1));
                d.addEventListener('click', function () { go(i); });
                dotsHost.appendChild(d);
            });
            function go(i) {
                cur = (i + slides.length) % slides.length;
                track.style.transform = 'translateX(-' + cur * 100 + '%)';
                dotsHost.querySelectorAll('.carousel-dot').forEach(function (d, k) { d.classList.toggle('active', k === cur); });
            }
            c.querySelector('[data-prev]').addEventListener('click', function () { go(cur - 1); });
            c.querySelector('[data-next]').addEventListener('click', function () { go(cur + 1); });
            var x0 = null;
            c.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
            c.addEventListener('touchend', function (e) {
                if (x0 === null) return;
                var dx = e.changedTouches[0].clientX - x0;
                if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1));
                x0 = null;
            });
            go(0);
        });
    }

    // Office tabs: Temperley / Palermo (deep-linkable with #temperley / #palermo).
    function setupTabs() {
        var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-tab]'));
        if (!tabs.length) return;
        var panels = Array.prototype.slice.call(document.querySelectorAll('[data-panel]'));
        var ids = tabs.map(function (t) { return t.getAttribute('data-tab'); });
        function show(id, focus) {
            tabs.forEach(function (t) {
                var on = t.getAttribute('data-tab') === id;
                t.classList.toggle('active', on);
                t.setAttribute('aria-selected', String(on));
                t.tabIndex = on ? 0 : -1;
                if (on && focus) t.focus();
            });
            panels.forEach(function (p) { var off = p.getAttribute('data-panel') !== id;
                p.hidden = off;
                p.setAttribute('aria-hidden', String(off));
            });
        }
        tabs.forEach(function (t, i) {
            t.addEventListener('click', function () {
                var id = t.getAttribute('data-tab');
                show(id);
                history.replaceState(null, '', '#' + id);
            });
            t.addEventListener('keydown', function (e) {
                var n;
                if (e.key === 'ArrowRight') n = (i + 1) % ids.length;
                else if (e.key === 'ArrowLeft') n = (i - 1 + ids.length) % ids.length;
                else if (e.key === 'Home') n = 0;
                else if (e.key === 'End') n = ids.length - 1;
                else return;
                e.preventDefault();
                show(ids[n], true);
            });
        });
        function fromHash() {
            var h = location.hash.replace('#', '');
            if (ids.indexOf(h) > -1) show(h);
        }
        show(ids[0]);
        fromHash();
        window.addEventListener('hashchange', fromHash);
    }

    function setupInfoPage() {
        var content = document.getElementById('info-content');
        if (!content) return;

        // Search: hides sections/FAQs without a match and opens matching FAQs.
        var input = document.getElementById('info-search');
        var empty = document.getElementById('info-empty');
        var norm = function (s) { return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); };
        var blocks = Array.prototype.slice.call(content.querySelectorAll('[data-section]'));
        blocks.forEach(function (b) { b._text = norm(b.textContent); });
        input.addEventListener('input', function () {
            var q = norm(input.value.trim());
            var shown = 0;
            blocks.forEach(function (b) {
                var hit = !q || b._text.indexOf(q) > -1;
                b.hidden = !hit;
                if (hit) shown++;
                b.querySelectorAll('details').forEach(function (d) {
                    var match = !!q && norm(d.textContent).indexOf(q) > -1;
                    d.hidden = !!q && !match;
                    d.open = match;
                });
            });
            empty.hidden = shown > 0;
        });

        // Scroll-spy for the table of contents (keeps the active chip visible on mobile).
        var links = Array.prototype.slice.call(document.querySelectorAll('.toc a'));
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (en) {
                    if (!en.isIntersecting) return;
                    links.forEach(function (l) {
                        var on = l.getAttribute('href') === '#' + en.target.id;
                        l.classList.toggle('active', on);
                        if (on && l.parentNode.scrollWidth > l.parentNode.clientWidth) {
                            l.parentNode.scrollTo({ left: l.offsetLeft - 16, behavior: 'smooth' });
                        }
                    });
                });
            }, { rootMargin: '-20% 0px -70% 0px' });
            blocks.forEach(function (b) { io.observe(b); });
        }

        function openHash() {
            var t = location.hash && document.querySelector(location.hash);
            if (t && t.tagName === 'DETAILS') t.open = true;
        }
        openHash();
        window.addEventListener('hashchange', openHash);

        // Print: expand every accordion.
        var wasClosed = [];
        window.addEventListener('beforeprint', function () {
            wasClosed = Array.prototype.filter.call(content.querySelectorAll('details'), function (d) { return !d.open; });
            wasClosed.forEach(function (d) { d.open = true; });
        });
        window.addEventListener('afterprint', function () { wasClosed.forEach(function (d) { d.open = false; }); });
        document.querySelectorAll('[data-print]').forEach(function (b) {
            b.addEventListener('click', function () { window.print(); });
        });
    }

    // Video block: set data-video-src on #leep-video in informacion.html.
    // Supports YouTube / Vimeo watch URLs, or a direct .mp4/.webm file.
    function setupVideo() {
        var box = document.getElementById('leep-video');
        if (!box) return;
        var src = (box.getAttribute('data-video-src') || '').trim();
        var stage = box.querySelector('.video-stage');
        var fallback = box.querySelector('.video-fallback');
        if (!src) { fallback.hidden = false; return; }
        var yt = src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/);
        var vm = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
        var el;
        if (yt || vm) {
            el = document.createElement('iframe');
            el.src = yt ? 'https://www.youtube-nocookie.com/embed/' + yt[1] : 'https://player.vimeo.com/video/' + vm[1];
            el.title = 'Video: cuidados después del LEEP';
            el.loading = 'lazy';
            el.allow = 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen';
            el.allowFullscreen = true;
        } else {
            el = document.createElement('video');
            el.src = src;
            el.controls = true;
            el.preload = 'metadata';
            el.setAttribute('playsinline', '');
        }
        stage.appendChild(el);
        stage.hidden = false;
        fallback.hidden = true;
    }

    document.addEventListener('DOMContentLoaded', function () {
        var page = location.pathname.split('/').pop();
        injectSprite();
        renderHeader(PAGES[page] || '');
        renderFooter();
        hydrateIcons();
        setupMenu();
        setupBarVisibility();
        setupCarousels();
        setupTabs();
        setupInfoPage();
        setupVideo();
    });
})();
