import React from "react";
import App from "./App";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { screen, fireEvent } from "@testing-library/react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

let container: any = null;
const webserviceBaseURL = process.env.REACT_APP_EXCHANGE_WEBSERVICE_URL;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("renders both input fields", () => {
  render(<App />, container);
  const sourceInputs = screen.getAllByPlaceholderText(/from/i);
  expect(sourceInputs.shift()).toBeInTheDocument();

  const targetInputs = screen.getAllByPlaceholderText(/to/i);
  expect(targetInputs.shift()).toBeInTheDocument();
});

test("renders supported currencies", async () => {
  const axiosMock = new MockAdapter(axios);
  const fakeResponse = ["USD", "EUR"];

  axiosMock.onGet(webserviceBaseURL + "/currencies").reply(200, fakeResponse);

  await act(async () => {
    render(<App />, container);
  });

  expect(container.querySelectorAll(".sourceInput select option").length).toBe(
    fakeResponse.length
  );

  container
    .querySelectorAll(".sourceInput select option")
    .forEach((option: HTMLOptionElement, i: number) => {
      expect(option.value).toBe(fakeResponse[i]);
      expect(option.textContent).toBe(fakeResponse[i]);
    });

  axiosMock.restore();
});
