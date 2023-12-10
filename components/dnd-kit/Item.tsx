import { UniqueIdentifier } from "@dnd-kit/core";

interface ItemProps {
  id: UniqueIdentifier;
  data: string; // この型は `data` の内容に応じて変更してください
}

const Item: React.FC<ItemProps> = ({ id, data }) => {
  return (
    <div className="w-full h-[50px] flex flex-col items-center justify-center my-2.5 border border-black rounded-lg text-xss p-2">
    <div>{id}</div>
    <div>{data}</div>
  </div>
  
  );
};

export default Item;
