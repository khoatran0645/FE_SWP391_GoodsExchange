import { Password } from "@mui/icons-material";
import useStore from "../app/store";
import { useEffect } from "react";
export default function User() {
  const { userInfo, getProducts, products, postLogin } = useStore((state) => state);
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);
  console.log("userInfo", userInfo);
  console.log("loading", isLoading);
  console.log("error", error);

  useEffect(() => {
    // getProducts();
  }, []);

  const getProductFromApi = (event) => {
    event.preventDefault();
    const form = {
      userName: "string",
      password: "string"
    }
    postLogin(form);
  };
  return (
    <>
      <h1>User</h1>
      {isLoading ? (
        <h2>Loading</h2>
      ) : (
        <ol>
          {products?.items?.map((product) => (
            <li key={product.productId}>{product.productName}</li>
          ))}
        </ol>
      )}

      <button onClick={getProductFromApi}>Get User</button>
    </>
  );
}
