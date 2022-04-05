/* eslint-disable react/jsx-no-useless-fragment */
type DateLabelProps = {
  label: string;
  date: string;
};

export default function DateLabel({ label, date }: DateLabelProps) {
  return <div>{`${label}${new Date(date).toDateString()}`}</div>;
}
