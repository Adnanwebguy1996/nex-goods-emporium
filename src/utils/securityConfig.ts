
// Basic frontend security measures (Note: Real security requires backend implementation)

export const initializeSecurity = () => {
  // Disable right-click context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });

  // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
  document.addEventListener('keydown', (e) => {
    // F12
    if (e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+I (Inspector)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+S (Save Page)
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      return false;
    }
  });

  // Disable text selection
  document.addEventListener('selectstart', (e) => {
    e.preventDefault();
    return false;
  });

  // Disable drag and drop
  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
  });

  // Basic anti-copy protection
  document.addEventListener('copy', (e) => {
    e.preventDefault();
    return false;
  });

  // Console warning
  console.warn(
    '%cSTOP!',
    'color: red; font-size: 50px; font-weight: bold;'
  );
  console.warn(
    '%cThis is a browser feature intended for developers. Unauthorized access is prohibited.',
    'color: red; font-size: 16px;'
  );
};

// Call this function when the app starts
if (typeof window !== 'undefined') {
  initializeSecurity();
}
