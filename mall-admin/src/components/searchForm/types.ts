export interface SearchField {
  type: "input" | "select" | "date";
  prop: string;
  label: string;
  placeholder?: string;
  options?: Array<{ label: string; value: string | number }>;
  span?: number;
  props?: Record<string, any>;
}
