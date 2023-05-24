# @equinor/apollo-components

## 3.2.1

### Patch Changes

- a782bdd: Show blank cell instead of null string in PopoverCell

## 3.2.0

### Minor Changes

- 42c733e: Add resizing to DataTable
- d996b95: Add CheckboxCell

## 3.1.8

### Patch Changes

- cf72859: Test for only numbers in height unit check

## 3.1.7

### Patch Changes

- 3a71ebe: Conditionally add contain: strict; to --table-container

## 3.1.6

### Patch Changes

- 0c0c454: Fix table bug in some build environments

## 3.1.5

### Patch Changes

- d92214a: Add editable cells using react-hook-form

## 3.1.4

### Patch Changes

- 0bf3251: Increase initial row render count

## 3.1.3

### Patch Changes

- a5dced5: Fix edge case with rendering wrong amount of table rows

## 3.1.2

### Patch Changes

- e1354f0: Move edit cells to apollo-utils

## 3.1.1

### Patch Changes

- 7fa24ff: Move cells to @equinor/apollo-utils and extract common functionality into separate package
- 7fa24ff: Move react-hook-form to peer deps
- Updated dependencies [07e344a]
- Updated dependencies [7fa24ff]
  - apollo-common@0.1.2

## 3.1.0

### Minor Changes

- edd561e: Add editable cells using react hook form

## 3.0.0

### Major Changes

- 0b420f5: Renamed props, added object properties, minor changes for better a11ty

## 2.0.0

### Major Changes

- d901c86: Change DataTable props type and remove jotai

  - Breaking changes requiring to update DataTable props
  - Control table directly instead of using exported atoms (not exported anymore)
  - This change was made improve prop structure, scalability and ease of use
  - See example apps for migration tips

## 1.12.3

### Patch Changes

- 10f9e7b: Support infinite scroll and implement example

## 1.12.2

### Patch Changes

- eeb26fc: Move @equinor/eds-core-react to peer dependencies

## 1.12.1

### Patch Changes

- 9458085: Move react, react-dom and jotai to peerDependencies

## 1.12.0

### Minor Changes

- 4772165: Expose onSortingChange and enable custom sorting and deprecate `sortable` and move config to `sortConfig.enableSorting`.

## 1.11.2

### Patch Changes

- 8640757: Fix header overflow and scroll jump visually

## 1.11.1

### Patch Changes

- 0345659: Fix active row color and cell padding

## 1.11.0

### Minor Changes

- 5f811ee: Expose columnVisibilityAtom for use in applications

## 1.10.1

### Patch Changes

- 6a3867d: Make select column indeterminate state deselect all rows
- 90e166e: Add functionality for showing truncated text content on hover

## 1.10.0

### Minor Changes

- 297dda1: Enable fixed column width and inherit sticky cell color

## 1.9.0

### Minor Changes

- 3b3f5de: expose a DataTableRaw component for more control in userland

## 1.8.1

### Patch Changes

- 8352258: Set fixed as default table layout and use width and height properly

## 1.8.0

### Minor Changes

- f513b03: Add new Row Wrapper configuration to allow external row contexts
- 0e00070: Add cell highlight configuration and fix row background not being set

## 1.7.1

### Patch Changes

- 8d9afeb: Add two options for rendering filter actions or column select specifically

## 1.7.0

### Minor Changes

- b02758c: Refactor to use TableRow component with DynamicCell and row utils

## 1.6.2

### Patch Changes

- 2d6181e: Add background color to sticky cell

## 1.6.1

### Patch Changes

- cc70cc0: Add pointer cursor to clickable rows

## 1.6.0

### Minor Changes

- 19b73a8: Upgrade tanstack dependencies and remove husky hooks

### Patch Changes

- d79d447: Add custom color to sticky dynamic cell.
- 3d29e89: Expose capitalizeHeader utility to trigger a changeset

## 1.5.2

### Patch Changes

- Add filterFromLeafRows option

## 1.5.1

### Patch Changes

- Add aria label and fixed width to table header cell. To get auto width, set `size: -1` in columns def.

## 1.5.0

### Minor Changes

- Add additional utilities like hierarchy cell, row click handler and row id override

## 1.4.0

### Minor Changes

- Improve selection and expansion functionality, add new cell components

## 1.3.1

### Patch Changes

- Add placeholder loading row

## 1.3.0

### Minor Changes

- Refactor row selection to support both single and multiselect

## 1.2.2

### Patch Changes

- d47c90b: Use column header string if set

## 1.2.1

### Patch Changes

- 4b5ab1c: Fix aria label error in select column

## 1.2.0

### Minor Changes

- Add row and column selection capabilities

## 1.1.2

### Patch Changes

- Fix incorrect virtualizer code

## 1.1.1

### Patch Changes

- Update react-virtual version to beta

## 1.1.0

### Minor Changes

- Changed flat props to configuration objects

## 1.0.1

### Patch Changes

- Fix exported types

## 1.0.0

### Major Changes

- Initial release of DataTable
