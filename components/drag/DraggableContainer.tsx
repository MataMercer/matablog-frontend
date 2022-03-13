import React, {
  FC,
  useState,
  useCallback,
  ReactComponentElement,
  MouseEvent,
  useEffect,
} from 'react';
import update from 'immutability-helper';
import { Card } from './DraggableCard';

const style = {
  width: 400,
};

export interface Item<T> {
  id: number;
  data: T;
}
export interface CardComponentInterface<T> {
  data: T;
}

interface DraggableContainerProps<T> {
  list: T[];
  setList: any;
  cardComponent: React.ComponentType<T>;
}

export function DraggableContainer<T>({
  list,
  setList,
  cardComponent,
}: DraggableContainerProps<T>) {
  const [cards, setCards] = useState<Item<T>[]>([]);

  useEffect(() => {
    setCards(list.map((el, i) => ({ id: i, data: el })));
  }, [list]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: Item<T>[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Item<T>],
        ],
      })
    );
    setList((prevList: T[]) =>
      update(prevList, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevList[dragIndex] as T],
        ],
      })
    );

    // setCards((prevCards: Item[]) => {
    //   const draggedItem = prevCards[dragIndex];
    //   prevCards.splice(dragIndex, 1);
    //   prevCards.splice(hoverIndex, 0, draggedItem as Item);
    //   console.log(prevCards);
    //   return prevCards;
    // });
  }, []);

  const renderCard = useCallback(
    (card: { id: number; data: T }, index: number) => {
      const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
        const indexToDelete = (e.target as HTMLButtonElement).value.toString();
        const newState = list.filter(
          (elem, i) => i !== parseInt(indexToDelete, 10)
        );
        setList(newState);
      };
      return (
        <Card<T>
          key={card.id}
          index={index}
          id={card.id}
          data={card.data}
          moveCard={moveCard}
          cardComponent={cardComponent}
          onDeleteClick={handleDeleteClick}
        />
      );
    },
    [cardComponent, list, moveCard, setList]
  );

  return <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>;
}
