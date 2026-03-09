/* =======================
   Section 1 JS
   ======================= */
const qs = document.querySelector.bind(document);
const easingHeart = mojs.easing.path(
  "M0,100C2.9,86.7,33.6-7.3,46-7.3s15.2,22.7,26,22.7S89,0,100,0"
);

const el = {
  container: qs(".mo-container"),
  i: qs(".lttr--I"),
  l: qs(".lttr--L"),
  o: qs(".lttr--O"),
  v: qs(".lttr--V"),
  e: qs(".lttr--E"),
  y: qs(".lttr--Y"),
  o2: qs(".lttr--O2"),
  u: qs(".lttr--U"),
  lineLeft: qs(".line--left"),
  lineRight: qs(".line--rght"),
  colTxt: "#763c8c",
  colHeart: "#fa4843",
  blup: qs(".blup"),
  blop: qs(".blop"),
  sound: qs(".sound"),
};

class Heart extends mojs.CustomShape {
  getShape() {
    return '<path d="M50,88.9C25.5,78.2,0.5,54.4,3.8,31.1S41.3,1.8,50,29.9c8.7-28.2,42.8-22.2,46.2,1.2S74.5,78.2,50,88.9z"/>';
  }
  getLength() {
    return 200;
  }
}

mojs.addShape("heart", Heart);

const crtBoom = (delay = 0, x = 0, rd = 46) => {
  const parent = el.container;
  const crcl = new mojs.Shape({
    shape: "circle",
    fill: "none",
    stroke: el.colTxt,
    strokeWidth: { 5: 0 },
    radius: { [rd]: [rd + 20] },
    easing: "quint.out",
    duration: 500 / 3,
    parent,
    delay,
    x,
  });

  const brst = new mojs.Burst({
    radius: { [rd + 15]: 110 },
    angle: "rand(60, 180)",
    count: 3,
    timeline: { delay },
    parent,
    x,
    children: {
      radius: [5, 3, 7],
      fill: el.colTxt,
      scale: { 1: 0, easing: "quad.in" },
      pathScale: [0.8, null],
      degreeShift: ["rand(13, 60)", null],
      duration: 1000 / 3,
      easing: "quint.out",
    },
  });

  return [crcl, brst];
};

const crtLoveTl = () => {
  const move = 1000;
  const boom = 200;
  const easing = "sin.inOut";
  const easingBoom = "sin.in";
  const easingOut = "sin.out";
  const opts = { duration: move, easing, opacity: 1 };
  const delta = 150;

  return new mojs.Timeline().add([
    new mojs.Tween({
      duration: move,
      onStart: () => {
        [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach((elTarget) => {
          elTarget.style.opacity = 1;
          elTarget.style =
            "transform: translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1); opacity: 1;";
        });
      },
      onComplete: () => {
        [el.l, el.o, el.v, el.e].forEach((elTarget) => (elTarget.style.opacity = 0));
        el.blop.play();
      },
    }),

    new mojs.Tween({
      duration: move * 2 + boom,
      onComplete: () => {
        [el.y, el.o2].forEach((elTarget) => (elTarget.style.opacity = 0));
        el.blop.play();
      },
    }),

    new mojs.Tween({
      duration: move * 3 + boom * 2 - delta,
      onComplete: () => {
        el.i.style.opacity = 0;
        el.blop.play();
      },
    }),

    new mojs.Tween({
      duration: move * 3 + boom * 2,
      onComplete: () => {
        el.u.style.opacity = 0;
        el.blup.play();
      },
    }),

    new mojs.Tween({
      duration: 50,
      delay: 4050,
      onUpdate: (progress) => {
        [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach((elTarget) => {
          elTarget.style = `transform: translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1); opacity: ${1 * progress
            };`;
        });
      },
      onComplete: () => {
        [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach((elTarget) => {
          elTarget.style.opacity = 1;
          elTarget.style =
            "transform: translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1); opacity: 1;";
        });
      },
    }),

    new mojs.Html({
      ...opts,
      el: el.lineLeft,
      x: { 0: 52 },
    })
      .then({
        duration: boom + move,
        easing,
        x: { to: 52 + 54 },
      })
      .then({
        duration: boom + move,
        easing,
        x: { to: 52 + 54 + 60 },
      })
      .then({
        duration: 150,
        easing,
        x: { to: 52 + 54 + 60 + 10 },
      })
      .then({
        duration: 300,
      })
      .then({
        duration: 350,
        x: { to: 0 },
        easing: easingOut,
      }),

    new mojs.Html({
      ...opts,
      el: el.lineRight,
      x: { 0: -52 },
    })
      .then({
        duration: boom + move,
        easing,
        x: { to: -52 - 54 },
      })
      .then({
        duration: boom + move,
        easing,
        x: { to: -52 - 54 - 60 },
      })
      .then({
        duration: 150,
        easing,
        x: { to: -52 - 54 - 60 - 10 },
      })
      .then({
        duration: 300,
      })
      .then({
        duration: 350,
        x: { to: 0 },
        easing: easingOut,
      }),

    new mojs.Html({
      ...opts,
      el: el.i,
      x: { 0: 34 },
    })
      .then({
        duration: boom,
        easing: easingBoom,
        x: { to: 34 + 19 },
      })
      .then({
        duration: move,
        easing,
        x: { to: 34 + 19 + 40 },
      })
      .then({
        duration: boom,
        easing: easingBoom,
        x: { to: 34 + 19 + 40 + 30 },
      })
      .then({
        duration: move,
        easing,
        x: { to: 34 + 19 + 40 + 30 + 30 },
      }),

    new mojs.Html({
      ...opts,
      el: el.l,
      x: { 0: 15 },
    }),

    new mojs.Html({
      ...opts,
      el: el.o,
      x: { 0: 11 },
    }),

    new mojs.Html({
      ...opts,
      el: el.v,
      x: { 0: 3 },
    }),

    new mojs.Html({
      ...opts,
      el: el.e,
      x: { 0: -3 },
    }),

    new mojs.Html({
      ...opts,
      el: el.y,
      x: { 0: -20 },
    })
      .then({
        duration: boom,
        easing: easingBoom,
        x: { to: -20 - 33 },
      })
      .then({
        duration: move,
        easing,
        x: { to: -20 - 33 - 24 },
      }),

    new mojs.Html({
      ...opts,
      el: el.o2,
      x: { 0: -27 },
    })
      .then({
        duration: boom,
        easing: easingBoom,
        x: { to: -27 - 27 },
      })
      .then({
        duration: move,
        easing,
        x: { to: -27 - 27 - 30 },
      }),

    new mojs.Html({
      ...opts,
      el: el.u,
      x: { 0: -32 },
    })
      .then({
        duration: boom,
        easing: easingBoom,
        x: { to: -32 - 21 },
      })
      .then({
        duration: move,
        easing,
        x: { to: -32 - 21 - 36 },
      })
      .then({
        duration: boom,
        easing: easingBoom,
        x: { to: -32 - 21 - 36 - 31 },
      })
      .then({
        duration: move,
        easing,
        x: { to: -32 - 21 - 36 - 31 - 27 },
      }),

    new mojs.Shape({
      parent: el.container,
      shape: "heart",
      delay: move,
      fill: el.colHeart,
      x: -64,
      scale: { 0: 0.95, easing: easingHeart },
      duration: 500,
    })
      .then({
        x: { to: -62, easing },
        scale: { to: 0.65, easing },
        duration: boom + move - 500,
      })
      .then({
        duration: boom - 50,
        x: { to: -62 + 48 },
        scale: { to: 0.9 },
        easing: easingBoom,
      })
      .then({
        duration: 125,
        scale: { to: 0.8 },
        easing: easingOut,
      })
      .then({
        duration: 125,
        scale: { to: 0.85 },
        easing: easingOut,
      })
      .then({
        duration: move - 200,
        scale: { to: 0.45 },
        easing,
      })
      .then({
        delay: -75,
        duration: 150,
        x: { to: 0 },
        scale: { to: 0.9 },
        easing: easingBoom,
      })
      .then({
        duration: 125,
        scale: { to: 0.8 },
        easing: easingOut,
      })
      .then({
        duration: 125,
        scale: { to: 0.85 },
        easing: easingOut,
      })
      .then({
        duration: 125,
      })
      .then({
        duration: 350,
        scale: { to: 0 },
        easing: easingOut,
      }),

    ...crtBoom(move, -64, 46),
    ...crtBoom(move * 2 + boom, 18, 34),
    ...crtBoom(move * 3 + boom * 2 - delta, -64, 34),
    ...crtBoom(move * 3 + boom * 2, 45, 34),
  ]);
};

const loveTl = crtLoveTl().play();
setInterval(() => {
  loveTl.replay();
}, 4300);

const volume = 0.2;
el.blup.volume = volume;
el.blop.volume = volume;

const toggleSound = () => {
  let on = true;
  return () => {
    if (on) {
      el.blup.volume = 0.0;
      el.blop.volume = 0.0;
      el.sound.classList.add("sound--off");
    } else {
      el.blup.volume = volume;
      el.blop.volume = volume;
      el.sound.classList.remove("sound--off");
    }
    on = !on;
  };
};
el.sound.addEventListener("click", toggleSound());

/* =======================
   Section 2 JS
   ======================= */
var canvas;
var stage;
var container;
var captureContainers;
var captureIndex;

function init() {
  canvas = document.getElementById("testCanvas");
  stage = new createjs.Stage(canvas);

  // Set width/height dynamically instead of global inner
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var w = canvas.width;
  var h = canvas.height;

  container = new createjs.Container();
  stage.addChild(container);

  captureContainers = [];
  captureIndex = 0;

  for (var i = 0; i < 100; i++) {
    var heart = new createjs.Shape();
    heart.graphics.beginFill(createjs.Graphics.getHSL(Math.random() * 30 - 45, 100, 50 + Math.random() * 30));
    heart.graphics.moveTo(0, -12).curveTo(1, -20, 8, -20).curveTo(16, -20, 16, -10).curveTo(16, 0, 0, 12);
    heart.graphics.curveTo(-16, 0, -16, -10).curveTo(-16, -20, -8, -20).curveTo(-1, -20, 0, -12);
    heart.y = -100;

    container.addChild(heart);
  }

  var text = new createjs.Text("the longer I'm with you\nthe more I love you", "bold 24px Arial", "#312");
  text.textAlign = "center";
  text.x = w / 2;
  text.y = h / 2 - text.getMeasuredLineHeight();
  stage.addChild(text);

  for (i = 0; i < 100; i++) {
    var captureContainer = new createjs.Container();
    captureContainer.cache(0, 0, w, h);
    captureContainers.push(captureContainer);
  }

  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  // We will trigger the tick event via IntersectionObserver

  // Add resize handling for responsiveness (bonus)
  window.addEventListener('resize', handleResize);
}

function setupScrollAnimations() {
  const sec2 = document.querySelector('.section-2');

  // For the second section, we still just toggle the canvas ticker on/off when in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target.classList.contains('section-2')) {
        if (entry.isIntersecting) {
          if (!createjs.Ticker.hasEventListener("tick")) {
            createjs.Ticker.addEventListener("tick", tick);
          }
        } else {
          createjs.Ticker.removeEventListener("tick", tick);
        }
      }
    });
  }, { threshold: 0.1 });

  if (sec2) observer.observe(sec2);
}

function handleResize() {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

function tick(event) {
  var w = canvas.width;
  var h = canvas.height;
  var l = container.numChildren;

  captureIndex = (captureIndex + 1) % captureContainers.length;
  stage.removeChildAt(0);
  var captureContainer = captureContainers[captureIndex];
  stage.addChildAt(captureContainer, 0);
  captureContainer.addChild(container);

  for (var i = 0; i < l; i++) {
    var heart = container.getChildAt(i);
    if (heart.y < -50) {
      heart._x = Math.random() * w;
      heart.y = h * (1 + Math.random()) + 50;
      heart.perX = (1 + Math.random() * 2) * h;
      heart.offX = Math.random() * h;
      heart.ampX = heart.perX * 0.1 * (0.15 + Math.random());
      heart.velY = -Math.random() * 2 - 1;
      heart.scale = Math.random() * 2 + 1;
      heart._rotation = Math.random() * 40 - 20;
      heart.alpha = Math.random() * 0.75 + 0.05;
      heart.compositeOperation = Math.random() < 0.33 ? "lighter" : "source-over";
    }
    var int = (heart.offX + heart.y) / heart.perX * Math.PI * 2;
    heart.y += heart.velY * heart.scaleX / 2;
    heart.x = heart._x + Math.cos(int) * heart.ampX;
    heart.rotation = heart._rotation + Math.sin(int) * 30;
  }

  captureContainer.updateCache("source-over");
  stage.update(event);
}

// Make sure init runs after load
window.addEventListener('load', () => {
  init();
  setupScrollAnimations();
});
