import React, { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useSwr, { mutate } from "swr";
import { OrganizationPreference, Preference } from "preferences";
import { useSwrWithTrigger } from "@/hooks/swr-hooks";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Check from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Divider, ListItemText, Skeleton } from "@mui/material";
import { buildPath } from "@/utils/query-helpers/query.helpers";
import { UnauthorizedError } from "@/lib/exceptions";

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [preferredOrg, setPreferredOrg] = React.useState<{
    id: number;
    name: string;
  } | null>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  let fetchOrganizationsPath = buildPath("/organizations", {
    page: "1",
    pageSize: "5", // fetching top 5 organizations
    orderBy: {},
    where: {},
  });

  // fetch organizations
  const { data: orgData } = useSwr<{
    items?: any;
    total?: number;
    pageSize?: number;
    currentPage?: number;
  }>(fetchOrganizationsPath);
/* 
  const {
    data: userData,
    isValidating,
    isLoading: userDataLoading,
  } = useSwr<{
    firstName: string;
    lastName: string;
    sessionOrganizationId: number;
    sessionOrganizationName: string;
    image?: string;
  }>("/users/me");

  const userName = userData
    ? `${userData?.firstName} ${userData?.lastName}`
    : "NA";

  // fetch users prefrerred orgainzation
  const {
    data: prefOrgData,
    trigger,
    isLoading: userPrefOrgLoading,
  } = useSwrWithTrigger<
    Preference<OrganizationPreference>,
    OrganizationPreference
  >("/preferences/organization", { handleSuccess: false });

  if (userName === "NA" && !isValidating) {
    throw new UnauthorizedError("Account not found", {
      actionHandler: () => {
        signOut();
      },
    });
  }
 */
  /* useEffect(() => {
    if (prefOrgData || userData) {
      const prefOrgId = prefOrgData?.value?.organizationId;
      let prefOrg;
      if (!prefOrgId || orgData?.items?.length === 0) {
        if (userData?.sessionOrganizationId) {
          prefOrg = {
            id: userData?.sessionOrganizationId,
            name: userData?.sessionOrganizationName,
          };
        }
      } else {
        prefOrg = prefOrgId
          ? orgData?.items.find((org: any) => org.id === prefOrgId)
          : userData?.sessionOrganizationId
            ? {
                id: userData?.sessionOrganizationId,
                name: userData?.sessionOrganizationName,
              }
            : null;
      }
      if (prefOrg) {
        setPreferredOrg({
          id: prefOrg.id,
          name: prefOrg.name,
        });
      }
    }
  }, [prefOrgData, userData, orgData]);
 */
  /* const handlePreferredOrgChange = async (id: number) => {
    await trigger({ organizationId: id });
    mutate(
      (key) =>
        typeof key === "string" &&
        (key.endsWith("/me") || key.includes("/preferences/organization")),
      undefined,
      {
        revalidate: true,
      },
    ).then(() => {
      router.push("/");
    });
  }; */

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <React.Fragment>
      <Box display={"flex"}>
        {/* <Box
          data-testid="account-menu-button"
          display={"flex"}
          onClick={handleClick}
          gap={1}
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            borderRadius: "8px",
            cursor: "pointer",
            p: "4px 8px 4px 12px",
          }}
        > */}
          {/* <Box
            display={"flex"}
            alignItems={"flex-end"}
            flexDirection={"column"}
          >
            {userDataLoading || userPrefOrgLoading ? (
              <Skeleton sx={{ minWidth: 100 }} />
            ) : (
              <>
                <Typography
                  fontSize={"0.9rem"}
                  fontWeight={500}
                  color={"text.primary"}
                >
                  {userName}
                </Typography>
                <Typography fontSize={"0.66rem"} color={"grey.700"}>
                  {preferredOrg?.name || "NA"}
                </Typography>
              </>
            )}
          </Box> */}
          {/* <Avatar
            sx={{
              width: 35,
              height: 35,
              fontSize: 15,
              backgroundColor: "primary.light",
              color: "primary.contrastText",
            }}
            src={userData?.image || undefined}
            alt={userName}
          >
            {!userData?.image && getInitials(userName)}
          </Avatar> */}
        </Box>
        {/* <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {orgData?.items.map((org: any) => (
            <MenuItem
              key={`org-item-${org.id}`}
              onClick={() => {
                handlePreferredOrgChange(org.id);
              }}
            >
              <ListItemText>{org.name}</ListItemText>
              {org?.id === preferredOrg?.id && (
                <ListItemIcon sx={{ minWidth: "auto !important" }}>
                  <Check fontSize="small" />
                </ListItemIcon>
              )}
            </MenuItem>
          ))}

          <Divider />
          <MenuItem onClick={() => router.push("/account-settings")}>
            <ListItemText>Account Settings</ListItemText>
            <ListItemIcon sx={{ minWidth: "auto !important" }}>
              <ArrowForwardIcon fontSize="small" />
            </ListItemIcon>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemText>Logout</ListItemText>
            <ListItemIcon sx={{ minWidth: "auto !important" }}>
              <Logout fontSize="small" />
            </ListItemIcon>
          </MenuItem>
        </Menu> */}
      {/* </Box> */}
    </React.Fragment>
  );
};

export default AccountMenu;
