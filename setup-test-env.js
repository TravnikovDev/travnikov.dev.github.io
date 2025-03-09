import "@testing-library/jest-dom"

// Mock gatsby
global.___loader = {
  enqueue: jest.fn(),
};

// Mock Gatsby's window.location with a writable object
Object.defineProperty(window, "location", {
  writable: true,
  value: {
    pathname: "/",
  },
});

// Mock matchMedia to avoid issues with certain components that use it
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

// Mock scroll behavior
window.scrollTo = jest.fn();