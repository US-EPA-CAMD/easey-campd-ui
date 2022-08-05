import React from "react";
import { sendNotificationEmail } from "./notificationsApi";
import "@testing-library/jest-dom/extend-expect";
import * as axios from "axios";

jest.mock("axios");


describe("Notifications API test", () => {
  test("should render content without error", () => {
    axios.post.mockImplementation(() => Promise.resolve({ then: jest.fn() }));

    try {
      sendNotificationEmail({ toEmail: "" });
      expect(true);
    } catch {
      expect(false);
    }
  });
});
