// src/utils/apiResponse.ts

export const success = (data: any, message = "Success") => {
  return {
    status: "success",
    message,
    data
  };
};

export const error = (message = "Error", status = 400, errors: any = null) => {
  return {
    status: "error",
    message,
    statusCode: status,
    errors
  };
};
