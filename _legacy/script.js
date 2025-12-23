/**
 * V110 CINEMATIC INTELLIGENCE ENGINE
 * Memory | Awareness | Evolution
 */

// --- 1. MEMORY CORE (Integrated) ---
class MemorySystem {
    constructor() {
        this.memoryKey = 'TEMPORAL_STATE_V110';
        this.state = this.loadState();
        this.init();
    }

    loadState() {
        const stored = localStorage.getItem(this.memoryKey);
        if (stored) return JSON.parse(stored);
        return {
            visitCount: 0,
            lastVisit: Date.now(),
            totalTime: 0,
            visitedImages: [], // Stores src of opened images
            interactionScore: 0
        };
    }

    saveState() {
        this.state.totalTime += 5;
        localStorage.setItem(this.memoryKey, JSON.stringify(this.state));
    }

    init() {
        const now = Date.now();
        if (now - this.state.lastVisit > 600000) { // 10 mins = new visit
            this.state.visitCount++;
        }
        this.state.lastVisit = now;
        this.saveState();

        // Clock
        setInterval(() => this.saveState(), 5000);
        console.log(`[MEMORY] Visit: ${this.state.visitCount} | Chaos Factor: ${this.getChaosFactor()}`);
    }

    markImageVisited(src) {
        if (!this.state.visitedImages.includes(src)) {
            this.state.visitedImages.push(src);
            this.state.interactionScore += 10;
            this.saveState();
        }
    }

    getChaosFactor() {
        // More visits = slightly more chaos in particles
        return Math.min(1 + (this.state.visitCount * 0.1), 2);
    }

    getTimeShift() {
        // Return 0-1 based on totalTime (evolution over session)
        return Math.min(this.state.totalTime / 1200, 1); // Caps after 20 mins
    }
}

// --- 2. INTELLIGENCE CORE (Awareness) ---
class IntelligenceCore {
    constructor(engine) {
        this.engine = engine;
        this.lastInputTime = Date.now();
        this.scrollSpeed = 0;
        this.isIdle = false;

        this.initListeners();
        this.startMonitoring();
    }

    initListeners() {
        ['mousemove', 'scroll', 'click', 'keydown'].forEach(evt => {
            window.addEventListener(evt, () => {
                this.lastInputTime = Date.now();
                if (this.isIdle) {
                    this.wakeUp();
                }
            });
        });
    }

    startMonitoring() {
        setInterval(() => {
            const idleDuration = Date.now() - this.lastInputTime;
            if (idleDuration > 5000 && !this.isIdle) {
                this.enterDreamState();
            }
        }, 1000);
    }

    enterDreamState() {
        this.isIdle = true;
        // Increase particle chaos slowly
        document.body.style.transition = "filter 3s ease";
        // Subtle shift to indicate dreaming
    }

    wakeUp() {
        this.isIdle = false;
    }

    getAttentionFactor() {
        // Returns multiplier: 1.0 (Normal), 2.0 (Dreaming), 0.5 (Focusing/Fast Scroll)
        if (this.engine.scroll.velocity > 10) return 0.5;
        if (this.isIdle) return 1.5;
        return 1.0;
    }
}


// --- 3. CINEMATIC ENGINE (Rendering) ---
class CinematicEngine {
    constructor(memory) {
        this.memory = memory;
        this.canvas = document.getElementById('cinematic-canvas');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });

        this.layers = {};
        this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        this.scroll = { current: 0, target: 0, velocity: 0 };

        this.intelligence = new IntelligenceCore(this);

        this.init();
        this.createLayers();
        this.addEvents();
        this.animate();
        this.initInteractions();
        this.initScrollReveal();
        this.restoreImageMemory();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.camera.position.z = 5;
        this.scene.fog = new THREE.FogExp2(0x050810, 0.03);
    }

    createLayers() {
        // COLOR EVOLUTION setup
        const chaos = this.memory.getChaosFactor(); // 1.0 to 2.0

        // LAYER 0: FOG
        const fogGeo = new THREE.BufferGeometry();
        const fogCount = 50;
        const fogPos = new Float32Array(fogCount * 3);
        for (let i = 0; i < fogCount * 3; i++) fogPos[i] = (Math.random() - 0.5) * 80;
        fogGeo.setAttribute('position', new THREE.BufferAttribute(fogPos, 3));
        const fogMat = new THREE.PointsMaterial({
            size: 12,
            color: 0x1e3a8a,
            transparent: true,
            opacity: 0.1,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        this.layers.fog = new THREE.Points(fogGeo, fogMat);
        this.layers.fog.position.z = -20;
        this.scene.add(this.layers.fog);

        // LAYER 1: STARS (More with chaos)
        const starGeo = new THREE.BufferGeometry();
        const starCount = 1500 * chaos;
        const starPos = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 120;
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        const starMat = new THREE.PointsMaterial({
            size: 0.12, color: 0xffffff, transparent: true, opacity: 0.6
        });
        this.layers.stars = new THREE.Points(starGeo, starMat);
        this.scene.add(this.layers.stars);

        // LAYER 2: PARTICLES (Mid)
        const particleGeo = new THREE.BufferGeometry();
        const particleCount = 600;
        const posArray = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) posArray[i] = (Math.random() - 0.5) * 20;
        particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particleMat = new THREE.PointsMaterial({
            size: 0.04, color: 0x3b82f6, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending
        });
        this.layers.particles = new THREE.Points(particleGeo, particleMat);
        this.scene.add(this.layers.particles);

        // LAYER 3: BOKEH
        const bokehGeo = new THREE.BufferGeometry();
        const bokehCount = 40;
        const bokehPos = new Float32Array(bokehCount * 3);
        for (let i = 0; i < bokehCount * 3; i++) {
            bokehPos[i] = (Math.random() - 0.5) * 15;
            bokehPos[i * 3 + 2] = Math.random() * 2 + 3;
        }
        bokehGeo.setAttribute('position', new THREE.BufferAttribute(bokehPos, 3));
        const bokehMat = new THREE.PointsMaterial({
            size: 0.2, color: 0x60a5fa, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending, depthTest: false
        });
        this.layers.bokeh = new THREE.Points(bokehGeo, bokehMat);
        this.scene.add(this.layers.bokeh);
    }

    addEvents() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        document.addEventListener('mousemove', (e) => {
            this.mouse.targetX = e.clientX / window.innerWidth - 0.5;
            this.mouse.targetY = e.clientY / window.innerHeight - 0.5;
        });

        document.addEventListener('scroll', () => {
            this.scroll.target = window.scrollY;
        });

        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.mouse.targetX = e.touches[0].clientX / window.innerWidth - 0.5;
                this.mouse.targetY = e.touches[0].clientY / window.innerHeight - 0.5;
            }
        });
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // INTELLIGENCE & EVOLUTION
        const attention = this.intelligence.getAttentionFactor(); // 0.5 to 1.5
        const timeShift = this.memory.getTimeShift(); // 0 to 1

        // Dynamic Color Shift (Blue -> Cyan -> Purple based on time)
        const hue = 210 + (timeShift * 60); // 210 (Blue) to 270 (Purple)
        if (this.layers.particles) {
            this.layers.particles.material.color.setHSL(hue / 360, 0.8, 0.5);
        }

        // Physics Update
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.015;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.015;

        const lastScroll = this.scroll.current;
        this.scroll.current += (this.scroll.target - this.scroll.current) * 0.05;
        this.scroll.velocity = Math.abs(this.scroll.current - lastScroll);

        // ACT SYSTEM (Based on Scroll %)
        const scrollPct = this.scroll.current / (document.body.scrollHeight - window.innerHeight);
        // Act 1: 0-0.3, Act 2: 0.3-0.7, Act 3: 0.7-1.0

        // ANIMATION LAYERS
        // Fog: Faster when "dreaming" (high attention factor)
        this.layers.fog.rotation.z += 0.0001 * attention;
        this.layers.fog.rotation.y = Math.sin(Date.now() * 0.0001) * 0.1;

        // Stars
        this.layers.stars.rotation.y += 0.0002;
        this.layers.stars.position.z = (this.scroll.current * 0.002) % 20;

        // Particles
        this.layers.particles.rotation.y += 0.0005 * attention;

        const positions = this.layers.particles.geometry.attributes.position.array;
        for (let i = 0; i < 600; i++) {
            const i3 = i * 3;
            // Vertical movement changes by Act
            // Dawn (Act 1): Upward drift (-0.001) | Day: Mixed | Night (Act 3): Downward (-0.005)
            let actGravity = -0.003;
            if (scrollPct > 0.7) actGravity = -0.008; // Heavy night fall

            positions[i3 + 1] += actGravity * attention; // Apply gravity

            // Mouse Repel (Stronger when dreaming)
            positions[i3] += Math.sin(this.mouse.x * 2 + i) * 0.001 * attention;

            // Loop
            if (positions[i3 + 1] < -10) positions[i3 + 1] = 10;
        }
        this.layers.particles.geometry.attributes.position.needsUpdate = true;

        // Bokeh (Parallax)
        this.layers.bokeh.position.x = this.mouse.x * 1;
        this.layers.bokeh.position.y = this.mouse.y * 1 + (this.scroll.current * 0.01);

        this.renderer.render(this.scene, this.camera);
    }

    initInteractions() {
        // TILT
        const card = document.querySelector('.profile-card');
        if (card) {
            document.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                card.style.transform = `perspective(1000px) rotateX(${y * -0.05}deg) rotateY(${x * 0.05}deg)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        }

        // MODAL & IMAGE MEMORY
        const modal = document.getElementById('premium-modal');
        const modalImg = document.getElementById('modal-image');
        const closeBtn = document.getElementById('modal-close');

        // Restore visited state
        this.restoreImageMemory();

        document.querySelectorAll('img[data-full]').forEach(img => {
            img.addEventListener('click', () => {
                const src = img.getAttribute('data-full');
                modalImg.src = src;
                modal.style.display = 'flex';
                void modal.offsetWidth;
                modal.classList.add('active');

                // INTELLIGENCE: Mark as Visited
                this.memory.markImageVisited(src);
                img.classList.add('visited-image');
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => { modal.style.display = 'none'; }, 600);
        };
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    }

    restoreImageMemory() {
        const visited = this.memory.state.visitedImages;
        document.querySelectorAll('img[data-full]').forEach(img => {
            if (visited.includes(img.getAttribute('data-full'))) {
                img.classList.add('visited-image'); // Apply the glow
            }
        });
    }

    initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('in-view');
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        document.querySelectorAll('.premium-text-block, .timeline, .skill-grid, .project-showcase, .cert-grid-premium, .workflow-grid, .contact-card').forEach(el => {
            el.classList.add('cinematic-section');
            observer.observe(el);
        });
    }
}

class CounterAnimator {
    constructor() {
        // Simple One-Shot Counter
        this.counters = document.querySelectorAll('.count');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    this.start(e.target);
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.5 });
        this.counters.forEach(c => observer.observe(c));
    }
    start(node) {
        const target = +node.getAttribute('data-target');
        let current = 0;
        const step = target / 50;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                node.innerText = target;
                clearInterval(timer);
            } else {
                node.innerText = Math.ceil(current);
            }
        }, 30);
    }
}

// BOOT
window.addEventListener('load', () => {
    const memory = new MemorySystem();
    new CinematicEngine(memory);
    new CounterAnimator();

    // Initial Reveal
    setTimeout(() => {
        document.querySelector('.profile-card').style.opacity = '1';
        document.querySelector('.hero-footer').style.opacity = '1';
        document.querySelector('.subtitle-block').style.opacity = '1';
    }, 500);
});
