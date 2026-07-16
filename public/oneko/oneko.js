// oneko.js: Customized with companion selector on right-click
// Original base: https://github.com/adryd325/oneko.js

(function oneko() {
  const isReducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

  if (isReducedMotion) return;

  const nekoEl = document.createElement('div');

  let nekoPosX = 32;
  let nekoPosY = 32;

  let mousePosX = 0;
  let mousePosY = 0;

  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;

  const nekoSpeed = 10;
  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  const variants = [
    { id: 'classic', file: '/oneko/oneko.gif' },
    { id: 'dog', file: '/oneko/oneko-dog.gif' },
    { id: 'tora', file: '/oneko/oneko-tora.gif' },
    { id: 'maia', file: '/oneko/oneko-maia.gif' },
    { id: 'vaporwave', file: '/oneko/oneko-vaporwave.gif' }
  ];

  function setVariant(variantId) {
    const allowed = ['classic', 'dog', 'tora', 'maia', 'vaporwave'];
    if (!allowed.includes(variantId)) {
      variantId = 'classic';
    }
    localStorage.setItem('oneko-variant', variantId);
    let nekoFile = `/oneko/oneko-${variantId}.gif`;
    if (variantId === 'classic') {
      nekoFile = '/oneko/oneko.gif';
    }
    nekoEl.style.backgroundImage = `url(${nekoFile})`;
  }

  function showNekoSelector() {
    // Remove existing selector/backdrop if open
    const existingModal = document.getElementById('oneko-selector-modal');
    const existingBackdrop = document.getElementById('oneko-selector-backdrop');
    if (existingModal) existingModal.remove();
    if (existingBackdrop) existingBackdrop.remove();

    // Inject styles if not present
    if (!document.getElementById('oneko-custom-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'oneko-custom-styles';
      styleEl.textContent = `
        @keyframes onekoFadeIn {
          from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes onekoBackdropFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .oneko-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 2147483645;
          animation: onekoBackdropFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .oneko-modal {
          position: fixed;
          z-index: 2147483646;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: #111111;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 14px;
          width: 180px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
          color: #fff;
          font-family: 'Outfit', 'Cabinet Grotesk', system-ui, -apple-system, sans-serif;
          animation: onekoFadeIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .oneko-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .oneko-title {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        .oneko-close {
          background: rgba(255, 255, 255, 0.08);
          border: none;
          border-radius: 50%;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          font-size: 14px;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .oneko-close:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
          transform: scale(1.05);
        }
        .oneko-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          justify-items: center;
        }
        .oneko-item {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: 1px solid transparent;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .oneko-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }
        .oneko-item.active {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .oneko-preview {
          width: 32px;
          height: 32px;
          background-position: -96px -96px;
          image-rendering: pixelated;
        }
      `;
      document.head.appendChild(styleEl);
    }

    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'oneko-backdrop';
    backdrop.id = 'oneko-selector-backdrop';
    document.body.appendChild(backdrop);

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'oneko-modal';
    modal.id = 'oneko-selector-modal';

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';

    const closeAll = () => {
      modal.remove();
      backdrop.remove();
      // Restore scrolling
      document.body.style.overflow = '';
    };

    backdrop.onclick = closeAll;

    // Header
    const header = document.createElement('div');
    header.className = 'oneko-header';

    const title = document.createElement('h3');
    title.className = 'oneko-title';
    title.textContent = 'Choose Oneko';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'oneko-close';
    closeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
    closeBtn.onclick = closeAll;

    header.appendChild(title);
    header.appendChild(closeBtn);
    modal.appendChild(header);

    // Grid Container
    const gridContainer = document.createElement('div');
    gridContainer.className = 'oneko-grid';

    const activeVariant = localStorage.getItem('oneko-variant') || 'classic';

    variants.forEach(v => {
      const itemBtn = document.createElement('button');
      itemBtn.className = `oneko-item ${v.id === activeVariant ? 'active' : ''}`;
      itemBtn.title = v.id.charAt(0).toUpperCase() + v.id.slice(1);

      const preview = document.createElement('div');
      preview.className = 'oneko-preview';
      preview.style.backgroundImage = `url(${v.file})`;

      itemBtn.appendChild(preview);

      itemBtn.onclick = () => {
        setVariant(v.id);
        closeAll();
      };

      gridContainer.appendChild(itemBtn);
    });

    modal.appendChild(gridContainer);
    document.body.appendChild(modal);
  }

  function init() {
    nekoEl.id = 'oneko';
    nekoEl.ariaHidden = true;
    nekoEl.style.width = '32px';
    nekoEl.style.height = '32px';
    nekoEl.style.position = 'fixed';
    nekoEl.style.pointerEvents = 'auto'; // Enable interactions
    nekoEl.style.cursor = 'pointer'; // Show pointer cursor
    nekoEl.title = 'Right-click me to choose a companion!';
    nekoEl.style.imageRendering = 'pixelated';
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.zIndex = 2147483647;

    // Load saved variant or default
    const savedVariant = localStorage.getItem('oneko-variant') || 'classic';
    setVariant(savedVariant);

    document.body.appendChild(nekoEl);

    // Track mouse coordinates
    document.addEventListener('mousemove', function (event) {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    });

    // Right-click listener to change variant
    nekoEl.addEventListener('contextmenu', function (event) {
      event.preventDefault();
      showNekoSelector();
    });

    // Mobile double tap or long tap alternative interface
    let lastTap = 0;
    nekoEl.addEventListener('touchend', function (event) {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (tapLength < 300 && tapLength > 0) {
        event.preventDefault();
        showNekoSelector();
      }
      lastTap = currentTime;
    });

    window.requestAnimationFrame(onAnimationFrame);
  }

  let lastFrameTimestamp;

  function onAnimationFrame(timestamp) {
    if (!nekoEl.isConnected) {
      return;
    }
    if (!lastFrameTimestamp) {
      lastFrameTimestamp = timestamp;
    }
    if (timestamp - lastFrameTimestamp > 100) {
      lastFrameTimestamp = timestamp;
      frame();
    }
    window.requestAnimationFrame(onAnimationFrame);
  }

  function setSprite(name, frame) {
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function idle() {
    idleTime += 1;

    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 200) == 0 &&
      idleAnimation == null
    ) {
      let avalibleIdleAnimations = ['sleeping', 'scratchSelf'];
      if (nekoPosX < 32) {
        avalibleIdleAnimations.push('scratchWallW');
      }
      if (nekoPosY < 32) {
        avalibleIdleAnimations.push('scratchWallN');
      }
      if (nekoPosX > window.innerWidth - 32) {
        avalibleIdleAnimations.push('scratchWallE');
      }
      if (nekoPosY > window.innerHeight - 32) {
        avalibleIdleAnimations.push('scratchWallS');
      }
      idleAnimation =
        avalibleIdleAnimations[
        Math.floor(Math.random() * avalibleIdleAnimations.length)
        ];
    }

    switch (idleAnimation) {
      case 'sleeping':
        if (idleAnimationFrame < 8) {
          setSprite('tired', 0);
          break;
        }
        setSprite('sleeping', Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192) {
          resetIdleAnimation();
        }
        break;
      case 'scratchWallN':
      case 'scratchWallS':
      case 'scratchWallE':
      case 'scratchWallW':
      case 'scratchSelf':
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite('idle', 0);
        return;
    }
    idleAnimationFrame += 1;
  }

  function frame() {
    frameCount += 1;
    const diffX = nekoPosX - mousePosX;
    const diffY = nekoPosY - mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < nekoSpeed || distance < 48) {
      idle();
      return;
    }

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite('alert', 0);
      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      return;
    }

    let direction;
    direction = diffY / distance > 0.5 ? 'N' : '';
    direction += diffY / distance < -0.5 ? 'S' : '';
    direction += diffX / distance > 0.5 ? 'W' : '';
    direction += diffX / distance < -0.5 ? 'E' : '';
    setSprite(direction, frameCount);

    nekoPosX -= (diffX / distance) * nekoSpeed;
    nekoPosY -= (diffY / distance) * nekoSpeed;

    nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
    nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
  }

  init();
})();
