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
    { id: 'classic', name: 'Classic Cat', file: '/oneko/oneko.gif', desc: 'The original white cat' },
    { id: 'tora', name: 'Tora Cat', file: '/oneko/oneko-tora.gif', desc: 'Cute tiger-striped cat' },
    { id: 'dog', name: 'Doggy', file: '/oneko/oneko-dog.gif', desc: 'A friendly running pup' },
    { id: 'maia', name: 'Maia', file: '/oneko/oneko-maia.gif', desc: 'Sleek brown companion' },
    { id: 'vaporwave', name: 'Vaporwave', file: '/oneko/oneko-vaporwave.gif', desc: 'Synthwave purple cat' }
  ];

  function setVariant(variantId) {
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
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 2147483645;
          animation: onekoBackdropFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .oneko-modal {
          position: fixed;
          z-index: 2147483646;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: rgba(15, 15, 15, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 24px;
          width: 90%;
          max-width: 350px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05);
          color: #fff;
          font-family: 'Outfit', 'Cabinet Grotesk', system-ui, -apple-system, sans-serif;
          animation: onekoFadeIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .oneko-header {
          position: relative;
          margin-bottom: 20px;
        }
        .oneko-title {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.02em;
          background: linear-gradient(180deg, #fff 0%, #aaa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .oneko-subtitle {
          margin: 4px 0 0 0;
          font-size: 12px;
          color: rgba(255,255,255,0.45);
        }
        .oneko-close {
          position: absolute;
          top: -2px;
          right: 0;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 50%;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          font-size: 18px;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .oneko-close:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
          border-color: rgba(255,255,255,0.2);
          transform: scale(1.05);
        }
        .oneko-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-height: 320px;
          overflow-y: auto;
        }
        .oneko-option {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 16px;
          padding: 10px 14px;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
        }
        .oneko-option:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-1px);
        }
        .oneko-option.active {
          background: rgba(0, 220, 130, 0.08);
          border-color: rgba(0, 220, 130, 0.3);
        }
        .oneko-option.active .oneko-option-name {
          color: #00DC82;
        }
        .oneko-preview {
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          background-position: -96px -96px;
          image-rendering: pixelated;
          border-radius: 6px;
        }
        .oneko-info {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .oneko-option-name {
          font-size: 14px;
          font-weight: 600;
          transition: color 0.2s;
        }
        .oneko-option-desc {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
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

    const closeAll = () => {
      modal.remove();
      backdrop.remove();
    };

    backdrop.onclick = closeAll;

    // Header
    const header = document.createElement('div');
    header.className = 'oneko-header';

    const title = document.createElement('h3');
    title.className = 'oneko-title';
    title.textContent = 'Choose Companion';

    const subtitle = document.createElement('p');
    subtitle.className = 'oneko-subtitle';
    subtitle.textContent = 'Right-click on them anytime to switch';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'oneko-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = closeAll;

    header.appendChild(title);
    header.appendChild(subtitle);
    header.appendChild(closeBtn);
    modal.appendChild(header);

    // Options Container
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'oneko-options';

    const activeVariant = localStorage.getItem('oneko-variant') || 'classic';

    variants.forEach(v => {
      const optBtn = document.createElement('button');
      optBtn.className = `oneko-option ${v.id === activeVariant ? 'active' : ''}`;
      
      const preview = document.createElement('div');
      preview.className = 'oneko-preview';
      preview.style.backgroundImage = `url(${v.file})`;

      const info = document.createElement('div');
      info.className = 'oneko-info';

      const optName = document.createElement('span');
      optName.className = 'oneko-option-name';
      optName.textContent = v.name;

      const optDesc = document.createElement('span');
      optDesc.className = 'oneko-option-desc';
      optDesc.textContent = v.desc;

      info.appendChild(optName);
      info.appendChild(optDesc);

      optBtn.appendChild(preview);
      optBtn.appendChild(info);

      optBtn.onclick = () => {
        setVariant(v.id);
        closeAll();
      };

      optionsContainer.appendChild(optBtn);
    });

    modal.appendChild(optionsContainer);
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
