import { Tooltip, Typography } from "@mui/material";
import { StyledIconBtn } from "./style/styled";

export const ToolbarItem = ({
  label,
  icon,
  onClick,
  disabled = false,
}: any) => {
  return (
    <Tooltip title={label} arrow>
      <span>
        <StyledIconBtn onClick={onClick} disabled={disabled}>
          {icon}
          <Typography variant="body2" sx={{ ml: 1 }}>
            {label}
          </Typography>
        </StyledIconBtn>
      </span>
    </Tooltip>
  );
};
