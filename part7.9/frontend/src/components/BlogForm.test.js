/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const user = userEvent.setup();
  const createBlog = jest.fn();
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const component = render(<BlogForm createBlog={createBlog} />);
  const titleInput = component.container.querySelector("input[name='title']");
  const authorInput = component.container.querySelector("input[name='author']");
  const urlInput = component.container.querySelector("input[name='url']");
  const sendButton = screen.getByText("Create");

  await user.type(titleInput, "title");
  await user.type(authorInput, "author");
  await user.type(urlInput, "https://www.test.com");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].content).toBe("title");
  expect(createBlog.mock.calls[0][1].content).toBe("author");
  expect(createBlog.mock.calls[0][2].content).toBe("https://www.test.com");
});
