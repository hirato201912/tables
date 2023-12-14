import { UniqueIdentifier } from "@dnd-kit/core";

const Item = ({ id,data,schoolName,grade,subject }: { id: UniqueIdentifier }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center my-2.5 border border-black rounded-lg text-xs p-2">
    <div> {id}</div>
    <div> {data}</div>
    <div> {schoolName}{grade}</div>
    <div> {subject}</div>
  </div>
  );
};
export default Item;
