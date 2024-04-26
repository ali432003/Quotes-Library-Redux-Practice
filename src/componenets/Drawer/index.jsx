import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Slider from "@mui/material/Slider";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../store/slices/QuoteSlice";
import { useState, useEffect } from "react";
import { filterAuthCards } from "../../store/slices/filterAuthCardSlice";
import { maxCountWords, minCountWords } from "../../store/slices/CountSlice";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function index({ display }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [auth, setAuth] = useState("");
  const selector = useSelector((state) => state.quotes);
  

  const disptch = useDispatch();

  useEffect(() => {
    disptch(fetchData());
  }, []);

  const handleChange = (e) => {
    setAuth(e.target.value);
    disptch(
      filterAuthCards({ quotes: selector.quotes, authorName: e.target.value })
    );
    setOpen(false);
  };
  const uniqueAuthors = Array.from(
    new Set(selector.quotes?.map((obj) => obj.author))
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }} mb={8}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="p"
            fontSize={30}
            noWrap
            component="div"
            sx={{ color: "#000" }}
          >
            Welcome To Quotes Library
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
          {/*--------------------------------------------------------------  */}
          <div className="relative container mx-auto px-4 mt-2">
            <select
              id="country"
              name="country"
              value={auth}
              onChange={handleChange}
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            >
              <option value="" disabled>
                Choose an author
              </option>
              <option value="All">All</option>
              {uniqueAuthors.map((author, index) => {
                return (
                  <option key={index} value={author} className="">
                    {author}
                  </option>
                );
              })}
            </select>
          </div>
          {/* ------------------------------------------------------------------------ */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingX: "1rem",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            <Typography fontWeight={900} variant="p" fontSize={18}>
              Word Count :{" "}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "2rem",
              }}
              mt={2}
            >
              <Typography variant="p">Max</Typography>
              <Typography variant="p">Min</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "2rem",
              }}
            >
              <Slider
                size="small"
                color="secondary"
                defaultValue={50}
                onChange={(e) =>
                  disptch(
                    maxCountWords({ quotes: display, value: e.target.value })
                  )
                }
                aria-label="Default"
                valueLabelDisplay="auto"
              />
              <Slider
                size="small"
                defaultValue={50}
                onChange={(e) =>
                  disptch(
                    minCountWords({ quotes: display, value: e.target.value })
                  )
                }
                aria-label="Default"
                valueLabelDisplay="auto"
              />
            </Box>
          </Box>
          {/* -------------------------------------------------------------------------- */}
          <Divider />
        </List>
      </Drawer>
    </Box>
  );
}
