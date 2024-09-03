"use client";
import { Chip, Typography } from "@mui/material";
import { useMemo } from "react";

const useTherapistsColumns = () => {
  const columns = useMemo(
    () => [
      {
        id: "therapists",
        header: "Therapist",
        columns: [
          {
            accessorKey: "name",

            id: "name", //id is still required when using accessorFn instead of accessorKey
            header: "Name",
            size: 250,
            Cell: ({ cell }) => (
              <Typography sx={{ fontWeight: "400", fontSize: "16px" }}>
                {cell.getValue()}
              </Typography>
            ),
            // Cell: ({ renderedCellValue, row }) => (
            //   <Box
            //     sx={{
            //       display: "flex",
            //       alignItems: "center",
            //       gap: "1rem",
            //     }}
            //   >
            //     <img
            //       alt="avatar"
            //       height={30}
            //       src={row.original.avatar}
            //       loading="lazy"
            //       style={{ borderRadius: "50%" }}
            //     />
            //     {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
            //     <span>{renderedCellValue}</span>
            //   </Box>
            // ),
          },
          {
            accessorKey: "team.name", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            // enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Team",
            size: 100,
            Cell: ({ cell }) => (
              <Typography sx={{ fontWeight: "400", fontSize: "14px" }}>
                {cell.getValue()}
              </Typography>
            ),
          },
        ],
      },
      {
        id: "role",
        header: "Role",
        columns: [
          {
            accessorKey: "band",
            filterVariant: "select",
            filterSelectOptions: bandList,
            header: "Band",
            size: 100,

            Cell: ({ cell }) => (
              <Chip
                label={
                  <Typography
                    textAlign="center"
                    sx={{ fontWeight: "600", fontSize: "16px" }}
                  >
                    {cell.getValue()}
                  </Typography>
                }
                color="default"
                variant="filled"
              />
            ),
          },
          {
            accessorKey: "speciality",
            header: "Speciality",
            size: 150,
            Cell: ({ cell }) => {
              const specialities = {
                PT: "Physiotherapist",
                OT: "Occupational Therapist",
                TA: "Therapy Assistant",
              };

              return (
                <Typography
                  textAlign="center"
                  sx={{ fontWeight: "600", fontSize: "14px" }}
                >
                  {specialities[cell.getValue()]}
                </Typography>
              );
            },
          },
          {
            id: "availability",
            header: "Availability",
            accessorKey: "availability",
            Cell: ({ cell }) => {
              const isAvail = cell.getValue();
              return (
                <Chip
                  label={
                    <Typography
                      textAlign="center"
                      sx={{ fontWeight: "400", fontSize: "14px" }}
                    >
                      {isAvail ? "Available" : "Unavailable"}
                    </Typography>
                  }
                  color={isAvail ? "success" : "default"}
                  variant="filled"
                />
              );
            },
            // Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            // muiFilterTextFieldProps: {
            //   sx: {
            //     minWidth: "250px",
            //   },
            // },
          },
        ],
      },
    ],
    []
  );
  return [columns];
};

export default useTherapistsColumns;
const bandList = [0, 1, 2, 3, 4, 5, 6, 7, 8];
