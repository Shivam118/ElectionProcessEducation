import "@testing-library/jest-dom/vitest";

// Required by React 19 test renderer warnings when using act().
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
