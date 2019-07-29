import ReactGA from "react-ga";

export function googleEvent(title) {
  ReactGA.event({
    category: "Games",
    action: `New Round - ${title}`,
    label: title,
  });
}
