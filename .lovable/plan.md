# Keep dashboard content clear of the AppBar

## Changes
- Make the AppBar an opaque, fixed-height top layer that remains visually separate from all dashboard content.
- Keep the dashboard content in its own scrolling area beneath the AppBar, including short mobile screens.
- Preserve the mobile sidebar and notification panel above the AppBar while keeping maps and cards below it.

## Verification
- Check the truck-driver dashboard at desktop and mobile sizes.
- Verify the first dashboard row is fully visible, scrolling never hides content behind the AppBar, and menus/notifications layer correctly.

## Technical details
- Update only the shared dashboard shell and related stacking/viewport classes.
- Confirm the preview builds without errors and inspect the rendered layout geometry.
