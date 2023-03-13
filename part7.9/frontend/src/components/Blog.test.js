import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog.js";

describe("<Blog />", () => {
  const blog = {
    title: "Meika",
    author: "Poika",
    url: "youtube",
    likes: "2",
    user: {
      username: "kayttajanimi",
      name: "nimi",
    },
    id: "63d8b87420b931ef15b0b851",
  };
  const mockHandler = jest.fn();
  let component;
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    component = render(<Blog blog={blog} addLike={mockHandler} />);
  });

  test("renders title", () => {
    screen.queryByText(blog.title);
  });
  test("renders details", async () => {
    const user = userEvent.setup();
    const button = screen.queryByText("show");
    await user.click(button);

    // eslint-disable-next-line testing-library/no-node-access
    const blogDetails = component.container.querySelector("#extra");
    expect(blogDetails).toBeInTheDocument();
  });
  test("when like button is clicked twice it calls the function twice", async () => {
    const user = userEvent.setup();
    const view = screen.getByText("show");
    await user.click(view);
    const like = screen.getByText("Like");
    await user.click(like);
    await user.click(like);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
