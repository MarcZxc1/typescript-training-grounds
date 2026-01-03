type ApiResponse =
  | { status: "success "; data: string }
  | { status: "error"; message: string };

function handleResponse(response: ApiResponse): string {
  if (response.status === "success ") {
    return `Success: ${response.data}`;
  } else {
    return `Error: ${response.message}`;
  }
}

const goodResponse: ApiResponse = {
  status: "success ",
  data: "User profile loaded",
};

const badResponse: ApiResponse = {
  status: "error",
  message: "User not found Status 404",
};

console.log(handleResponse(goodResponse));
console.log(handleResponse(badResponse));
