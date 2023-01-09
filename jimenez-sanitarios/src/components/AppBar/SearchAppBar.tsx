import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import { CartContext } from "../cart/context/CartContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
interface SearchAppBarProps {
  openDrawer: () => void;
  handleSearchText: (text: string) => void;
  searchText: string;
  setOpenCart: (value: boolean) => void;
  openCart: boolean;
}
export default function SearchAppBar({
  openDrawer,
  handleSearchText,
  searchText,
  setOpenCart,
  openCart,
}: SearchAppBarProps) {
  const { cartState } = useContext(CartContext);

  const [text, setText] = useState("");

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSearchText(e.target.value);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={openDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            color="primary"
            variant="h5"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              width: "1rem",
              display: { xs: "none", sm: "block" },
            }}
          >
            Jimenez Sanitarios
          </Typography>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(e) => {
                handleSearchText(e.target.value);
                console.log(text);
              }}
              onKeyPress={(e: any) => {
                handleKeyPress(e);
              }}
              placeholder="Buscar..."
              inputProps={{ "aria-label": "buscar" }}
            />
          </Search> */}
          <IconButton
            color={openCart ? "primary" : "default"}
            onClick={(e) => {
              setOpenCart(!openCart);
            }}
          >
            <Badge badgeContent={cartState.products.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
