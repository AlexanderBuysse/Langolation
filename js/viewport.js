const viewportRoot = document.documentElement;
const desktopWidth = 1680;

function fitDesktopLayout() {
    const scale = viewportRoot.clientWidth / desktopWidth;
    viewportRoot.classList.toggle('scale-desktop', scale < 1);
    viewportRoot.style.setProperty('--desktop-scale', Math.min(1, scale));
}

fitDesktopLayout();
new ResizeObserver(fitDesktopLayout).observe(viewportRoot);
