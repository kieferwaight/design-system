# Storybook Customizations Archive

This folder contains the Storybook modifications that were temporarily disabled or archived.

## Files

### Original CSS overrides (Catppuccin Macchiato theme)

- **manager-head.original.html** — Manager chrome (sidebar/toolbar) styling overrides. Includes scrollbar hiding, toast/notification card styling, custom glow effects.
- **preview-head.original.html** — Docs pages typography overrides. Includes H1 gradient text, table styling, code block appearance, inline code pill styling.

These were emptied (disabled) in `.storybook/manager-head.html` and `.storybook/preview-head.html` to revert to vanilla Storybook styling.

### Custom components

- **CommentWidget.tsx** — Floating "leave a comment" widget that appears on every story canvas. POSTs to `/__comments` for feedback collection. Was injected via the `withComments` decorator in `preview.tsx`.

- **middleware.cjs** — Backend middleware handling the comment POSTs from the widget. Processes and stores feedback on story pages.

## Related modified files (in `.storybook/`)

- **theme.ts** — Catppuccin Macchiato palette and Storybook UI theme config. Currently mostly commented out.
- **manager.ts** — Applies the custom theme to the manager chrome. Currently commented (`addons.setConfig({ theme: designKitTheme })` is disabled).
- **preview.tsx** — Main preview config. The custom decorators and globals (withTheme, withDevice, withComments, DocsContainerWithComments) are currently commented out. The theme toggle (`withTheme` + `globalTypes.theme`) is re-enabled.

## How to restore

To re-enable the full Catppuccin customizations:

1. Uncomment the function definitions and imports in `preview.tsx` (marked with `// --- TEMPORARILY DISABLED ---` comments).
2. Uncomment the theme export and palette in `theme.ts`.
3. Uncomment the `addons.setConfig({ theme: designKitTheme })` call in `manager.ts`.
4. Restore the CSS in `manager-head.html` and `preview-head.html` from these `.original.html` files here.

The git history also preserves the original state — `git show HEAD:.storybook/theme.ts` etc. will show the full theme config before disable.

## Status

- **Comment widget** — Archived (not currently used)
- **Custom theme** — Disabled (can be re-enabled; currently Storybook uses vanilla dark theme)
- **Theme toggle (light/dark/system)** — Re-enabled and working
- **Backgrounds tool** — Fixed (was showing as duplicate dropdown; now disabled with the correct `disable: true` key)
