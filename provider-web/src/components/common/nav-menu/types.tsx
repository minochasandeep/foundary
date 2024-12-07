import { BoxProps } from "@mui/material/Box";
import { ListProps } from "@mui/material/List";
import { TypographyProps } from "@mui/material/Typography";

/** The NavMenu props extending List Props */
export interface NavMenuProps extends ListProps {
  /** An array of NavMenuItem objects. Each object represents a single navigation menu item.
   */
  items: NavMenuItem[];
  /** Optional props that can be passed to the Box component that wraps each navigation menu item.
   * Useful for applying consistent styling to each item.*/
  itemProps?: BoxProps;
}

export interface NavMenuItemProps {
  isActive?: boolean;
  /** The text that will be displayed for the navigation menu item. */
  text: string;
  /** The route (URL) that the navigation menu item will navigate to when clicked.*/
  route: string;
  /** The number that will be displayed as a badge on the navigation menu item. */
  badgeCount?: number;
  /** Optional props that can be passed to the Box component that wraps the navigation menu item.
   * Useful for applying specific styling to a single item. */
  itemProps?: BoxProps;
  /** Optional props that can be passed to the Typography component.
   * Useful for applying specific styling to a single item. */
  typographyProps?: TypographyProps;
}

export interface NavMenuItem {
  /** The text that will be displayed for the navigation menu item. */
  text: string;
  /** The route (URL) that the navigation menu item will navigate to when clicked. */
  route: string;
  /** The number that will be displayed as a badge on the navigation menu item. */
  badgeCount?: number;
}
