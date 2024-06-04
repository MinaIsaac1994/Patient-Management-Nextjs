import { useContext } from "react";
import dynamic from "next/dynamic";
import CardWrapper from "./card-wrapper";
import { useTheme, Box } from "@mui/material";
import { ColorModeContext, tokens } from "@/theme";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Chart as ChartJs } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import Divider from "@mui/material/Divider";
import {
  countSpecialties,
  transformPrioritiesResponse,
} from "@/utils/functions";
import Link from "next/link";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const TeamCard = ({
  name,
  id = "id",
  users = [],
  description,
  totalPatients,
  priorities = [],
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { PT, OT, TA } = countSpecialties(users);
  console.log();
  return (
    <CardWrapper borderRadius={"30px"}>
      <CardContent>
        <Link href={`explore/team/${id}`}>
          <Box
            sx={{
              height: "200px",
              padding: "15px",
              borderRadius: "15px",
              backgroundColor: colors.grey["800"],
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                position: "relative",
              }}
            >
              <Doughnut
                options={{
                  cutout: "60%",

                  hoverOffset: 10,
                  plugins: { legend: false },
                }}
                data={{
                  labels: ["Opel 4", "Opel 3", "Opel 2", "Opel 1"],
                  datasets: [
                    {
                      label: "Contacts",
                      data: transformPrioritiesResponse(priorities).reverse(),
                      borderRadius: 12,
                      borderWidth: 6,
                      borderColor: colors.grey["800"],
                      backgroundColor: [
                        "#811a1a",
                        "#68480d",
                        "#5b5b18",
                        "#088308",
                      ],
                    },
                  ],
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1,
                }}
              >
                <Typography variant="h3">{totalPatients}</Typography>
              </Box>
            </Box>
          </Box>

          <Typography
            textAlign="center"
            variant="h3"
            color="text.secondary"
            fontWeight="600"
            sx={{ padding: "10px 0 0 0", my: 1 }}
          >
            {name}
          </Typography>
          <Box
            sx={{
              mt: 2,
              ml: 1,
              px: 1,
              border: "1px solid",
              borderColor: "divider",
              // backgroundColor: colors.grey["800"],
              backgroundColor: "#5d5c5c15",
              borderRadius: "18px",
              height: "40px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Typography
              fontWeight="600"
              color="text.secondary"
              sx={{ color: "#005194", fontSize: "16px" }}
            >
              {PT} PT
            </Typography>

            <Divider orientation="vertical" variant="middle" flexItem />

            <Typography
              fontWeight="600"
              color="text.secondary"
              sx={{ color: "#0d7e00", fontSize: "16px" }}
            >
              {OT} OT
            </Typography>
            <Divider orientation="vertical" variant="middle" flexItem />

            <Typography
              fontWeight="600"
              color="text.secondary"
              sx={{ color: "#c1c1c1", fontSize: "16px" }}
            >
              {TA} TA
            </Typography>
          </Box>
        </Link>
      </CardContent>
    </CardWrapper>
  );
};
export default TeamCard;
