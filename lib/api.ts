export const translate = async (data: transObj) => {
  if (data.text.trim().length > 0) {
    try {
      const response = await fetch("/api/trans", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const apiResponse = await response.json();
      return apiResponse;
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  return;
};
