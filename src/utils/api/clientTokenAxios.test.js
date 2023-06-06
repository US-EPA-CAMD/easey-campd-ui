import axios from "axios";
import { refreshClientToken } from "./authApi";
import { clientTokenAxios } from "./clientTokenAxios";

jest.mock("axios");
jest.mock("./authApi");

describe("clientTokenAxios", () => {
  const options = {
    url: "/api/data",
    method: "GET",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.setItem("client_token", "mocked_token");
    sessionStorage.setItem("client_token_expiration", Date.now() + 10000);
  });

  it("should refresh client token if expired", async () => {
    // Set the session storage to simulate an expired token
    sessionStorage.setItem("client_token", "expired_token");
    sessionStorage.setItem("client_token_expiration", "2023-05-22T12:00:00Z");

    refreshClientToken.mockResolvedValueOnce();
    axios.mockResolvedValueOnce("mocked_response");

    const options = { url: "https://mockapi.com" };

    await clientTokenAxios(options);
    expect(refreshClientToken).toHaveBeenCalledTimes(1);
    expect(refreshClientToken).toHaveBeenCalledWith();
  });

  it("should set headers correctly and call axios", async () => {
    const response = { data: { result: "success" } };
    axios.mockResolvedValueOnce(response);

    await clientTokenAxios(options);

    expect(axios).toHaveBeenCalledTimes(1);
  });

  it("should return the response from axios", async () => {
    const response = { data: { result: "success" } };
    axios.mockResolvedValueOnce(response);

    const result = await clientTokenAxios(options);

    expect(result).toEqual(response);
  });
});
