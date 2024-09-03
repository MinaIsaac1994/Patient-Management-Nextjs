import icons from "./icons";
export const MFFD = ({ value }) => {
  const { True, False } = icons;
  return value ? <True color={"success"} /> : <False color={"error"} />;
};
