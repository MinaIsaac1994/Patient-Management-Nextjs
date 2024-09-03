//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";

//Material UI Imports
import {
  Box,
  Button,
  lighten,
  MenuItem,
  Typography,
  ListItemIcon,
} from "@mui/material";

import icons from "@/components/icons";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const Table = ({
  data,
  columns = [],
  grouping = [],
  rowActions = null,
  detailPanel = null,
}) => {
  const renderRowActionMenuItems = rowActions
    ? ({ closeMenu, row }) =>
        rowActions.map(
          ({
            icon = "Wait",
            name = "UNTITLED",
            onClick = () => alert("not provided"),
          }) => (
            <MenuItem
              key={name}
              onClick={() => {
                onClick(row.original);
                closeMenu();
              }}
              sx={{ m: 0 }}
            >
              <ListItemIcon>{icons[icon]()}</ListItemIcon>
              {name}
            </MenuItem>
          )
        )
    : null;

  // [
  //   <MenuItem
  //     key={0}
  //     onClick={() => {
  //       // View profile logic...
  //       closeMenu();
  //     }}
  //     sx={{ m: 0 }}
  //   >
  //     <ListItemIcon>
  //       <AccountCircle />
  //     </ListItemIcon>
  //     View Profile
  //   </MenuItem>,
  //   <MenuItem
  //     key={1}
  //     onClick={() => {
  //       // Send email logic...
  //       closeMenu();
  //     }}
  //     sx={{ m: 0 }}
  //   >
  //     <ListItemIcon>
  //       <Send />
  //     </ListItemIcon>
  //     Send Email
  //   </MenuItem>,
  // ];

  const table = useMaterialReactTable({
    data,
    columns,
    enableDensityToggle: false,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: rowActions ? true : false,
    enableRowSelection: false,
    initialState: {
      // grouping: [""],
      showColumnFilters: false,
      showGlobalFilter: true,
      columnPinning: {
        // left: ["mrt-row-expand", "mrt-row-select", "name", "dob", "nhs_number"],
        right: ["mrt-row-actions", "opel"],
      },
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined",
    },
    renderDetailPanel: detailPanel,
    renderRowActionMenuItems,

    // renderTopToolbar: ({ table }) => {
    //   const handleDeactivate = () => {
    //     table.getSelectedRowModel().flatRows.map((row) => {
    //       alert("deactivating " + row.getValue("name"));
    //     });
    //   };

    //   const handleActivate = () => {
    //     table.getSelectedRowModel().flatRows.map((row) => {
    //       alert("activating " + row.getValue("name"));
    //     });
    //   };

    //   const handleContact = () => {
    //     table.getSelectedRowModel().flatRows.map((row) => {
    //       alert("contact " + row.getValue("name"));
    //     });
    //   };

    //   return (
    //     <Box
    //       sx={(theme) => ({
    //         backgroundColor: lighten(theme.palette.background.default, 0.05),
    //         display: "flex",
    //         gap: "0.5rem",
    //         p: "8px",
    //         justifyContent: "space-between",
    //       })}
    //     >
    //       <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
    //         {/* import MRT sub-components */}
    //         <MRT_GlobalFilterTextField table={table} />
    //         <MRT_ToggleFiltersButton table={table} />
    //       </Box>
    //       <Box>
    //         <Box sx={{ display: "flex", gap: "0.5rem" }}>
    //           <Button
    //             color="error"
    //             disabled={!table.getIsSomeRowsSelected()}
    //             onClick={handleDeactivate}
    //             variant="contained"
    //           >
    //             Deactivate
    //           </Button>
    //           <Button
    //             color="success"
    //             disabled={!table.getIsSomeRowsSelected()}
    //             onClick={handleActivate}
    //             variant="contained"
    //           >
    //             Activate
    //           </Button>
    //           <Button
    //             color="info"
    //             disabled={!table.getIsSomeRowsSelected()}
    //             onClick={handleContact}
    //             variant="contained"
    //           >
    //             Contact
    //           </Button>
    //         </Box>
    //       </Box>
    //     </Box>
    //   );
    // },
    muiTablePaperProps: {
      elevation: 10,
      sx: (theme) => ({
        borderRadius: "12px/12px",
        backgroundColor: theme.palette.background.paper,
      }),
    },
    muiTableHeadCellProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.background.paper,
      }),
    },
    muiTableBodyRowProps: {
      sx: (theme) => ({
        backgroundColor: "#1c1e24",
      }),
    },
    muiTopToolbarProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.background.paper,
      }),
    },
    muiBottomToolbarProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.background.paper,
      }),
    },
    muiDetailPanelProps: {
      sx: (theme) => ({
        backgroundColor: "#121417",
      }),
    },
    displayColumnDefOptions: {
      "mrt-row-actions": {
        muiTableBodyCellProps: {
          align: "center", //change head cell props
          sx: {
            backgroundColor: "#020814 !important",
          },
        },
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
      },
    },
    // muiColumnActionsButtonProps: {
    //   sx: {
    //     width: 0,
    //   },
    // },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MaterialReactTable table={table} />
    </LocalizationProvider>
  );
};

export default Table;
