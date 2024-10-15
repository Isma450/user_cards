import "./button.css";

export const Button = ({ onClick, isExpanded }) => {
  return <button onClick={onClick}>{isExpanded ? "➖" : "➕"}</button>;
};
