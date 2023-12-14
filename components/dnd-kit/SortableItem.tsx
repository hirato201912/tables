import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UniqueIdentifier } from "@dnd-kit/core";
import Item from "./Item";

interface SortableItemProps {
  id: UniqueIdentifier;
  data: string; // この型は `data` の内容に応じて変更してください
}

const SortableItem: React.FC<SortableItemProps> = ({ id, data,schoolName,grade,subject }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
    >
      <Item  id={id} data={data} schoolName={schoolName} grade={grade} subject={subject} />
    </div>
  );
};


export default SortableItem;

