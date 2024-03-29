import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Cart from "../components/cart/Cart";
import ProductsTable from "../components/ProductsTable/ProductsTable";
import Product from "../models/Product";
import fetchProducts from "../services/ProductService";

const Products = () => {
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [hasMore, setHasMore] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsListName, setProductListName] = useState<string>("taladro");
  const [search,setSearch] = useState<string>("");
  useEffect(() => {
    fetchProducts(productsListName).then((productsWS: Product[]) =>
      setAllProducts(productsWS)
    );
  }, [productsListName]);

  useEffect(() => {
    setProducts(allProducts.slice(0, rowsPerPage));
  }, [allProducts, rowsPerPage]);

  const loadMore = () => {
     
    if(rowsPerPage + 10 < allProducts.length){
    
    setRowsPerPage(rowsPerPage + 10);
    console.log(rowsPerPage);
    }
    else{
      setHasMore(false);
    }
    
  };
  const handleKeyPress = (e:any) => {
    if(e.key ==='Enter'){
      setSearch(e.target.value);
    }
  }
  const handleSearch = (e:any) => {
    if(e.target.value === ""){
      setSearch("");
    }
  }
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {/* // a box who contains a select in horizontal mode */}
        {/* <Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          > */}
        <FormControl color="primary" focused sx={{ m: "1rem", minWidth: 200, display:"flex", justifyContent:"center" }}>
          <InputLabel color="primary" id="demo-simple-select-helper-label">
            Listas
          </InputLabel>
          <Select
            color="primary"
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={productsListName}
            variant="outlined"
            label="Listas"
            onChange={(e: any) => setProductListName(e.target.value)}
          >
            <MenuItem value="taladro">Taladro</MenuItem>
            <MenuItem value="jm">JM</MenuItem>
            <MenuItem value="cerrajeria">Cerrajeria</MenuItem>
            <MenuItem value="trebol">Trebol</MenuItem>
            <MenuItem value="nexo">Nexo</MenuItem>
            <MenuItem value="foxs">Foxs</MenuItem>
            <MenuItem value="ciardi">Ciardi</MenuItem>
          </Select>
        </FormControl>
        {/* </Box>
        </Box> */}
      <TextField sx={{display:'flex',justifyContent: 'flex-start', maxWidth:'55%',ml:3}} variant="standard" label="Buscar"  onKeyDown={handleKeyPress} onChange={handleSearch} />
      </Grid>
      {
        //this grid contains the table of products and the cart who only shows when state.products is not empty
      }
      <Grid item xs={8} md={7} >
        <InfiniteScroll
          dataLength={products.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<h4>Cargando...</h4>}
        >
          <ProductsTable
            products={allProducts}
            rowsPerPage={rowsPerPage}
            searchText={search}
          />
        </InfiniteScroll>
      </Grid>
      <Grid item xs={12} md={5}>
        <Cart />
      </Grid>
    </Grid>
  );
};

export default Products;
