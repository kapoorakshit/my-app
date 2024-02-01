import { useLocation } from "react-router";
import ProductList from "./components/adminComponents/ProductList";
import { sidebar } from "./constants/ApplicationRoutes";
import { ProductResponseType } from "./interfaces/ProductResponseType";

interface IRenderComponentByRoute {
  productOfCategory: ProductResponseType[];
  searchText: string;
  productCategories: string[];
}

const RenderComponentByRoute = ({
  productOfCategory,
  searchText,
  productCategories,
}: IRenderComponentByRoute) => {
  const location = useLocation();
  let pathName = location.pathname;
  if (pathName.length > 1 && pathName.endsWith("/")) {
    pathName = pathName.slice(0, pathName.lastIndexOf("/"));
  }
  return (
    <div>
      {pathName === sidebar && (
        <ProductList
          categorisedProduct={productOfCategory}
          searchText={searchText}
          categories={productCategories}
        />
      )}
    </div>
  );
};

export default RenderComponentByRoute;
