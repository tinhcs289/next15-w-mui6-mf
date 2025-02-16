import { createHeaderComponent } from "./create-table-head-component";
import { createVirtuosoComponents } from "./create-virtuoso-components";

export { createRowContent as itemContent } from "./create-table-row-component";

export const components = createVirtuosoComponents();
export const fixedHeaderContent = createHeaderComponent();