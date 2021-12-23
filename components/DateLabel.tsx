type DateLabelProps = {
  label: string;
  date: string;
};

export default function DateLabel({ label, date }: DateLabelProps) {
  return <>{`${label}${new Date(date).toLocaleString()}`}</>;
}
