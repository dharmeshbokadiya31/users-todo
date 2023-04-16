const { snackbar } = require("tailwind-toast");

export const LIMIT = 10

export const successMessage = (msg) => {
    snackbar()
    .success("", msg)
    .with({
      color: "bg-green-600",
      positionX: "end",
      positionY: "bottom",
      fontColor: "blue",
    })
    .show();
  }