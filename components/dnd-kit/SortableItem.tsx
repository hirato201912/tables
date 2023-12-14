import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UniqueIdentifier } from "@dnd-kit/core";
import Item from "./Item";

interface SortableItemProps {
  id: UniqueIdentifier;
  student_id: string;
  name: string;

  schoolName: string;
  grade: string;
  subject_1: string;
  subject_2: string;
}

const SortableItem: React.FC<SortableItemProps> = ({ 
  id, 
  student_id,
  name, 
  schoolName, 
  grade, 
  subject_1, 
  subject_2 
}) => {

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  return (
 
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
    >
      <Item 
        id={id} 
        student_id={student_id}
        name={name} 
   
        schoolName={schoolName} 
        grade={grade} 
        subject_1={subject_1} 
        subject_2={subject_2} 
      />
    </div>
  );
};

export default SortableItem;


