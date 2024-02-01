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
import EditProductPanel from "./EditProductPanel";

interface IProductList {
  categorisedProduct: ProductResponseType[];
  searchText: string;
  categories: string[];
}

const ProductList = ({
  categorisedProduct,
  searchText,
  categories,
}: IProductList) => {
  const userStyles = UserStyles();
  const [products, setProducts] = useState<ProductResponseType[]>([]);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [productDetail, setProductDetail] = useState<ProductResponseType>();
  const [productDetailAfterClose, setProductDetailAfterClose] =
    useState<ProductResponseType>();
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [hidePreviousButton, setHidePreviousButton] = useState<boolean>(false);
  const [hideNextButton, setHideNextButton] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (searchText) {
        const url = `products/search?q=${searchText}&limit=${limit}&skip=${skip}`;
        const response = await getData(url);
        if (response.isSuccessfull) {
          setProducts(response.data.products);
          setProductCount(response.data.total);
        }
      } else {
        await getPaginatedRecords();
      }
    })();
  }, [searchText, limit, skip, setSkip]);

  const getPaginatedRecords = async () => {
    const url = `Products?limit=${limit}&skip=${skip}`;
    const response = await getData<ProductResponseType>(url);
    if (response.isSuccessfull) {
      setProducts(response.data.products);
      setProductCount(response.data.total);
    }
  };

  const getPrevious10Records = () => {
    if (skip < 0) {
      setHidePreviousButton(true);
    } else {
      setSkip((prev) => prev - 10);
      setHideNextButton(false);
    }
  };

  // const getNext10Records = () => {
  //   if (skip < productCount) {
  //     setSkip((prev) => prev + 10);
  //     setHidePreviousButton(false);
  //   } else {
  //     setHideNextButton(true);
  //   }
  // };

  const getNext10Records = () => {
    debugger;
    if (skip >= productCount) {
      setHideNextButton(true);
    } else {
      setSkip((prev) => prev + 10);
      setHidePreviousButton(false);
    }
  };

  const showDetails = (productDetail: ProductResponseType) => {
    setShowProductDetail(true);
    setProductDetail(productDetail);
  };

  const openEditDrawer = (productDetail: ProductResponseType) => {
    setProductDetail(productDetail);
    setShowEditPanel(true);
  };

  const closeShowProductDetail = () => {
    setShowProductDetail(false);
    setProductDetail(productDetailAfterClose);
  };

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }} key="all_products">
        {categorisedProduct.length < 1 &&
          products.map((obj: ProductResponseType) => (
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
                    <Caption1>
                      {obj.description.substring(0, 30) + "..."}
                    </Caption1>
                  }
                />
                <CardFooter>
                  <Button
                    onClick={() => showDetails(obj)}
                    appearance="secondary"
                  >
                    {" "}
                    Get Details
                  </Button>
                  <Button
                    onClick={() => openEditDrawer(obj)}
                    appearance="secondary"
                  >
                    {" "}
                    Edit Product
                  </Button>
                </CardFooter>
              </Card>
              <br />
            </div>
          ))}

        {categorisedProduct.map((obj: ProductResponseType) => (
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
                  <Caption1>
                    {obj.description.substring(0, 30) + "..."}
                  </Caption1>
                }
              />
              <CardFooter>
                <Button onClick={() => showDetails(obj)} appearance="secondary">
                  {" "}
                  Get Details
                </Button>
                <Button
                  onClick={() => openEditDrawer(obj)}
                  appearance="secondary"
                >
                  {" "}
                  Edit Product
                </Button>
              </CardFooter>
            </Card>
            <br />
          </div>
        ))}

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
                    <strong>Product Price :</strong> {productDetail?.price}{" "}
                    <br />
                    <strong>Product Category :</strong>{" "}
                    {productDetail?.category} <br />
                    <strong>Product Description :</strong>
                    {productDetail?.description} <br />
                    <strong>Product Brand :</strong> {productDetail?.brand}{" "}
                    <br />
                    <strong>Product discountPercentage :</strong>{" "}
                    {productDetail?.discountPercentage}
                  </div>
                </DialogContent>
                <DialogActions>
                  <DialogTrigger disableButtonEnhancement>
                    <Button
                      appearance="primary"
                      onClick={closeShowProductDetail}
                    >
                      Close
                    </Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
        </div>
      </div>

      {categorisedProduct.length < 1 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {hidePreviousButton === false && (
            <Button
              appearance="primary"
              className={userStyles.ml20}
              // onClick={() => setSkip((prev) => prev - 10)}
              onClick={() => getPrevious10Records()}
            >
              Previous Products
            </Button>
          )}
          {hideNextButton === false && (
            <Button
              appearance="primary"
              className={userStyles.ml20}
              //onClick={() => setSkip((prev) => prev + 10)}
              onClick={() => getNext10Records()}
            >
              Next Products
            </Button>
          )}
        </div>
      )}

      <EditProductPanel
        isOpen={showEditPanel}
        onDismiss={() => setShowEditPanel(false)}
        categories={categories}
        product={productDetail}
      />
    </>
  );
};
export default ProductList;
