import React, { useReducer } from "react";
import { Form } from "semantic-ui-react";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const initialState = {
  name: "",
  email: "",
  text: "",
  isLoading: false,
  message: "",
  status: null,
};

const reducer = (state, action) => {
  const { type, name, email, text, bool, message, status } = action;
  switch (type) {
    case "Change_Name":
      return { ...state, name };
    case "Change_Email":
      return { ...state, email };
    case "Change_Text":
      return { ...state, text };
    case "Set_Loader":
      return { ...state, isLoading: bool };
    case "Submit_Response":
      return { ...state, isLoading: false, message, status };
    default:
      return state;
  }
};

export default function ContactForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, email, text, isLoading, message, status } = state;

  async function onSubmit(e) {
    e.preventDefault();
    dispatch({ type: "Set_Loader", bool: true });
    try {
      const { status } = await fetch("/?no-cache=1", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", name, email, text }),
      });
      if (status !== 200) throw new Error();
      const message = "Success! Email sent.";
      dispatch({ type: "Submit_Response", message, status });
    } catch (err) {
      console.log(err);
      const message = "Error. Please try again later.";
      dispatch({ type: "Submit_Response", message, status: 400 });
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <input type="hidden" name="form-name" value="contact" />
      <Form.Input
        required
        name="name"
        value={name}
        placeholder="Name"
        onChange={e => dispatch({ type: "Change_Name", name: e.target.value })}
      />
      <Form.Input
        required
        name="email"
        value={email}
        type="email"
        placeholder="Email"
        onChange={e => dispatch({ type: "Change_Email", email: e.target.value })}
      />
      <Form.TextArea
        required
        name="text"
        value={text}
        rows="5"
        placeholder="Enter your question here"
        onChange={e => dispatch({ type: "Change_Text", text: e.target.value })}
      />
      <Form.Button
        fluid
        type="submit"
        disabled={!!status}
        loading={isLoading}
        content={message || "Submit"}
        color={!status ? "blue" : status === 200 ? "green" : "red"}
      />
    </Form>
  );
}
