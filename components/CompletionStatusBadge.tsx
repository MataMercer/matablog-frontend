import { Badge } from 'react-bootstrap';

type CompletionStatusBadgeProps = {
  completionStatus: string;
};

export default function CompletionStatusBadge(
  props: CompletionStatusBadgeProps
) {
  const { completionStatus } = props;
  switch (completionStatus) {
    case 'inProgress':
      return <Badge color="warning">In Progress</Badge>;
    case 'completed':
      return <Badge color="success">Completed</Badge>;
    case 'onHold':
      return <Badge color="secondary">On Hold</Badge>;
    default:
      return null;
  }
}
