document.addEventListener("DOMContentLoaded", () => {
    
    /* ==================================================================
       1. PRELOADER LOGIC
       ================================================================== */
    const preloader = document.getElementById("preloader");
    const progress = document.querySelector(".loader-progress");
    const loaderText = document.getElementById("loader-text");
    
    let loadProgress = 0;
    const loadingInterval = setInterval(() => {
        loadProgress += Math.floor(Math.random() * 15) + 5; // Naik random
        if (loadProgress >= 100) {
            loadProgress = 100;
            clearInterval(loadingInterval);
            loaderText.innerText = "SYSTEM READY. ACCESS GRANTED.";
            setTimeout(() => {
                preloader.style.opacity = "0";
                preloader.style.visibility = "hidden";
                // Trigger animasi masuk Hero setelah preloader selesai
                document.querySelectorAll('#hero .fade-up').forEach(el => el.classList.add('in-view'));
            }, 800);
        }
        progress.style.width = loadProgress + "%";
    }, 150);

    /* ==================================================================
       2. SCROLL PROGRESS INDICATOR
       ================================================================== */
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${totalScroll / windowHeight * 100}%`;
        scrollProgress.style.width = scroll;
    });

    /* ==================================================================
       3. CUSTOM CURSOR
       ================================================================== */
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    // Efek Trailing Halus
    function render() {
        ringX += (mouseX - ringX) * 0.2;
        ringY += (mouseY - ringY) * 0.2;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(render);
    }
    render();

    /* ==================================================================
       4. MAGNETIC BUTTONS & ELEMENTS
       ================================================================== */
    const magnetics = document.querySelectorAll('.magnetic');
    
    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            const strength = btn.dataset.strength || 20;

            btn.style.transform = `translate(${x / position.width * strength}px, ${y / position.height * strength}px)`;
            
            // Perbesar kursor
            ring.style.width = "60px";
            ring.style.height = "60px";
            ring.style.background = "rgba(0, 229, 255, 0.1)";
        });

        btn.addEventListener('mouseleave', function() {
            btn.style.transform = 'translate(0px, 0px)';
            ring.style.width = "36px";
            ring.style.height = "36px";
            ring.style.background = "transparent";
        });
    });

    /* ==================================================================
       5. INTERACTIVE TERMINAL EMULATOR
       ================================================================== */
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');

    if(termInput) {
        termInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const cmd = termInput.value.trim().toLowerCase();
                if(cmd !== "") {
                    // Cetak input user
                    termOutput.innerHTML += `<p><span class="prompt">guest@harits-os:~$</span> ${cmd}</p>`;
                    processCommand(cmd);
                    termInput.value = "";
                    termOutput.scrollTop = termOutput.scrollHeight; // Auto scroll ke bawah
                }
            }
        });
    }

    function processCommand(cmd) {
        let response = "";
        switch(cmd) {
            case 'help':
                response = `<p class="sys-msg">Available commands: <span class="highlight">whoami, skills, clear, status, food</span></p>`;
                break;
            case 'whoami':
                response = `<p class="sys-msg">Harits Nakhlah Putra. Informatics Engineering student at ITPLN building logical solutions.</p>`;
                break;
            case 'skills':
                response = `<p class="sys-msg">Loading modules... [C++, Python, AI Prompting, Data Structures, Web Dev].</p>`;
                break;
            case 'status':
                response = `<p class="success">All systems running optimally. First Semester GPA: 3.89.</p>`;
                break;
            case 'food':
                // Easter egg sesuai profil Anda!
                response = `<p class="sys-msg highlight">System fueled by Nasi Padang and Mie Gacoan Level 4.</p>`;
                break;
            case 'clear':
                termOutput.innerHTML = "";
                return;
            default:
                response = `<p class="error">Command not found: ${cmd}. Type 'help' for a list of commands.</p>`;
        }
        termOutput.innerHTML += response;
    }

    /* ==================================================================
       6. 3D CARD TILT EFFECT DENGAN GLARE
       ================================================================== */
    const cards = document.querySelectorAll('.card-3d');

    cards.forEach(card => {
        const glare = card.querySelector('.glare');
        
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -15; // Rotasi sumbu X (max 15 deg)
            const rotateY = ((x - centerX) / centerX) * 15;  // Rotasi sumbu Y (max 15 deg)
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Pindahkan posisi kilauan (glare) mengikuti kursor
            glare.style.opacity = '1';
            glare.style.transform = `translate(${x - rect.width}px, ${y - rect.height}px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            glare.style.opacity = '0';
        });
    });

    /* ==================================================================
       7. ANIMATED NUMBER COUNTERS
       ================================================================== */
    const counters = document.querySelectorAll('.counter');
    let counted = false;

    const runCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const speed = 50; 
                const inc = target / speed;

                if (count < target) {
                    // Cek jika angka desimal (seperti IPK 3.89)
                    if(target % 1 !== 0) {
                        counter.innerText = (count + inc).toFixed(2);
                    } else {
                        counter.innerText = Math.ceil(count + inc);
                    }
                    setTimeout(updateCount, 40);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
        counted = true;
    };

    /* ==================================================================
       8. SCROLL REVEAL (INTERSECTION OBSERVER)
       ================================================================== */
    const revealElements = document.querySelectorAll('.fade-up');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Jika elemen yang terlihat adalah bagian stats, jalankan animasi angka
                if(entry.target.classList.contains('stats-container') && !counted) {
                    runCounters();
                }
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(el => revealObserver.observe(el));
});