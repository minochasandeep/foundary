import React from "react";
import Link from "next/link";
import { NavMenuItemProps } from "../types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";

const NavMenuItem: React.FC<NavMenuItemProps> = ({
  text,
  isActive,
  route,
  itemProps,
  badgeCount = -1,
  typographyProps,
}) => {
  const { sx: itemSx, ...itemRest } = itemProps || {};
  const { sx: typographySx, ...typographyRest } = typographyProps || {};

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Link href={route} key={text} passHref>
        <Box
          sx={{
            pl: 1,
            ml: "5px",
            mb: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textDecoration: "none",
            minHeight: 40,
            "&:hover": {
              backgroundColor: "grey.300",
              borderRadius: "100px",
            },
            "&:active": {
              backgroundColor: "grey.300",
              borderRadius: "100px",
            },
            ...(isActive && {
              backgroundColor: "grey.300",
              borderRadius: "100px",
            }),
            ...itemSx,
          }}
          {...itemRest}
        >
          <Typography
            fontSize={"16px"}
            fontStyle={"normal"}
            fontWeight={500}
            sx={{
              color: "text.primary",
              ...typographySx,
            }}
            {...typographyRest}
          >
            {text}
          </Typography>

          {badgeCount > -1 && (
            <Box
              sx={{
                minHeight: 32,
                bgcolor: "error.main",
                px: 0.5,
                borderRadius: "18px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                marginRight: "5px",
                minWidth: 32,
              }}
            >
              <Typography color="common.white">{badgeCount}</Typography>
            </Box>
          )}
         
        </Box>
      </Link>
    </Box>
  );
};

export default NavMenuItem;
