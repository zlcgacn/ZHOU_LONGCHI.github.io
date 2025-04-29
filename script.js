// 语言切换功能
function switchLanguage(lang) {
    document.body.className = ''; // 清除现有class
    document.body.classList.add('show-' + lang);
    
    // 更新按钮状态
    const buttons = document.querySelectorAll('.language-switcher button');
    buttons.forEach(button => {
        if (button.getAttribute('data-lang') === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // 保存首选项
    localStorage.setItem('preferred-language', lang);
}

// 初始化语言
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否有之前的语言偏好
    const preferredLanguage = localStorage.getItem('preferred-language');
    if (preferredLanguage) {
        switchLanguage(preferredLanguage);
    } else {
        // 否则默认中文
        switchLanguage('zh');
    }
    
    // 为语言按钮添加点击事件
    const langButtons = document.querySelectorAll('.language-switcher button');
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
    
    // 添加导航链接的平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // 70px offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 实现滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1 // 当元素10%可见时触发
    });
    
    // 为所有需要添加动画的元素注册观察器
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
    
    // 滚动显示效果
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const scrollRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    scrollElements.forEach(element => {
        scrollRevealObserver.observe(element);
    });
}); 