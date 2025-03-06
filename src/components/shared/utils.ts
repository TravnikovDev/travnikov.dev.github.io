// Simple path-based check for active links
export const isActive = (path: string): boolean => {
  if (typeof window !== "undefined") {
    const currentPath = window.location.pathname;
    // Handle the home page separately
    if (path === "/" && currentPath === "/") return true;
    // For other pages, check if the currentPath starts with the given path
    // But not for the home page to avoid matching all paths
    return path !== "/" && currentPath.startsWith(path);
  }
  return false;
};
