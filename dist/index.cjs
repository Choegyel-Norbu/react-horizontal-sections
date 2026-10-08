"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  HorizontalSections: () => HorizontalSections,
  useStepper: () => useStepper
});
module.exports = __toCommonJS(index_exports);

// src/HorizontalSections.tsx
var import_react2 = require("react");

// src/useStepper.ts
var import_react = require("react");
var QUIET_MS = 160;
var WHEEL_MIN = 6;
var MAX_HOLD_MS = 600;
function useStepper(options) {
  const {
    count,
    index,
    defaultIndex,
    duration,
    stackBelow,
    wheel,
    keyboard,
    touch,
    swipeThreshold,
    lockBodyScroll,
    onChange
  } = options;
  const controlled = index !== void 0;
  const [internal, setInternal] = (0, import_react.useState)(defaultIndex);
  const [stacked, setStacked] = (0, import_react.useState)(false);
  const active = Math.min(count - 1, Math.max(0, controlled ? index : internal));
  const activeRef = (0, import_react.useRef)(active);
  activeRef.current = active;
  const locked = (0, import_react.useRef)(false);
  const lockedAt = (0, import_react.useRef)(0);
  const release = (0, import_react.useRef)(void 0);
  const touchStart = (0, import_react.useRef)({ x: 0, y: 0 });
  const stackedRef = (0, import_react.useRef)(stacked);
  stackedRef.current = stacked;
  const scheduleRelease = (0, import_react.useCallback)((wait) => {
    clearTimeout(release.current);
    release.current = setTimeout(() => {
      locked.current = false;
    }, Math.max(0, wait));
  }, []);
  const goTo = (0, import_react.useCallback)(
    (next) => {
      const target = Math.min(count - 1, Math.max(0, next));
      if (target === activeRef.current) return;
      locked.current = true;
      lockedAt.current = Date.now();
      scheduleRelease(duration);
      if (!controlled) setInternal(target);
      onChange?.(target);
    },
    [controlled, count, duration, onChange, scheduleRelease]
  );
  const step = (0, import_react.useCallback)((direction) => goTo(activeRef.current + direction), [goTo]);
  (0, import_react.useEffect)(() => {
    const query = window.matchMedia(`(max-width: ${stackBelow}px)`);
    const sync = () => setStacked(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [stackBelow]);
  (0, import_react.useEffect)(() => {
    if (stacked || !lockBodyScroll) return;
    const root = document.documentElement;
    const body = document.body;
    const previous = { root: root.style.overflow, body: body.style.overflow };
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous.root;
      body.style.overflow = previous.body;
    };
  }, [stacked, lockBodyScroll]);
  (0, import_react.useEffect)(() => {
    if (stacked || !wheel) return;
    const onWheel = (event) => {
      event.preventDefault();
      if (locked.current) {
        const elapsed = Date.now() - lockedAt.current;
        scheduleRelease(
          Math.min(Math.max(duration - elapsed, QUIET_MS), Math.max(duration + MAX_HOLD_MS - elapsed, 0))
        );
        return;
      }
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (Math.abs(delta) < WHEEL_MIN) return;
      step(delta > 0 ? 1 : -1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [stacked, wheel, duration, step, scheduleRelease]);
  (0, import_react.useEffect)(() => {
    if (stacked || !keyboard) return;
    const moves = {
      ArrowRight: 1,
      ArrowDown: 1,
      PageDown: 1,
      " ": 1,
      ArrowLeft: -1,
      ArrowUp: -1,
      PageUp: -1
    };
    const onKey = (event) => {
      if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
        return;
      }
      if (event.key === "End") {
        event.preventDefault();
        goTo(count - 1);
        return;
      }
      if (!(event.key in moves)) return;
      event.preventDefault();
      if (locked.current) return;
      step(moves[event.key]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stacked, keyboard, count, goTo, step]);
  (0, import_react.useEffect)(() => {
    if (stacked || !touch) return;
    const onStart = (event) => {
      touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    };
    const onEnd = (event) => {
      if (locked.current) return;
      const dx = touchStart.current.x - event.changedTouches[0].clientX;
      const dy = touchStart.current.y - event.changedTouches[0].clientY;
      const delta = Math.abs(dx) > Math.abs(dy) ? dx : dy;
      if (Math.abs(delta) < swipeThreshold) return;
      step(delta > 0 ? 1 : -1);
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [stacked, touch, swipeThreshold, step]);
  (0, import_react.useEffect)(() => () => clearTimeout(release.current), []);
  return { active, stacked, goTo, step };
}

// src/HorizontalSections.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var HorizontalSections = (0, import_react2.forwardRef)(
  function HorizontalSections2({
    children,
    index,
    defaultIndex = 0,
    onChange,
    duration = 950,
    easing = "cubic-bezier(0.72, 0, 0.18, 1)",
    stackBelow = 860,
    indicator = true,
    wheel = true,
    keyboard = true,
    touch = true,
    swipeThreshold = 45,
    lockBodyScroll = true,
    reveal = true,
    className,
    style,
    indicatorLabel = (i) => `Go to section ${i + 1}`
  }, ref) {
    const items = import_react2.Children.toArray(children);
    const count = items.length;
    const { active, stacked, goTo, step } = useStepper({
      count,
      index,
      defaultIndex,
      duration,
      stackBelow,
      wheel,
      keyboard,
      touch,
      swipeThreshold,
      lockBodyScroll,
      onChange
    });
    (0, import_react2.useImperativeHandle)(
      ref,
      () => ({
        index: active,
        goTo,
        next: () => step(1),
        prev: () => step(-1)
      }),
      [active, goTo, step]
    );
    const rootStyle = {
      ...style,
      "--rhs-duration": `${duration}ms`,
      "--rhs-easing": easing
    };
    const trackStyle = stacked ? {} : {
      width: `${count * 100}%`,
      transform: `translate3d(${-active * (100 / count)}%, 0, 0)`
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: ["rhs-root", stacked ? "rhs-root--stacked" : "", className].filter(Boolean).join(" "),
        style: rootStyle,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rhs-viewport", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rhs-track", style: trackStyle, children: items.map((child, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "section",
            {
              className: ["rhs-section", reveal ? "" : "rhs-section--plain"].filter(Boolean).join(" "),
              style: stacked ? void 0 : { flexBasis: `${100 / count}%` },
              "data-active": stacked || i === active,
              "aria-hidden": !stacked && i !== active,
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rhs-section__inner", children: child })
            },
            i
          )) }) }),
          indicator && !stacked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rhs-indicator", children: items.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              type: "button",
              className: ["rhs-dot", i === active ? "rhs-dot--active" : ""].filter(Boolean).join(" "),
              "aria-label": indicatorLabel(i),
              "aria-current": i === active,
              onClick: () => goTo(i)
            },
            i
          )) })
        ]
      }
    );
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HorizontalSections,
  useStepper
});
//# sourceMappingURL=index.cjs.map