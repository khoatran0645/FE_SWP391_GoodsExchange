import * as React from "react";
import ModeratorPage from "./ModeratorPage";
import NavBarMo from "./NavBarMo";
import Box from "@mui/material/Box";
import { Button, Paper, Typography } from "@mui/material";
import useStore from "../../app/store";

const products = [
  {
    id: 1,
    title: "Post 1",
    description: "Description of Post 1",
    image:
      "https://th.bing.com/th/id/R.cdc72aedf907b963ff62a536db000180?rik=EbuV7odV87o2qg&riu=http%3a%2f%2fvppdean.vn%2fuploadwb%2fhinhsp%2fbut_chi_go_2b_264520184015_b_.png&ehk=Ghv0eiBAkZ3v8yFPXaju%2fH757p9nUAbc2zbXJboE4Ac%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
    price: 20,
    category: "pen",
  },
  { id: 2, title: "Post 2", description: "Description of Post 2" },
  {
    id: 3,
    title: "Post 3",
    description: "Description of Post 3",
    image:
      "https://vanphongphamgiare.com.vn/wp-content/uploads/2020/06/But-ch%C3%AC.png",
  },
  { id: 4, title: "Post 4", description: "Description of Post 4" },
  {
    id: 5,
    title: "Post 5",
    description: "Description of Post 5",
    image:
      "https://vanphongphamgiare.com.vn/wp-content/uploads/2020/06/But-ch%C3%AC.png",
  },
  { id: 6, title: "Post 6", description: "Description of Post 6" },
  {
    id: 7,
    title: "Post 7",
    description: "Description of Post 7",
    image:
      "https://vanphongphamgiare.com.vn/wp-content/uploads/2020/06/But-ch%C3%AC.png",
  },
  { id: 8, title: "Post 8", description: "Description of Post 8" },
  {
    id: 9,
    title: "Post 9",
    description: "Description of Post 9",
    image:
      "https://vanphongphamgiare.com.vn/wp-content/uploads/2020/06/But-ch%C3%AC.png",
  },
  { id: 10, title: "Post 10", description: "Description of Post 10" },
  {
    id: 11,
    title: "Post 11",
    description: "Description of Post 11",
    image:
      "https://vanphongphamgiare.com.vn/wp-content/uploads/2020/06/But-ch%C3%AC.png",
  },
  { id: 12, title: "Post 12", description: "Description of Post 12" },
  {
    id: 13,
    title: "Post 13",
    description: "Description of Post 13",
    image:
      "https://vanphongphamgiare.com.vn/wp-content/uploads/2020/06/But-ch%C3%AC.png",
  },
  { id: 14, title: "Post 14", description: "Description of Post 14" },
  {
    id: 15,
    title: "Post 15",
    description: "Description of Post 15",
    image:
      "https://vanphongphamgiare.com.vn/wp-content/uploads/2020/06/But-ch%C3%AC.png",
  },
  { id: 16, title: "Post 16", description: "Description of Post 16" },
];

export default function ManageProduct() {
  const [productList, setProductList] = React.useState(products);
  const [productDoneList, setProductDoneList] = React.useState([]);
  const setAuth = useStore((state) => state.setAuth);
  const onDenyClick = async (e) => {
    e.preventDefault();
    await setAuth();
    console.log("test", e);
    setProductList(productList.filter((item) => item.id !== product.id));
  };

  return (
    <>
      <NavBarMo />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "100px",
          width: "70%",
          flexFlow: "column",
        }}
      >
        <ModeratorPage />

        {productList.map((product) => (
          <Paper key={product.id} sx={{ p: 3, mb: 2, maxWidth: "500px" }}>
            <Typography variant="h6">{product.title}</Typography>
            <img
              style={{
                width: "100%",
              }}
              src={product.image}
              alt="img"
            />
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
              }}
            >
              {product.price} VND
            </Typography>
            <Typography variant="body1">{product.category}</Typography>
            <Typography variant="body1">ID: {product.id}</Typography>

            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 1 }}
                onClick={() => {
                  setProductList(
                    productList.filter((item) => item.id !== product.id)
                  );
                  setProductDoneList([...productDoneList, product]);
                }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setProductList(
                    productList.filter((item) => item.id !== product.id)
                  );
                  setProductDoneList([...productDoneList, product]);
                }}
              >
                Deny
              </Button>
            </Box>
          </Paper>
        ))}
        <Typography variant="h6">Done</Typography>

        {productDoneList.map((product) => (
          <Paper key={product.id} sx={{ p: 3, mb: 2, minWidth: "500px" }}>
            <Typography variant="h6">{product.title}</Typography>
            <Typography variant="body1">{product.description}</Typography>
            <Typography variant="body1">
              {product.userName} producted {product.affectedUser} for{" "}
              {product.productType}
            </Typography>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 1 }}
                onClick={() => {
                  setProductList(
                    productList.filter((item) => item.id !== product.id)
                  );
                }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={onDenyClick}
              >
                Deny
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </>
  );
}
