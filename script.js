document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealOnScroll, revealOptions);

    reveals.forEach(reveal => {
        const rect = reveal.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInViewport) {
            reveal.classList.add('active');
            return;
        }

        revealObserver.observe(reveal);
    });

    const portrait = document.querySelector('.hero-portrait');
    const portraitCard = portrait?.querySelector('.portrait-card');

    if (portrait && portraitCard) {
        portraitCard.addEventListener('click', () => {
            const isFlipped = portrait.classList.toggle('is-flipped');
            portraitCard.setAttribute('aria-pressed', String(isFlipped));
        });
    }

    const pronunciationButton = document.querySelector('.pronunciation-button');
    const pronunciationAudio = document.querySelector('#pronunciation-audio');

    if (pronunciationButton && pronunciationAudio) {
        pronunciationButton.addEventListener('click', () => {
            pronunciationAudio.currentTime = 0;
            const playPromise = pronunciationAudio.play();
            pronunciationButton.classList.add('is-playing');

            if (playPromise) {
                playPromise.catch(() => {
                    pronunciationButton.classList.remove('is-playing');
                });
            }
        });

        pronunciationAudio.addEventListener('ended', () => {
            pronunciationButton.classList.remove('is-playing');
        });

        pronunciationAudio.addEventListener('pause', () => {
            pronunciationButton.classList.remove('is-playing');
        });
    }

    const blogSearch = document.querySelector('#blog-search');
    const blogPosts = Array.from(document.querySelectorAll('[data-blog-post]'));
    const blogTagButtons = Array.from(document.querySelectorAll('[data-blog-tag]'));
    const blogEmptyState = document.querySelector('[data-blog-empty]');
    const blogCount = document.querySelector('[data-blog-count]');

    if (blogSearch && blogPosts.length > 0) {
        let activeTag = 'all';

        const updateBlogFilters = () => {
            const query = blogSearch.value.trim().toLowerCase();
            let visibleCount = 0;

            blogPosts.forEach(post => {
                const tags = post.dataset.tags.split(',').map(tag => tag.trim());
                const searchableText = [post.dataset.title, post.dataset.summary, post.dataset.tags]
                    .join(' ')
                    .toLowerCase();
                const matchesSearch = query.length === 0 || searchableText.includes(query);
                const matchesTag = activeTag === 'all' || tags.includes(activeTag);
                const isVisible = matchesSearch && matchesTag;

                post.hidden = !isVisible;
                if (isVisible) visibleCount += 1;
            });

            if (blogEmptyState) {
                blogEmptyState.hidden = visibleCount !== 0;
            }

            if (blogCount) {
                blogCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'post' : 'posts'}`;
            }
        };

        blogSearch.addEventListener('input', updateBlogFilters);

        blogTagButtons.forEach(button => {
            button.addEventListener('click', () => {
                activeTag = button.dataset.blogTag;
                blogTagButtons.forEach(tagButton => {
                    tagButton.classList.toggle('active', tagButton === button);
                });
                updateBlogFilters();
            });
        });

        updateBlogFilters();
    }

    const translations = {
        en: {
            pageTitle: "Zijian Luo aka Jack | Software Engineering Researcher",
            "notice.ariaLabel": "Internship availability",
            "notice.strong": "Open to internships",
            "notice.text": "in AI agents and post-training.",
            "notice.cta": "Let's connect",
            "nav.logo": "Zijian Luo",
            "nav.about": "About",
            "nav.experience": "Experience",
            "nav.publications": "Publications",
            "nav.projects": "Projects",
            "nav.blog": "Blog",
            "nav.news": "News",
            "nav.resume": "Resume",
            "nav.langSwitcher": "Language switcher",
            "hero.greeting": "Researcher in Code Intelligence",
            "hero.firstName": "Zijian",
            "hero.restName": "Luo aka Jack",
            "hero.pronunciation": "Play pronunciation",
            "hero.title": "PhD student in Computer Science at Monash University.",
            "hero.bio": 'I am a PhD student in Computer Science at <span class="highlight">Monash University</span> under the supervision of <a href="https://yqtian.com" target="_blank" rel="noopener noreferrer" class="supervisor-link">Dr. Yongqiang Tian</a>. Previously, I was a Research Intern at <span class="highlight">Microsoft DKI Research Group</span>, where I worked on code migration under the guidance of <a href="https://cumt-gpf.github.io/" target="_blank" rel="noopener noreferrer" class="supervisor-link">Dr. Pengfei Gao</a>. I completed my MPhil in Computer Science at <span class="highlight">The University of Sydney</span> under the supervision of <a href="https://rahul.gopinath.org" target="_blank" rel="noopener noreferrer" class="supervisor-link">Dr. Rahul Gopinath</a>, and worked on supply-chain reliability at <span class="highlight">Oracle Labs</span> under the supervision of <a href="https://labs.oracle.com/pls/apex/f?p=labs:bio:0:2193" target="_blank" rel="noopener noreferrer" class="supervisor-link">Dr. Behnaz Hassanshahi</a>. My research interests include <span class="highlight">Code Intelligence</span>, <span class="highlight">Agents</span>, and <span class="highlight">Code Verification</span>.',
            "hero.resume": "Resume",
            "hero.scholar": "Scholar",
            "portrait.figureAria": "Portrait card with fun facts",
            "portrait.buttonAria": "Flip portrait card to reveal fun facts",
            "portrait.title": "Fun Facts",
            "portrait.fact1": "My dream is to join OpenAI.",
            "portrait.fact2": "I like photography.",
            "portrait.fact3": "I like swimming.",
            "news.heading": "News",
            "news.item1.date": "Jun 2026",
            "news.item1.body": "<strong>Maximal Format-Free Record Repair</strong> was accepted to the IEEE/ACM International Conference on Automated Software Engineering (ASE) 2026.",
            "blog.heading": "Latest Blog",
            "blog.more": "More Blog Posts",
            "blog.post1.date": "Sep 27, 2026",
            "blog.post1.category": "Research Notes",
            "blog.post1.summary": "Why LLMs gave software engineering research a second life, and why the AI frontier may be moving beyond code.",
            "blog.readMore": "Read post",
            "edu.heading": "Education",
            "edu.monash.degree": "Doctor of Philosophy (PhD) in Computer Science",
            "edu.monash.date": "Oct 2026 – Present",
            "edu.monash.org": "Monash University (Melbourne, Australia)",
            "edu.usyd.degree": "Master of Philosophy (MPhil) in Computer Science",
            "edu.usyd.date": "Mar 2024 – Mar 2026",
            "edu.usyd.org": "The University of Sydney (Sydney, Australia)",
            "edu.hbu.degree": "Bachelor of Engineering (B.Eng.) in Software Engineering",
            "edu.hbu.date": "Sep 2018 – Jun 2022",
            "edu.hbu.org": "Hebei University (Hebei, China)",
            "exp.heading": "Work Experience",
            "exp.msra.role": "Research Intern",
            "exp.msra.date": "Mar 2026 – Nov 2026",
            "exp.msra.org": "Microsoft Research Asia (MSRA), Microsoft",
            "exp.msra.b1": "Enhanced Copilot's cross-platform code migration capability by integrating a knowledge base to model platform-specific APIs, dependencies, and migration mappings.",
            "exp.msra.b2": "Built a dependency-upgrade benchmark for long-horizon software engineering tasks to evaluate MAI Coder's end-to-end planning and execution across multi-step workflows; the corresponding paper is under review.",
            "exp.msra.b3": "Collaborated with GitHub to propose leveraging coding-agent development trajectories as process-aware context for Copilot Code Review (CCR) to better understand code changes; the work is under review.",
            "exp.oracle.role": "Research Assistant",
            "exp.oracle.date": "May 2025 – Oct 2025",
            "exp.oracle.org": "Oracle Labs, Oracle Corporation (Brisbane, Australia)",
            "exp.oracle.b1": 'Conducted research on software supply-chain reliability by integrating LLMs with the Macaron framework, reproducing build artifacts for over 120 open-source repositories from Libraries.io with an <span class="highlight">80% success rate</span>.',
            "exp.oracle.b2": "Designed LLM-assisted workflows for defect reproduction and static-analysis validation.",
            "pub.heading": "Publications",
            "pub.diffs.venue": "arXiv preprint arXiv:2611.31316, 2026 (under review).",
            "pub.hell.venue": "arXiv preprint arXiv:2608.30300, 2026 (under review).",
            "proj.heading": "Projects",
            "proj.deeplang.title": "The Deeplang Programming Language (82 Stars)",
            "proj.deeplang.desc": "A memory-safe, multi-paradigm programming language for embedded systems. I was responsible for implementing the backend virtual machine, including interpreting and executing WebAssembly (WASM) code generated by the frontend.",
            "skills.heading": "Technical Skills",
            "skills.lang": "Programming Languages",
            "skills.analysis": "Analysis & Testing",
            "skills.aiSystems": "AI & Systems",
            "footer.friends": "Friends ♥",
            "footer.copy": "© 2026 Zijian Luo aka Jack. Built with code."
        },
        zh: {
            pageTitle: "罗子健 (Jack) | 软件工程研究者",
            "notice.ariaLabel": "实习意向通知",
            "notice.strong": "正在寻找实习",
            "notice.text": "方向为 AI Agent 与后训练（Post-training）。",
            "notice.cta": "欢迎联系",
            "nav.logo": "罗子健",
            "nav.about": "教育背景",
            "nav.experience": "工作经历",
            "nav.publications": "学术论文",
            "nav.projects": "项目与技能",
            "nav.blog": "博客",
            "nav.news": "动态",
            "nav.resume": "简历",
            "nav.langSwitcher": "语言切换",
            "hero.greeting": "代码智能研究者",
            "hero.firstName": "罗子健",
            "hero.restName": "· Jack",
            "hero.pronunciation": "播放姓名读音",
            "hero.title": "莫纳什大学计算机科学博士生（PhD）。",
            "hero.bio": '我目前在<span class="highlight">莫纳什大学（Monash University）</span>攻读计算机科学博士学位，师从 <a href="https://yqtian.com" target="_blank" rel="noopener noreferrer" class="supervisor-link">Dr. Yongqiang Tian</a>。此前，我曾在<span class="highlight">微软亚洲研究院（Microsoft DKI Research Group）</span>担任研究实习生，在 <a href="https://cumt-gpf.github.io/" target="_blank" rel="noopener noreferrer" class="supervisor-link">Dr. Pengfei Gao</a> 指导下从事代码迁移与智能体研究。我于<span class="highlight">悉尼大学（The University of Sydney）</span>获得计算机科学研究型硕士学位（MPhil），导师为 <a href="https://rahul.gopinath.org" target="_blank" rel="noopener noreferrer" class="supervisor-link">Dr. Rahul Gopinath</a>，并曾在<span class="highlight">甲骨文实验室（Oracle Labs）</span>跟随 <a href="https://labs.oracle.com/pls/apex/f?p=labs:bio:0:2193" target="_blank" rel="noopener noreferrer" class="supervisor-link">Dr. Behnaz Hassanshahi</a> 开展软件供应链可靠性研究。我的研究方向包括<span class="highlight">代码智能</span>、<span class="highlight">智能体（Agents）</span>与<span class="highlight">代码验证</span>。',
            "hero.resume": "查看简历",
            "hero.scholar": "谷歌学术",
            "portrait.figureAria": "个人照片卡片（点击翻转查看趣事）",
            "portrait.buttonAria": "翻转照片卡片查看个人趣事",
            "portrait.title": "个人趣事",
            "portrait.fact1": "我的梦想是加入 OpenAI。",
            "portrait.fact2": "我喜欢摄影。",
            "portrait.fact3": "我喜欢游泳。",
            "news.heading": "最新动态",
            "news.item1.date": "2026年6月",
            "news.item1.body": "论文 <strong>Maximal Format-Free Record Repair</strong> 被软件工程国际顶会 IEEE/ACM ASE 2026 录用。",
            "blog.heading": "最新博客",
            "blog.more": "更多文章",
            "blog.post1.date": "2026年9月27日",
            "blog.post1.category": "研究随笔",
            "blog.post1.summary": "为什么大语言模型赋予了软件工程研究第二次生命，以及为什么 AI 前沿正在走向代码之外。",
            "blog.readMore": "阅读全文",
            "edu.heading": "教育经历",
            "edu.monash.degree": "计算机科学博士（PhD）",
            "edu.monash.date": "2026.10 – 至今",
            "edu.monash.org": "莫纳什大学（澳大利亚·墨尔本）",
            "edu.usyd.degree": "计算机科学研究型硕士（MPhil）",
            "edu.usyd.date": "2024.03 – 2026.03",
            "edu.usyd.org": "悉尼大学（澳大利亚·悉尼）",
            "edu.hbu.degree": "软件工程学士（B.Eng.）",
            "edu.hbu.date": "2018.09 – 2022.06",
            "edu.hbu.org": "河北大学（中国·河北）",
            "exp.heading": "工作经历",
            "exp.msra.role": "研究实习生",
            "exp.msra.date": "2026.03 – 2026.11",
            "exp.msra.org": "微软亚洲研究院（MSRA），微软",
            "exp.msra.b1": "Copilot 跨平台代码迁移：构建知识库，建模平台特定 API、依赖关系与迁移映射，为代码迁移提供结构化上下文。",
            "exp.msra.b2": "依赖升级基准 DEPBENCH：构建长周期软件工程依赖升级评测基准，评估 MAI Coder 在多步骤流程中的端到端规划与执行能力；相关论文正在审稿中。",
            "exp.msra.b3": "智能体轨迹辅助代码审查：与 GitHub 合作，提出利用编码智能体开发轨迹作为过程性上下文，辅助 Copilot Code Review（CCR）理解代码变更；相关工作正在审稿中。",
            "exp.oracle.role": "研究助理",
            "exp.oracle.date": "2025.05 – 2025.10",
            "exp.oracle.org": "甲骨文实验室（Oracle Labs），澳大利亚·布里斯班",
            "exp.oracle.b1": '结合 LLM 与 Macaron 框架开展软件供应链可靠性研究，成功复现 Libraries.io 上 120+ 个开源仓库的构建产物，复现成功率达 <span class="highlight">80%</span>。',
            "exp.oracle.b2": "设计 LLM 辅助的缺陷复现与静态分析验证流程，支持软件可靠性研究。",
            "pub.heading": "学术论文",
            "pub.diffs.venue": "arXiv 预印本 arXiv:2611.31316，2026（审稿中）。",
            "pub.hell.venue": "arXiv 预印本 arXiv:2608.30300，2026（审稿中）。",
            "proj.heading": "代表项目",
            "proj.deeplang.title": "Deeplang 编程语言（82 Stars）",
            "proj.deeplang.desc": "面向资源受限嵌入式系统的内存安全、多范式编程语言，采用 WebAssembly 作为编译目标。我负责后端虚拟机实现，解释执行编译器前端生成的 WASM 代码。",
            "skills.heading": "技术技能",
            "skills.lang": "编程语言",
            "skills.analysis": "分析与测试",
            "skills.aiSystems": "系统与 AI",
            "footer.friends": "友情链接 ♥",
            "footer.copy": "© 2026 罗子健（Jack）. 用代码构建。"
        }
    };

    const langButtons = Array.from(document.querySelectorAll('[data-lang-option]'));

    if (langButtons.length > 0) {
        const applyLanguage = (lang, persist = true) => {
            const targetLang = lang === 'zh' ? 'zh' : 'en';
            const dict = translations[targetLang];

            document.documentElement.lang = targetLang === 'zh' ? 'zh-CN' : 'en';
            document.title = dict.pageTitle;

            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (Object.prototype.hasOwnProperty.call(dict, key)) {
                    el.textContent = dict[key];
                }
            });

            document.querySelectorAll('[data-i18n-html]').forEach(el => {
                const key = el.getAttribute('data-i18n-html');
                if (Object.prototype.hasOwnProperty.call(dict, key)) {
                    el.innerHTML = dict[key];
                }
            });

            document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
                const key = el.getAttribute('data-i18n-aria-label');
                if (Object.prototype.hasOwnProperty.call(dict, key)) {
                    el.setAttribute('aria-label', dict[key]);
                }
            });

            document.querySelectorAll('[data-i18n-title]').forEach(el => {
                const key = el.getAttribute('data-i18n-title');
                if (Object.prototype.hasOwnProperty.call(dict, key)) {
                    el.setAttribute('title', dict[key]);
                }
            });

            langButtons.forEach(btn => {
                const isActive = btn.dataset.langOption === targetLang;
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-pressed', String(isActive));
            });

            if (persist) {
                try {
                    localStorage.setItem('preferred-lang', targetLang);
                } catch (_) {
                    // Ignore storage errors in restricted contexts.
                }
            }
        };

        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                applyLanguage(btn.dataset.langOption, true);
            });
        });

        let initialLang = 'en';
        const urlLang = new URLSearchParams(window.location.search).get('lang');
        if (urlLang === 'zh' || urlLang === 'en') {
            initialLang = urlLang;
        } else {
            try {
                const savedLang = localStorage.getItem('preferred-lang');
                if (savedLang === 'zh' || savedLang === 'en') {
                    initialLang = savedLang;
                }
            } catch (_) {
                // Ignore storage errors in restricted contexts.
            }
        }

        if (initialLang !== 'en') {
            applyLanguage(initialLang, false);
        }
    }

    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const nav = document.querySelector('.site-nav');
                const offset = nav ? nav.offsetHeight + 16 : 80;

                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
});
