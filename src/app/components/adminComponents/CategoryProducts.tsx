import { useState, useEffect } from "react";
import { ProductResponseType } from "../../interfaces/ProductResponseType";
import { getData } from "../../services/HttpServices";
import {
  Button,
  Caption1,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Image,
  Text,
  mergeClasses,
} from "@fluentui/react-components";
import { UserStyles } from "../../componentStyles/UserStyles";

interface ICategoryProducts {
  products?: ProductResponseType[];
}

const CategoryProducts = ({ products }: ICategoryProducts) => {
  const userStyles = UserStyles();
  //  const [products, setProducts] = useState<ProductResponseType[]>([]);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [productDetail, setProductDetail] = useState<ProductResponseType>();
  const [productDetailAfterClose, setProductDetailAfterClose] =
    useState<ProductResponseType>();

  //   useEffect(() => {
  //     (async () => {
  //       debugger;
  //       const url = `Products?limit=10&skip=10`;
  //       const response = await getData<ProductResponseType>(url);
  //       if (response.isSuccessfull) {
  //         setProducts(response.data.products);
  //       }
  //     })();
  //   }, []);

  const showDetails = (productDetail: ProductResponseType) => {
    setShowProductDetail(true);
    setProductDetail(productDetail);
  };

  const closeShowProductDetail = () => {
    setShowProductDetail(false);
    setProductDetail(productDetailAfterClose);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }} key="all_products">
      {products?.map((obj: ProductResponseType) => (
        <div
          key={`${obj.thumbnail}`}
          className={mergeClasses(
            userStyles.marginLeft20,
            userStyles.marginTop20
          )}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Card key="detailOfCard">
            <CardPreview>
              <img
                src={obj.thumbnail}
                alt="Presentation Preview"
                style={{ width: "250px", height: "200px" }}
              />
            </CardPreview>

            <CardHeader
              header={
                <Text weight="semibold">
                  {obj.title.substring(0, 25) + "..."}
                </Text>
              }
              description={
                <Caption1>{obj.description.substring(0, 30) + "..."}</Caption1>
              }
            />
            <CardFooter>
              <Button onClick={() => showDetails(obj)} appearance="secondary">
                {" "}
                Get Details
              </Button>
              <Button onClick={() => showDetails(obj)} appearance="secondary">
                {" "}
                Edit Product
              </Button>
            </CardFooter>
          </Card>
          <br />
        </div>
      ))}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button appearance="primary" className={userStyles.ml20}>
          Previous Products
        </Button>
        <Button appearance="primary" className={userStyles.ml20}>
          Next Products
        </Button>
      </div>

      <div key="product_Detail">
        <Dialog open={showProductDetail}>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Product name : {productDetail?.title}</DialogTitle>
              <DialogContent>
                <div>
                  <Image
                    src={productDetail?.thumbnail}
                    alt="productDetail"
                    width={200}
                  />{" "}
                  <br />
                  <strong>Product Price :</strong> {productDetail?.price} <br />
                  <strong>Product Category :</strong> {productDetail?.category}{" "}
                  <br />
                  <strong>Product Description :</strong>
                  {productDetail?.description} <br />
                  <strong>Product Brand :</strong> {productDetail?.brand} <br />
                  <strong>Product discountPercentage :</strong>{" "}
                  {productDetail?.discountPercentage}
                </div>
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="primary" onClick={closeShowProductDetail}>
                    Close
                  </Button>
                </DialogTrigger>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </div>
    </div>
  );
};
export default CategoryProducts;
