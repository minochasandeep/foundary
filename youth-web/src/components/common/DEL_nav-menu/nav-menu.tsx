import { List, Box } from "@mui/material";
import { NavMenuProps } from "./types";
import NavMenuItem from "./nav-menu-item/nav-menu-item";
import { usePathname } from "next/navigation";
import { NAV_DRAWER_WIDTH } from "@/constants/app.constant";

const NavMenu: React.FC<NavMenuProps> = ({
  items,
  itemProps,
  ...restProps
}) => {
  const { sx: menuSx, ...menuRest } = restProps || {};
  const pathname = usePathname();

  return (
    <Box 
      sx={{
        width: NAV_DRAWER_WIDTH,
        flexShrink: 0,
        flex: 1,
        pr: "3px",
        py: 1,
        flexDirection: "column",
        overflow: "auto",
        height: "100%",
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
    >
      <Box display="flex" ml= "5px">
      </Box>
      <List
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          ...menuSx,
        }}
        {...menuRest}
      >
        {items.map((item) => (
          <NavMenuItem
            isActive={pathname.includes(
              item.route.includes("/") ? item.route.split("/")[2] : item.route,
            )}
            text={item.text}
            route={item.route}
            key={item.text}
            itemProps={itemProps}
            badgeCount={item.badgeCount}
          />
        ))}
      </List>
    </Box>
  );
};

export default NavMenu;
