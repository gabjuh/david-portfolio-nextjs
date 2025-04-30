export const setLinkTargets = (href: string) => {
  if (typeof window === 'undefined') {
    return '_self'; // Default to '_self' during SSR
  }

  try {
    return new URL(href, window.location.origin).hostname === window.location.hostname
      ? '_self'
      : '_blank';
  } catch (error) {
    return '_self'; // Fallback for invalid URLs
  }
};