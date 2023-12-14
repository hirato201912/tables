import { UniqueIdentifier } from "@dnd-kit/core";

const Item = ({ id,student_id,name,schoolName,grade,subject_1,subject_2 }: { id: UniqueIdentifier }) => {

  return (
    <div className="w-full flex flex-col items-center justify-center my-2.5 border border-black rounded-lg text-xs p-2">
    <div> {student_id}</div>
    <div> {name}</div>
    <div> {schoolName}{grade}</div>
    <div> {subject_1}{subject_2}</div>
  </div>
  );
};
export default Item;
