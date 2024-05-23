import { Registry } from "../types";

const HOOK_REGISTRY: Registry[] = [
  { name: "usePagination", variant: "TypeScript", type: "hook" },
  { name: "usePagination", variant: "JavaScript", type: "hook" },
  { name: "useToggle", variant: "TypeScript", type: "hook" },
];

const UTILITY_REGISTRY: Registry[] = [
  { name: "toUppercase", variant: "TypeScript", type: "utility" },
];

const ALL_REGISTRIES: Registry[] = Array.from([]).concat(
  HOOK_REGISTRY,
  UTILITY_REGISTRY
);

export { HOOK_REGISTRY, UTILITY_REGISTRY, ALL_REGISTRIES };
