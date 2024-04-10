"use client";
import Link from "next/link";
import { useContext } from "react";
import Zoom from "@mui/material/Zoom";
import { usePathname } from "next/navigation";
import Tooltip from "@mui/material/Tooltip";
import { Settings } from "@mui/icons-material";
import { ColorModeContext, tokens } from "@/theme";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import DataUsageRoundedIcon from "@mui/icons-material/DataUsageRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import icons from "./icons";

const Sidebar = () => {
  const theme = useTheme();

  const pathname = usePathname();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box className=" max-w-[100px] rounded-xl h-full">
      <div className=" flex flex-col h-full items-center justify-between py-5 ">
        <Typography variant="h2" className="">
          MA
        </Typography>
        <div className="flex flex-col gap-10">
          {navLinks.map(({ name, href, Icon }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href}>
                <Tooltip title={name} TransitionComponent={Zoom}>
                  <IconButton
                    style={{
                      padding: "15px",
                      borderRadius: "15px",
                      backgroundColor: isActive ? colors.bg3 : "",
                    }}
                  >
                    <Icon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Link>
            );
          })}
        </div>
        <div className="">
          <Avatar
            alt="Remy Sharp"
            src="/86844027.jpg"
            sx={{ width: 30, height: 30 }}
          />
        </div>
      </div>
    </Box>
  );
};

export default Sidebar;
const { Explorer } = icons;
const navLinks = [
  {
    name: "Dashboard",
    href: "/",
    Icon: (props) => <DataUsageRoundedIcon {...props} />,
  },
  {
    name: "Explore",
    href: "/explore",
    Icon: (props) => <Explorer {...props} />,
  },
  {
    name: "Therapists",
    href: "/therapists",
    Icon: (props) => <PersonRoundedIcon {...props} />,
  },
  {
    name: "Patients",
    href: "/patients",
    Icon: (props) => <AssignmentRoundedIcon {...props} />,
  },
  // {
  //   name: "Settings",
  //   href: "/settings",
  //   Icon: (props) => <Settings {...props} />,
  // },
];
