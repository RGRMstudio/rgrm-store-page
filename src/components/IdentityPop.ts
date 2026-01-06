export const toggleIdentityPop = (isOpen: boolean) => {
  const popElement = document.getElementById('identity-popup');
  if (!popElement) return;

  if (isOpen) {
    popElement.style.display = 'flex';
    popElement.classList.add('animate-fade-in');
  } else {
    popElement.style.display = 'none';
  }
};
