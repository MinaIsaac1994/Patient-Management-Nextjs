import { Done, RadioButtonUnchecked } from "@mui/icons-material";
import { Badge, IconButton, Tooltip } from "@mui/material";

const VisitIcons = ({ value, row, day = "" }) => {
  const handleClick = () => {
    updateVisit(row.original, day);
  };
  const title = row.original.visits[day]?.join(" - ");
  return (
    <IconButton
      sx={{ p: 0, m: 0, mx: value === 0 ? "0.5rem" : "0.1rem" }}
      onClick={handleClick}
    >
      <Tooltip
        title={title}
        enterDelay={800}
        leaveDelay={200}
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [-1, 0],
                },
              },
            ],
          },
        }}
      >
        {value === 0 ? (
          <RadioButtonUnchecked fontSize="small" />
        ) : (
          <Badge
            badgeContent={value}
            color="primary"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Done fontSize="medium" color="success" />
          </Badge>
        )}
      </Tooltip>
    </IconButton>
  );
};

export default VisitIcons;
