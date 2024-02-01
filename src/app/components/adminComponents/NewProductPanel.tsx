import {
  Drawer,
  DrawerHeader,
  DrawerHeaderNavigation,
  Option,
  DrawerHeaderTitle,
  DrawerBody,
  DrawerFooter,
  Button,
  Label,
  Input,
  Dropdown,
  OptionOnSelectData,
} from "@fluentui/react-components";
import { UserStyles } from "../../componentStyles/UserStyles";
import { Dismiss20Filled } from "@fluentui/react-icons";
import { useFormik } from "formik";
import { ProductRequestTypeInitialValue } from "../../initialValues/ProductRequestTypeInitialValue";
import { ProductRequestTypeSchema } from "../../validationSchema/ProductRequestTypeSchema";
import ShowErrors from "../showError/ShowError";
import { sendData } from "../../services/HttpServices";
import { useMemo } from "react";

interface INewProductPanel {
  isOpen: boolean;
  onDismiss: () => void;
  categories: string[];
}

const NewProductPanel = ({
  isOpen,
  onDismiss,
  categories,
}: INewProductPanel) => {
  const formik = useFormik({
    initialValues: ProductRequestTypeInitialValue,
    validationSchema: ProductRequestTypeSchema,
    onSubmit: () => {},
  });
  const userStyles = UserStyles();

  const categoryOptions = useMemo(() => {
    return categories.map((obj: string, index: number) => (
      <Option key={`${obj}__${index}`} value={obj} text={obj}>
        {obj}
      </Option>
    ));
  }, [categories]);

  const handleCategoryOptions = (option: OptionOnSelectData) => {
    debugger;
    formik.setFieldValue("category", option.selectedOptions);
  };

  const handleSubmit = async () => {
    if (
      formik.values.title &&
      formik.values.description &&
      formik.values.brand &&
      formik.values.category &&
      formik.values.discountPercentage &&
      formik.values.rating &&
      formik.values.stock &&
      formik.values.price
    ) {
      debugger;
      const data = { ...formik.values };
      const url = `products/add`;
      const response = await sendData(url, data);
      if (response.isSuccessfull) {
        onDismiss();
      }
    }
  };

  const onRenderFooterContent = () => {
    return (
      <div>
        <Button
          style={{ backgroundColor: "darkblue", color: "white" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    );
  };

  const onRenderContent = () => {
    return (
      <>
        <div>
          <div>
            <Label>Enter Product Name:</Label>
            <br />
            <Input
              placeholder="Enter product name"
              className={userStyles.w100}
              {...formik.getFieldProps("title")}
            />
            <ShowErrors
              touched={formik.touched.title}
              error={formik.errors.title}
            />
          </div>
          <div>
            <Label>Enter product description:</Label>
            <br />
            <Input
              placeholder="Enter product description"
              className={userStyles.w100}
              {...formik.getFieldProps("description")}
            />
            <ShowErrors
              touched={formik.touched.description}
              error={formik.errors.description}
            />
          </div>
          <div>
            <Label>Enter price:</Label>
            <br />
            <Input
              placeholder="Enter product price"
              className={userStyles.w100}
              {...formik.getFieldProps("price")}
            />
            <ShowErrors
              touched={formik.touched.price}
              error={formik.errors.price}
            />
          </div>
          <div>
            <Label>Enter discount percentage:</Label>
            <br />
            <Input
              placeholder="Enter discount percentage"
              className={userStyles.w100}
              {...formik.getFieldProps("discountPercentage")}
            />
            <ShowErrors
              touched={formik.touched.discountPercentage}
              error={formik.errors.discountPercentage}
            />
          </div>
          <div>
            <Label>Enter rating:</Label>
            <br />
            <Input
              placeholder="Enter rating"
              className={userStyles.w100}
              {...formik.getFieldProps("rating")}
            />
            <ShowErrors
              touched={formik.touched.rating}
              error={formik.errors.rating}
            />
          </div>
          <div>
            <Label>Enter stock:</Label>
            <br />
            <Input
              placeholder="Enter stock"
              className={userStyles.w100}
              {...formik.getFieldProps("stock")}
            />
            <ShowErrors
              touched={formik.touched.stock}
              error={formik.errors.stock}
            />
          </div>
          <div>
            <Label>Enter brand:</Label>
            <br />
            <Input
              placeholder="Enter brand"
              className={userStyles.w100}
              {...formik.getFieldProps("brand")}
            />
            <ShowErrors
              touched={formik.touched.brand}
              error={formik.errors.brand}
            />
          </div>
          <div>
            <Label>Enter category:</Label>
            <br />
            <Dropdown
              placeholder="Enter category"
              multiselect={true}
              className={userStyles.w100}
              onOptionSelect={(_e, option) => {
                //formik.setFieldValue("category", option.optionValue);
                handleCategoryOptions(option);
              }}
            >
              {categoryOptions}
            </Dropdown>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Drawer
        separator
        type={"overlay"}
        position="end"
        open={isOpen}
        style={{
          position: "fixed",
          right: "0px",
          top: "0px",
          height: "100vh",
          zIndex: 999999,
          backgroundColor: "white",
          width: "600px",
        }}
      >
        <DrawerHeader>
          <DrawerHeaderNavigation>
            <DrawerHeaderTitle
              action={
                <Button
                  appearance="subtle"
                  aria-label="Close"
                  icon={<Dismiss20Filled />}
                  onClick={onDismiss}
                />
              }
            >
              Add Product
            </DrawerHeaderTitle>
          </DrawerHeaderNavigation>
        </DrawerHeader>

        <DrawerBody style={{ backgroundColor: "white", paddingLeft: "16px" }}>
          {onRenderContent()}
        </DrawerBody>
        <DrawerFooter>{onRenderFooterContent()}</DrawerFooter>
      </Drawer>
    </>
  );
};

export default NewProductPanel;
