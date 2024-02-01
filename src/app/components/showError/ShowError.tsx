import React from "react";
import { UserStyles } from "../../componentStyles/UserStyles";

interface IShowError {
  touched: boolean | undefined;
  error: string | undefined;
}

const ShowErrors = ({ touched, error }: IShowError) => {
  const userStyles = UserStyles();
  return touched && error !== "" ? (
    <div className={userStyles.colorError}>{error}</div>
  ) : null;
};

export default ShowErrors;
