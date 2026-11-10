document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 2. Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animations
    // Uses Intersection Observer to add the 'element-visible' class when elements scroll into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('element-visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach(el => scrollObserver.observe(el));

    // 4. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Trigger initial animations after slight delay
    setTimeout(() => {
        document.querySelectorAll('.hero.hidden-element').forEach(el => el.classList.add('element-visible'));
    }, 100);

    // 4.5 Hero Parallax Effect
    const heroSection = document.getElementById('home');
    const parallaxElements = document.querySelectorAll('.floating-ui, .blob');

    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) / 30;
            const y = (window.innerHeight / 2 - e.clientY) / 30;
            
            parallaxElements.forEach((el, index) => {
                const speed = (index + 1) * 0.4;
                el.style.marginLeft = `${x * speed}px`;
                el.style.marginTop = `${y * speed}px`;
            });
        });
        
        heroSection.addEventListener('mouseleave', () => {
            parallaxElements.forEach(el => {
                el.style.marginLeft = '0px';
                el.style.marginTop = '0px';
            });
        });
    }

    // 5. Modal System
    const projectData = {
        nexus: {
            title: "Nexus Finance Dashboard",
            category: "UI/UX Design • Web App",
            image: "assets/project1.png",
            desc: "For this project, I designed Nexus, a personal finance dashboard built to aggregate data from multiple bank accounts into one single, easy-to-read view. I wanted to create an experience that felt powerful but didn't require a finance degree to understand.",
            problem: "During my initial research, I discovered that most people felt completely overwhelmed by their financial data. It was scattered across a bunch of different banking and investment apps. Because of this fragmentation, they couldn't get a quick, unified view of their real net worth or track their weekly spending habits without exporting spreadsheets.",
            decisions: [
                "I decided to build a dashboard-first layout utilizing a modular widget system. This empowers the user to drag, drop, and prioritize the exact financial metrics they actually care about.",
                "To make the heavy data visualization charts pop and to reduce eye strain, I implemented a refined, high-contrast dark mode. It immediately gives the platform a premium, professional feel.",
                "Dealing with massive transaction histories is tough, so I simplified the data tables by introducing expanding accordion rows. This keeps the initial interface super clean while still letting users dig into the granular details of every transaction when they need to."
            ]
        },
        foodbooth: {
            title: "Food Booth App",
            category: "Mobile App • UI Design",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
            desc: "I designed Food Booth, a modern mobile food delivery app, to completely rethink how we browse restaurants. My goal was to move away from boring, text-heavy menus and create a much more visual, appetite-driven experience for the user.",
            problem: "When I analyzed competitor apps, the biggest friction point I found was 'app fatigue'. Users were getting overwhelmed by endless, generic text menus. Without strong visual cues, deciding what to order became a chore rather than a fun experience, which actively led to cart abandonment.",
            decisions: [
                "I restructured the entire home screen to be visually-driven. By prioritizing high-quality, edge-to-edge food photography over text descriptions, I was able to instantly stimulate the user's appetite and keep them engaged.",
                "I implemented a prominent, floating 'Add to Cart' bottom sheet constraint on the product detail page. This guarantees that users can easily reach the primary call-to-action using just one hand, especially on larger modern phones.",
                "To evoke energy and excitement, I established a warm brand color palette featuring vibrant orange accents, contrasted against a deeply clean, distraction-free neutral background."
            ]
        },
        taskflow: {
            title: "TaskFlow Platform",
            category: "B2B SaaS • Web App UI",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            desc: "I built the UI for TaskFlow, a B2B SaaS web application designed specifically for remote teams. My main focus was to help teams assign, organize, and track complex project tasks without losing their minds in endless chat threads.",
            problem: "In my user interviews with remote workers, a devastating, consistent pattern emerged: team members were regularly missing deadlines. Why? Because critical project updates, files, and feedback were constantly getting buried in chaotic slack channels or endless email chains.",
            decisions: [
                "I designed a Kanban-style board paired strictly with a dedicated task-detail sidebar. This ensures that the overall project status and the specific communication history are always structured together in one unified place.",
                "Instead of just listing tasks by chronological due dates, I grouped active tasks visually by status columns. This simple change allows project managers to scan the exact bottleneck of a project in seconds.",
                "I integrated an independent activity feed directly inside the task sidebar. This ensures that the entire comment history and file-sharing context is always visible without forcing the user to navigate away to a different page."
            ]
        }
    };

    const modalOverlay = document.getElementById('project-modal');
    const modalCloseBtn = document.querySelector('.modal-close');
    const viewButtons = document.querySelectorAll('.view-btn');

    if (modalOverlay) {
        const modalTitle = document.getElementById('modal-title');
        const modalCategory = document.getElementById('modal-category');
        const modalImage = document.getElementById('modal-image');
        const modalDesc = document.getElementById('modal-desc');
        const modalProblem = document.getElementById('modal-problem');
        const modalDecisions = document.getElementById('modal-decisions');

        const openModal = (projectId) => {
            const data = projectData[projectId];
            if (!data) return;

            // Populate content
            modalTitle.textContent = data.title;
            modalCategory.textContent = data.category;
            modalImage.src = data.image;
            modalImage.alt = data.title;
            modalDesc.textContent = data.desc;
            modalProblem.textContent = data.problem;
            
            modalDecisions.innerHTML = '';
            data.decisions.forEach(decision => {
                const li = document.createElement('li');
                li.textContent = decision;
                modalDecisions.appendChild(li);
            });

            // Show modal
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        };

        const closeModal = () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = btn.getAttribute('data-project');
                if (projectId) openModal(projectId);
            });
        });

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', closeModal);
        }

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModal();
            }
        });
    }
});
