// SSR-safe theme initialization script
// This runs before hydration to prevent FOUC
(function() {
  try {
    const theme = localStorage.getItem('cyb4x-theme') || 'dark';
    const reducedMotion = localStorage.getItem('cyb4x-reduced-motion') === 'true';
    const reducedNeon = localStorage.getItem('cyb4x-reduced-neon') === 'true';
    
    document.documentElement.classList.add(`theme-${theme}`);
    
    if (reducedMotion) {
      document.documentElement.style.setProperty('--motion-enabled', '0');
    }
    
    if (reducedNeon) {
      document.documentElement.classList.add('theme-reduced-neon');
    }
  } catch (e) {
    // Fallback to dark theme
    document.documentElement.classList.add('theme-dark');
  }
})();