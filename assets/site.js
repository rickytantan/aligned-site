/* ALIGNED — shared behaviour for sub-pages (index.html keeps its own inline script) */
(function(){
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Nav: scroll state + mobile toggle ---------- */
  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if(nav){
    var onScroll = function(){ nav.classList.toggle("scrolled", window.scrollY > 24); };
    onScroll();
    window.addEventListener("scroll", onScroll, {passive:true});
  }
  if(navToggle && navLinks){
    navToggle.addEventListener("click", function(){
      var open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.innerHTML = open ? '<i class="ph ph-x"></i>' : '<i class="ph ph-list"></i>';
    });
    navLinks.addEventListener("click", function(e){
      if(e.target.closest("a")){
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded","false");
        navToggle.innerHTML = '<i class="ph ph-list"></i>';
      }
    });
  }

  /* ---------- Language switcher lives in assets/i18n.js (loaded after this file) ---------- */

  /* ---------- Title reveal: split .tsplit headings into masked words ---------- */
  function splitTitle(el){
    var units = [];
    var base = parseFloat(el.getAttribute("data-tsdelay")) || 0;
    Array.prototype.slice.call(el.childNodes).forEach(function(node){
      if(node.nodeType === 3){
        var frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(function(p){
          if(!p) return;
          if(/^\s+$/.test(p)){ frag.appendChild(document.createTextNode(" ")); return; }
          var m = document.createElement("span"); m.className = "tw";
          var w = document.createElement("span"); w.className = "tw__i"; w.textContent = p;
          m.appendChild(w); frag.appendChild(m); units.push(w);
        });
        node.parentNode.replaceChild(frag, node);
      } else if(node.nodeType === 1){
        var m2 = document.createElement("span"); m2.className = "tw";
        var w2 = document.createElement("span"); w2.className = "tw__i";
        node.parentNode.insertBefore(m2, node);
        w2.appendChild(node); m2.appendChild(w2); units.push(w2);
      }
    });
    units.forEach(function(u,i){ u.style.transitionDelay = (base + i*0.06).toFixed(2) + "s"; });
  }
  var titles = document.querySelectorAll(".tsplit");
  if(!reduce && "IntersectionObserver" in window){
    titles.forEach(splitTitle);
    var tIO = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add("ts-in"); tIO.unobserve(e.target); }
      });
    }, {threshold:.25, rootMargin:"0px 0px -8% 0px"});
    titles.forEach(function(t){ tIO.observe(t); });
  } else {
    titles.forEach(function(t){ t.classList.add("ts-in"); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if(reduce){ reveals.forEach(function(el){ el.classList.add("in"); }); }
  else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, {threshold:.14, rootMargin:"0px 0px -8% 0px"});
    reveals.forEach(function(el){ io.observe(el); });
  }

  /* ---------- Sticky mobile book button (hide near the final CTA) ---------- */
  var mobileBook = document.getElementById("mobileBook");
  var finalCta = document.getElementById("book");
  if(mobileBook && "IntersectionObserver" in window){
    mobileBook.classList.add("show");
    if(finalCta){
      var ctaIO = new IntersectionObserver(function(es){
        es.forEach(function(e){ mobileBook.classList.toggle("show", !e.isIntersecting); });
      }, {threshold:.3});
      ctaIO.observe(finalCta);
    }
  }

  /* ---------- FAQ: allow only one open at a time ---------- */
  document.querySelectorAll(".faq").forEach(function(faq){
    faq.addEventListener("toggle", function(e){
      if(e.target.tagName === "DETAILS" && e.target.open){
        faq.querySelectorAll("details[open]").forEach(function(d){
          if(d !== e.target) d.open = false;
        });
      }
    }, true);
  });

  /* ---------- Scroll-scrubbed video (.scrub) ----------
     Base markup is a static stack (readable with no JS). When conditions
     allow, add .scrub--on: the stage pins for 300vh, the video's
     currentTime follows a smoothed scroll progress, and the panels switch
     on equal fractions of it. Falls back to the static stack on reduced motion,
     Save-Data, or video failure. */
  var scrub = document.querySelector(".scrub");
  if(scrub && !reduce && !(navigator.connection && navigator.connection.saveData) && "IntersectionObserver" in window){
    var sVideo = scrub.querySelector(".scrub__video");
    var sPanels = scrub.querySelectorAll(".scrub__panel");
    var sDots = scrub.querySelectorAll(".scrub__dots span");
    if(sVideo){
      // smaller file on small screens (both encodes are all-keyframe)
      var srcUrl = sVideo.getAttribute("data-src");
      var mobileSrc = sVideo.getAttribute("data-src-mobile");
      if(mobileSrc && window.matchMedia("(max-width: 768px)").matches){
        srcUrl = mobileSrc;
      }
      scrub.classList.add("scrub--on");

      var sDuration = 0, sSmooth = 0, sRaf = null, sActive = -1;
      var setDuration = function(){
        if(sVideo.duration){ sDuration = Math.max(0, sVideo.duration - 0.05); }
      };
      sVideo.addEventListener("loadedmetadata", setDuration);
      setDuration();

      var setPanel = function(i){
        if(i === sActive) return;
        sActive = i;
        sPanels.forEach(function(p,k){ p.classList.toggle("active", k === i); });
        sDots.forEach(function(d,k){ d.classList.toggle("on", k === i); });
      };
      var sProgress = function(){
        var rect = scrub.getBoundingClientRect();
        var total = rect.height - window.innerHeight;
        if(total <= 0) return 0;
        return Math.min(1, Math.max(0, -rect.top / total));
      };
      var sTick = function(){
        var target = sProgress();
        sSmooth += (target - sSmooth) * 0.12;
        if(Math.abs(target - sSmooth) < 0.0005) sSmooth = target;
        if(sDuration && sVideo.readyState > 1){
          try{ sVideo.currentTime = sSmooth * sDuration; }catch(err){}
        }
        setPanel(Math.min(sPanels.length - 1, Math.floor(target * sPanels.length)));
        sRaf = requestAnimationFrame(sTick);
      };

      // Fetch the file as a blob one viewport ahead of arrival. Blob URLs are
      // fully seekable regardless of the host's HTTP Range support (plain
      // src on a range-less server reports seekable [0,0] and every seek
      // snaps back to 0). Falls back to a direct src if the fetch fails.
      var sLoaded = false;
      var sLoad = function(){
        if(sLoaded) return; sLoaded = true;
        if(window.fetch && window.URL && URL.createObjectURL){
          fetch(srcUrl).then(function(r){
            if(!r.ok) throw new Error(r.status);
            return r.blob();
          }).then(function(b){
            sVideo.src = URL.createObjectURL(b);
          }).catch(function(){
            sVideo.preload = "auto"; sVideo.src = srcUrl;
          });
        } else {
          sVideo.preload = "auto"; sVideo.src = srcUrl;
        }
      };
      var sLoadIO = new IntersectionObserver(function(es){
        es.forEach(function(e){
          if(e.isIntersecting){ sLoad(); sLoadIO.disconnect(); }
        });
      }, {rootMargin:"100% 0px"});
      sLoadIO.observe(scrub);

      var sRunIO = new IntersectionObserver(function(es){
        es.forEach(function(e){
          if(e.isIntersecting){ if(sRaf === null){ sRaf = requestAnimationFrame(sTick); } }
          else if(sRaf !== null){ cancelAnimationFrame(sRaf); sRaf = null; }
        });
      });
      sRunIO.observe(scrub);
      setPanel(0);

      // any video failure -> revert to the static stack
      sVideo.addEventListener("error", function(){
        if(sRaf !== null){ cancelAnimationFrame(sRaf); sRaf = null; }
        sRunIO.disconnect(); sLoadIO.disconnect();
        scrub.classList.remove("scrub--on");
        sPanels.forEach(function(p){ p.classList.remove("active"); });
      });
    }
  }

  /* ---------- Chip filters: [data-filter] chips show/hide [data-cat] cards ---------- */
  document.querySelectorAll("[data-chipset]").forEach(function(set){
    var targetSel = set.getAttribute("data-chipset");
    var cards = document.querySelectorAll(targetSel + " [data-cat]");
    set.addEventListener("click", function(e){
      var chip = e.target.closest(".chip"); if(!chip) return;
      set.querySelectorAll(".chip").forEach(function(c){ c.classList.remove("active"); });
      chip.classList.add("active");
      var f = chip.getAttribute("data-filter");
      cards.forEach(function(card){
        card.style.display = (f === "all" || card.getAttribute("data-cat") === f) ? "" : "none";
      });
    });
  });
})();
