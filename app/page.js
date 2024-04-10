"use client";
import Right from "@/components/Right";
import Left from "@/components/Left";
import { tokens, useMode } from "@/theme";
import { Box, Card } from "@mui/material";

export default function Home() {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Box className=" w-[25%] hidden lg:block ">
        <Card className=" h-full">
          <Left />
        </Card>
      </Box>
      <Box className="w-full md:w-[100%] lg:w-[70%]">
        <Right />
      </Box>
    </>
  );
}
