import { Box, IconButton, } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMenu } from "../menu/MenuProvider";

const MoreButton = () => {
  const setOpen = useMenu();
  return (
    <Box sx={{ display: { xs: "inline-flex", md: "none" }}}>
      <IconButton
        onClick={() => setOpen(true)}
        size="large"
        color="inherit"
        aria-label="menu"
        sx={{ display: { xs: "inline-flex", md: "none"} }}
      >
        <MoreVertIcon/>
      </IconButton>
    </Box>
  );
};

export default MoreButton;