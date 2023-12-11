import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

interface Item {
  id: string;
  data: string;
}

interface SortableContainerProps {
  id: string;
  items: Item[];
  label: string;
}

const SortableContainer: React.FC<SortableContainerProps> = ({
  id,
  items,
  label,
}) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="">
      <h3 className="text-xl font-bold text-center">{label}</h3>
      <SortableContext id={id} items={items.map(item => item.id)} strategy={rectSortingStrategy}>
        <div
          ref={setNodeRef}
          className="w-full border-2 border-gray-500/75 p-2 mt-2 rounded-md"
        >
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id} data={item.data} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default SortableContainer;
