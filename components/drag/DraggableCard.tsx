import React, { useRef, MouseEvent } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { XYCoord, Identifier } from 'dnd-core';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export interface CardProps<T> {
  id: any;
  data: T;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  cardComponent: React.ComponentType<T>;
  onDeleteClick: (arg0: MouseEvent<HTMLButtonElement>) => void;
}

const StyledCard = styled.div<{ opacity: number }>`
  border: '1px dashed gray';
  padding: '0.5rem 1rem';
  marginbottom: '.5rem';
  backgroundcolor: 'white';
  opacity: ${(props) => props.opacity};
  cursor: 'move';
`;

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const ItemTypes = {
  CARD: 'card',
};
export function Card<T>({
  id,
  data,
  index,
  moveCard,
  cardComponent,
  onDeleteClick,
}: CardProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const CardComponent = cardComponent as any;
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <StyledCard opacity={opacity} ref={ref} data-handler-id={handlerId}>
      <CardComponent {...data} />
      <Button variant="danger" value={id} onClick={onDeleteClick}>
        x
      </Button>
    </StyledCard>
  );
}
