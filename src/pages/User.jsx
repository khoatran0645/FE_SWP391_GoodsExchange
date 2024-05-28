import { useStore } from "../app/store";
import { useEffect } from "react";
export default function User() {
  const { users, loading, error, getProducts, products } = useStore((state) => state);
  console.log("user", users);
  console.log("loading", loading);
  console.log("error", error);

  useEffect(() => {
    getProducts();
  }, []);


  const getProductFromApi = (event) => {
    event.preventDefault();
    getProducts();
  };
  return (
    <>
      <h1>User</h1>
      {loading ? (
        <h2>Loading</h2>
      ) : (
        <ol>
          {products?.items?.map((product) => (
            <li key={product.productId}>
              {product.productName}
            </li>
          ))}
        </ol>
      )}

      <button onClick={getProductFromApi}>Get User</button>
    </>
  );
}
