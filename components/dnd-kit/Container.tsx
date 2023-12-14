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
import StudentDataGenerator from "./StudentDataGenerator";

interface Item {
  id: string;
  student_id: number;
  name: string;
  schoolName: string;
  grade: string;
  subject_1: string;
  subject_2: string;
}


const Contaienr = () => {
  // ドラッグ&ドロップでソート可能なリスト
 
  const initialItems = {
    container1: [
      {
        id: "S1001",
        student_id: "001",
        name: "山田ユウキ",
        schoolName: "竜中",
        grade: "1年",
        subject_1: "数",
        subject_2: "理"
      },
      {
        id: "S1002",
        student_id: "002",
        name: "中村サトシ",
        schoolName: "竜中",
        grade: "1年",
        subject_1: "英",
        subject_2: "社"
      },
      {
        id: "S1003",
        student_id: "003",
        name: "小林アキラ",
        schoolName: "竜中",
        grade: "2年",
        subject_1: "体",
        subject_2: "音"
      }
    ],
    container2: [
      {
        id: "S2001",
        student_id: "001",
        name: "佐藤タカヒロ",
        schoolName: "竜中",
        grade: "1年",
        subject_1: "社",
        subject_2: "体"
      },
      {
        id: "S2002",
        student_id: "002",
        name: "鈴木ハルカ",
        schoolName: "竜中",
        grade: "1年",
        subject_1: "理",
        subject_2: "美"
      },
      {
        id: "S2003",
        student_id: "003",
        name: "田中リョウタ",
        schoolName: "竜中",
        grade: "2年",
        subject_1: "数",
        subject_2: "英"
      }
    ],
    container3: [
      {
        id: "S3001",
        student_id: "001",
        name: "伊藤ユウマ",
        schoolName: "竜中",
        grade: "1年",
        subject_1: "音",
        subject_2: "歴"
      },
      {
        id: "S3002",
        student_id: "002",
        name: "渡辺ミユキ",
        schoolName: "竜中",
        grade: "1年",
        subject_1: "国",
        subject_2: "地"
      },
      {
        id: "S3003",
        student_id: "003",
        name: "中村アキラ",
        schoolName: "竜中",
        grade: "2年",
        subject_1: "体",
        subject_2: "数"
      }
    ],
    container4: [] 
  };

  const handleAddStudent = (newStudent) => {
    setItems(prev => {
      // 新しい生徒を適切なコンテナ（例えば container4）に追加
      return {
        ...prev,
        container4: [...prev.container4, newStudent]
      };
    });
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
    const activeId = active.id;
    //ドロップした場所にあったリソースのid
    const overId = over?.id;
  
    if (!overId) return;

  // ドラッグ、ドロップ時のコンテナ取得
  const activeContainer = findContainer(activeId);
  const overContainer = findContainer(overId);

  if (!activeContainer || !overContainer) return;

 // アクティブなアイテムとインデックスを取得
  const activeItem = items[activeContainer].find(item => item.id === activeId);
  const activeIndex = items[activeContainer].findIndex(item => item.id === activeId);
  const overIndex = items[overContainer].findIndex(item => item.id === overId);

  if (activeContainer === overContainer) {
    // 同じコンテナ内での移動
    setItems(prev => ({
      ...prev,
      [activeContainer]: arrayMove(prev[activeContainer], activeIndex, overIndex)
    }));
  } else {
      // 異なるコンテナ間での移動
    setItems(prev => ({
      ...prev,
      [activeContainer]: prev[activeContainer].filter(item => item.id !== activeId),
      [overContainer]: [
        ...prev[overContainer].slice(0, overIndex),
        activeItem,
        ...prev[overContainer].slice(overIndex)
      ]
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
 <span className="text-lg">Group 1</span>
    <div className="flex flex-row">
      <SortableContainer id="container1" items={items.container1} label="1" />
      <SortableContainer id="container2" items={items.container2} label="2" />
      <SortableContainer id="container3" items={items.container3} label="3" />
      <SortableContainer id="container4" items={items.container4} label="4" />
    </div>
    <span className="text-lg  ">Group 1</span>
    <span className="text-lg  ">A-B</span>
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
   <div className="student-data-generator">
  <StudentDataGenerator onStudentCreate={handleAddStudent} />
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
