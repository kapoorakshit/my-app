import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "@fluentui/react-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sidebar } from "../../constants/ApplicationRoutes";
import { useFormik } from "formik";
import { LoginRequestInitialValue } from "../../initialValues/LoginRequestInitialValue";
import { LoginRequestInitialValueSchema } from "../../validationSchema/LoginRequestInitialValueSchema";
import { sendData } from "../../services/HttpServices";
import setLoginResponse from "../../services/SetLoginResponse";
import ShowErrors from "../showError/ShowError";

export default function Login() {
  const formik = useFormik({
    initialValues: LoginRequestInitialValue,
    validationSchema: LoginRequestInitialValueSchema,
    onSubmit: () => {},
  });
  const [loginDialog, setLoginDialog] = useState(true);
  const navigate = useNavigate();
  const handleLogin = async () => {
    debugger;
    if (formik.values.username && formik.values.password) {
      const data = { ...formik.values };
      const url = `auth/login`;
      const response = await sendData(url, data);
      if (response.isSuccessfull) {
        setLoginResponse(response.data);
        setLoginDialog(false);
        navigate(sidebar);
      }
    }
  };

  return (
    <>
      <div key="login-dialog">
        <Dialog open={loginDialog} key="dialogForLogin">
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Enter your Credentials</DialogTitle>
              <DialogContent>
                <div>
                  <div>
                    <Label>Enter Username</Label>
                    <br />
                    <Input
                      placeholder="Enter your Email"
                      {...formik.getFieldProps("username")}
                      style={{ width: "100%" }}
                    />
                    <ShowErrors
                      touched={formik.touched.username}
                      error={formik.errors.username}
                    />
                  </div>
                  <br />
                  <div>
                    <Label>Enter your Password</Label>
                    <br />
                    <Input
                      type="password"
                      placeholder="Enter your Password"
                      {...formik.getFieldProps("password")}
                      style={{ width: "100%" }}
                    />
                    <ShowErrors
                      touched={formik.touched.password}
                      error={formik.errors.password}
                    />
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="primary" onClick={handleLogin}>
                    Login
                  </Button>
                </DialogTrigger>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </div>
    </>
  );
}
