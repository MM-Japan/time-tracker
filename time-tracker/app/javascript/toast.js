export function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    Object.assign(container.style, {
      position: 'fixed',
      bottom: '1rem',
      right: '1rem',
      zIndex: '3000',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    });
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.textContent = message;
  Object.assign(toast.style, {
    backgroundColor: '#333',
    color: '#eee',
    padding: '8px 12px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
  });
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
