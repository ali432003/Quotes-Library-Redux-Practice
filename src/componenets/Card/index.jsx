import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Close } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  color: "black",
  borderRadius: "16px",
  boxShadow: 24,
  p: 4,
};

export default function index({ quote, author, id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { CountWords, agiya } = useSelector((state) => state.max);
  // console.log(CountWords)

  return (
    <>
      <Card
        onClick={handleOpen}
        sx={{
          maxWidth: 275,
          maxHeight: 275,
          backgroundImage: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          transition: "transform 300ms ease-in-out",
          boxShadow: "5px 5px 10px 0 rgba(0, 0, 0, 0.2)",
          "&:hover": {
            transform: "scale(1.04)",
            boxShadow: "5px 5px 12px 0 rgba(0, 0, 0, 0.4)",
          },
        }}
      >
        <Tooltip title="Read More?" followCursor>
          <CardContent>
            <Typography variant="p" fontSize={25} component="div">
              {!agiya
                ? quote.slice(0, 50) + "..."
                : CountWords.map((words)=>words)}
            </Typography>

            <Typography variant="body2">{author}</Typography>
          </CardContent>
        </Tooltip>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography fontSize={25}>🙂</Typography>
            <IconButton color="success" onClick={handleClose}>
              <Close sx={{ cursor: "pointer" }} />
            </IconButton>
          </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {quote}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {author}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
