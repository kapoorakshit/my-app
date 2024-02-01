import { Link, useNavigate } from "react-router-dom";
import { login, sidebar } from "../../constants/ApplicationRoutes";
import { Input, mergeClasses, Text } from "@fluentui/react-components";
import { useCallback, useEffect, useState } from "react";
import { UserStyles } from "../../componentStyles/UserStyles";
import RenderComponentByRoute from "../../RenderComponentByRoute";
import NewProductPanel from "./NewProductPanel";
import { getData } from "../../services/HttpServices";
import { ChevronDown20Filled, ChevronUp20Filled } from "@fluentui/react-icons";
import { ProductResponseType } from "../../interfaces/ProductResponseType";

export default function Navbar() {
  const navigate = useNavigate();
  const userStyles = UserStyles();

  const [openAddDrawer, setOpenAddDrawer] = useState(false);
  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [showCategory, setShowCategory] = useState(false);
  const [showCategoriesdProduct, setShowCategoriesProduct] = useState<
    ProductResponseType[]
  >([]);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    (async () => {
      debugger;
      const url = `products/categories`;
      const response = await getData(url);
      if (response.isSuccessfull) {
        setProductCategories(response.data);
      }
    })();
  }, []);

  const getProductOfCategory = async (categoryName: string) => {
    debugger;
    const url = `products/category/${categoryName}`;
    const response = await getData(url);
    if (response.isSuccessfull) {
      setShowCategoriesProduct(response.data.products);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate(login);
  };

  const openDrawer = () => {
    setOpenAddDrawer(true);
  };

  const closeDrawer = useCallback(() => {
    setOpenAddDrawer(false);
  }, [openAddDrawer]);

  return (
    <>
      <div
        className={mergeClasses(
          userStyles.displayflex,
          userStyles.padding10,
          userStyles.blackBackground
        )}
        key="navbar"
      >
        <div
          className={mergeClasses(userStyles.marginLeft20, userStyles.fontSize)}
          style={{ marginTop: "6px" }}
        >
          Shopping Cart
        </div>
        <div
          className={mergeClasses(
            userStyles.marginLeft20,
            userStyles.cursorPointer
          )}
          style={{ marginTop: "6px" }}
          onClick={() => openDrawer()}
        >
          Add Product
        </div>
        <div
          className={mergeClasses(
            userStyles.marginLeft20,
            userStyles.cursorPointer
          )}
        >
          <Input
            placeholder="Search here"
            onChange={(e) => setSearchText(e.target.value.trim())}
          />
        </div>
        <div
          className={mergeClasses(
            userStyles.marginLeft20,
            userStyles.cursorPointer
          )}
          style={{ marginTop: "6px" }}
          onClick={() => handleLogout()}
        >
          Logout
        </div>
      </div>
      <div key="sidebar" style={{ display: "flex" }}>
        <div
          className={mergeClasses(userStyles.backgroundColor)}
          key="menu-items"
          style={{ minWidth: "250px" }}
        >
          <div className={mergeClasses(userStyles.padding7)} key={`home_name`}>
            <Link
              to={sidebar}
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "18px",
                paddingLeft: "10px",
              }}
              onClick={() => setShowCategoriesProduct([])}
              className={userStyles.cursorPointer}
            >
              Home
            </Link>
          </div>
          <div
            className={mergeClasses(userStyles.padding7)}
            key={`categories_name`}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Text
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "18px",
                paddingLeft: "10px",
              }}
              onClick={() => setShowCategory(!showCategory)}
              className={userStyles.cursorPointer}
            >
              Categories
            </Text>
            {showCategory === false && (
              <ChevronDown20Filled
                onClick={() => setShowCategory(true)}
                className={userStyles.cursorPointer}
              />
            )}
            {showCategory === true && (
              <ChevronUp20Filled
                onClick={() => setShowCategory(false)}
                className={userStyles.cursorPointer}
              />
            )}
          </div>
          {showCategory &&
            productCategories.map((obj: string, index: number) => (
              <div
                className={mergeClasses(userStyles.padding7)}
                key={`${obj}_${index}`}
              >
                <Link
                  to={sidebar}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    paddingLeft: "10px",
                    fontSize: "16px",
                  }}
                  onClick={() => getProductOfCategory(obj)}
                >
                  {obj}
                </Link>
              </div>
            ))}
        </div>
        <div key="render-component">
          <RenderComponentByRoute
            productOfCategory={showCategoriesdProduct}
            searchText={searchText}
            productCategories={productCategories}
          />
        </div>
      </div>

      <NewProductPanel
        isOpen={openAddDrawer}
        onDismiss={() => closeDrawer()}
        categories={productCategories}
      />
    </>
  );
}
