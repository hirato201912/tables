import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import SortableContainer from "./SortableContainer";
import Item from "./Item";

interface Items {
  [key: string]: { id: string; data: string; }[];
}

const Contaienr = () => {
  // ドラッグ&ドロップでソート可能なリスト
 
  const initialItems = {
    container1: [
      { id: "A", data: "データ1" },
      { id: "B", data: "データ2" },
      { id: "C", data: "データ3" }
    ],
    container2: [
      { id: "D", data: "データ4" },
      { id: "E", data: "データ5" },
      { id: "F", data: "データ6" }
    ],
    container3: [
      { id: "G", data: "データ7" },
      { id: "H", data: "データ8" },
      { id: "I", data: "データ9" }
    ],
    container4: []
  };

   const [items, setItems] = useState<Items>(initialItems);
  

  //DragOverlay用のid
  const [activeId, setActiveId] = useState<UniqueIdentifier>();

  // ドラッグの開始、移動、終了などにどのような入力を許可するかを決めるprops
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  //各コンテナ取得関数
  const findContainer = (id: UniqueIdentifier) => {
    return Object.keys(items).find((key) =>
      items[key].some(item => item.id === id)
    );
  };
  

  // ドラッグ開始時に発火する関数
  const handleDragStart = (event: DragStartEvent) => {
    console.log("Dragged Item ID:", event);
    const { active } = event;
    //ドラッグしたリソースのid
    const id = active.id.toString();
  
    setActiveId(id);
  };

  //ドラッグ可能なアイテムがドロップ可能なコンテナの上に移動時に発火する関数
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    //ドラッグしたリソースのid
    const id = active.id.toString();
    //ドロップした場所にあったリソースのid
    const overId = over?.id;

    if (!overId) return;

    // ドラッグ、ドロップ時のコンテナ取得
    // container1,container2,container3,container4のいずれかを持つ
    const activeContainer = findContainer(id);
    const overContainer = findContainer(over?.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      // 移動元のコンテナの要素配列を取得
      const activeItems = prev[activeContainer];
      // 移動先のコンテナの要素配列を取得
      const overItems = prev[overContainer];
    
      // アクティブなアイテムのインデックスとアイテム自体を取得
      const activeItem = activeItems.find(item => item.id === active.id);
      const activeIndex = activeItems.findIndex(item => item.id === active.id);
      const overIndex = overItems.findIndex(item => item.id === overId);
    
      // 新しいインデックスを計算
      let newIndex;
      if (overId in prev) {
        newIndex = overItems.length;
      } else {
        const isBelowLastItem = over && overIndex === overItems.length - 1;
        const modifier = isBelowLastItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length;
      }
    
      // 新しいアイテムの配列を生成
      return {
        ...prev,
        [activeContainer]: prev[activeContainer].filter(item => item.id !== active.id),
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          activeItem,
          ...prev[overContainer].slice(newIndex)
        ],
      };
    });
    
  };

  // ドラッグ終了時に発火する関数
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    //ドラッグしたリソースのid
    const id = active.id.toString();
    //ドロップした場所にあったリソースのid
    const overId = over?.id;

    if (!overId) return;

    // ドラッグ、ドロップ時のコンテナ取得
    // container1,container2,container3,container4のいずれかを持つ
    const activeContainer = findContainer(id);
    const overContainer = findContainer(over?.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    // 配列のインデックス取得
    const activeIndex = items[activeContainer].indexOf(id);
    const overIndex = items[overContainer].indexOf(overId.toString());

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }
    setActiveId(undefined);
  };

  return (
    <div className="flex flex-row mx-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div>
       {/* 上部のコンテナグループ */}
<div className="flex flex-row  mt-5 mb-4 border-gray-300 rounded-md bg-red-100">
  {/* 各グループのコンテナ */}
 {/* 最初のグループ */}
 <div className="flex flex-col items-center mr-4">
 <span className="text-lg font-bold">Group 9999999</span>
    <div className="flex flex-row">
      <SortableContainer id="container1" items={items.container1} label="1" />
      <SortableContainer id="container2" items={items.container2} label="2" />
      <SortableContainer id="container3" items={items.container3} label="3" />
    </div>
    <span className="text-lg font-bold ">Group 1</span>
    <span className="text-lg font-bold ">AB</span>
  </div>

  {/* 二番目のグループ */}
  {/* <div className="flex flex-col items-center mr-4">
    <span className="text-lg font-bold">Group 2</span>
    <div className="flex flex-row">
      <SortableContainer id="container3" items={items.container3} label="3" />
      <SortableContainer id="container4" items={items.container4} label="4" />
    </div>
    <span className="text-lg font-bold">Group 2</span>
    <span className="text-lg font-bold ">AB</span>
  </div> */}
    {/* 追加のグループ */}

    {/* <div className="flex flex-col items-center mr-4">
      <span className="text-lg font-bold">Group 3</span>
      <div className="flex flex-row">
        <SortableContainer id="container5" items={items.container5} label="5" />
        <SortableContainer id="container6" items={items.container6} label="6" />
      </div>
      <span className="text-lg font-bold ">Group 3</span>
      <span className="text-lg font-bold ">AB</span>
    </div> */}


    {/* <div className="flex flex-col items-center mr-4">
      <span className="text-lg font-bold">Group 4</span>
      <div className="flex flex-row">
        <SortableContainer id="container7" items={items.container7} label="7" />
        <SortableContainer id="container8" items={items.container8} label="8" />
      </div>
      <span className="text-lg font-bold">Group 4</span>
      <span className="text-lg font-bold ">AB</span>
    </div> */}



    {/* <div className="flex flex-col items-center mr-4">
      <span className="text-lg font-bold">Group 5</span>
  <div className="flex flex-row">
    <SortableContainer id="container9" items={items.container9} label="9" />
    <SortableContainer id="container10" items={items.container10} label="10" />
  </div>
  <span className="text-lg font-bold">Group 5</span>
  <span className="text-lg font-bold ">AB</span>
    </div> */}
</div>

<div className="flex flex-row  mb-4 border-gray-300 rounded-md bg-blue-100">
   {/* 日にちと曜日 */}
   <div className="flex flex-col items-center justify-center mr-8 p-4 border border-gray-300 shadow-lg rounded-md bg-white w-24 h-24 mt-20">
    <span className="text-lg font-semibold">10/05</span> {/* 日にち */}
    <span className="text-xl font-bold text-gray-600">月</span> {/* 曜日 */}
  </div>

  {/* <div className="flex flex-col items-center mr-4">
      <span className="text-lg font-bold">Group 5</span>
  <div className="flex flex-row mr-3">
    <SortableContainer id="container11" items={items.container11} label="Container 11" />
    <SortableContainer id="container12" items={items.container12} label="Container 12" />
    <SortableContainer id="container13" items={items.container13} label="Container 13" />
  </div>
  <span className="text-lg font-bold">Group 5</span>
  <span className="text-lg font-bold ">2階B教室</span>
    </div> */}

    
  {/* <div className="flex flex-col items-center mr-4">
      <span className="text-lg font-bold">Group 5</span>
  <div className="flex flex-row mr-8">
    <SortableContainer id="container14" items={items.container14} label="Container 14" />
    <SortableContainer id="container15" items={items.container15} label="Container 15" />
    <SortableContainer id="container16" items={items.container16} label="Container 16" />
  </div>

  <span className="text-lg font-bold">Group 5</span>
  <span className="text-lg font-bold ">2階A教室</span>
</div> */}
</div>



      </div>

      {/* DragOverlay */}
      <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
    </DndContext>
    </div>
  );
};

export default Contaienr;
