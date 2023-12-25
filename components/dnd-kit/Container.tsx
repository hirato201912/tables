import React, { useState,useEffect } from "react";
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
import TeacherNameInput from "./TeacherNameInput";
import TeacherSelectInput from "./TeacherSelectInput";

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

  const [selectedTeacherIds, setSelectedTeacherIds] = useState('');
  const [teachers, setTeachers] = useState([]);


  const [teacherPositions, setTeacherPositions] = useState({});

  const [items, setItems] = useState({
    container1: [],
    container2: [],
    container3: [],
    container4: [],
    container5: [],
    container6: [],
    container7: [],
    container8: [],
    container9: [],
    container10: [],
    container11: [],
    container12: [],
    container13: [],
    container14: [],
    container15: [],
    container16: []
  });
  
  const [activeId, setActiveId] = useState(null);
  const [teacherName1, setTeacherName1] = useState('');
  const [teacherName2, setTeacherName2] = useState('');
  const [teacherName3, setTeacherName3] = useState('');
  const [teacherName4, setTeacherName4] = useState('');
  const [teacherName5, setTeacherName5] = useState('');
  const [teacherName6, setTeacherName6] = useState('');
  const [teacherName7, setTeacherName7] = useState('');
  const [teacherName8, setTeacherName8] = useState('');
  const [teacherName9, setTeacherName9] = useState('');
  const [teacherName10, setTeacherName10] = useState('');
  const [teacherName11, setTeacherName11] = useState('');
  const [teacherName12, setTeacherName12] = useState('');
  const [teacherName13, setTeacherName13] = useState('');
  const [teacherName14, setTeacherName14] = useState('');
  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await fetch('http://localhost/fetch_teachers.php');
      const data = await response.json();
      setTeachers(data);
      // 各セレクトボックスの初期値を設定
      const initialSelections = {};
      data.forEach(teacher => {
        initialSelections[teacher.id] = teacher.id; // 例：{ 1: 1, 2: 2, ... }
      });
      setSelectedTeacherIds(initialSelections);
    };

    fetchTeachers();
  }, []);



  // データをフェッチする関数
  const fetchStudentData = async () => {
    try {
      const response = await fetch('http://localhost/fetch_students.php'); // 適切なURLに変更してください
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // データをコンテナごとに整理する
      const organizedData = data.reduce((acc, student) => {
        const container = student.container || 'container16'; // コンテナが未割り当ての場合は 'container16' に入れる
        if (!acc[container]) {
          acc[container] = [];
        
        }
        acc[container].push(student);
        return acc;
      }, {});

      setItems(organizedData); // 整理したデータを状態に設定
      console.log('organizedData:',organizedData); // データの構造を確認

    } catch (error) {
      console.error('Fetch error:', error);
    }
  };


  // コンポーネントのマウント時にデータをフェッチ
  useEffect(() => {
    fetchStudentData();
    
  }, []);



   // 講師名と表示位置を取得する関数
   const fetchTeacherPositions = async () => {
    try {
      const response = await fetch('http://localhost/teacher_positions.php');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      data.forEach(item => {
        switch (item.position_label) {
          case 'teacherName1':
            setTeacherName1(item.name);
            break;
          case 'teacherName2':
            setTeacherName2(item.name);
            break;
          case 'teacherName3':
            setTeacherName3(item.name);
            break;
          case 'teacherName4':
            setTeacherName4(item.name);
            break;
            case 'teacherName5':
              setTeacherName5(item.name);
              break;
            case 'teacherName6':
              setTeacherName6(item.name);
              break;
            case 'teacherName7':
              setTeacherName7(item.name);
              break;
            case 'teacherName8':
              setTeacherName8(item.name);
              break;
            case 'teacherName9':
              setTeacherName9(item.name);
              break;
          case 'teacherName10':
            setTeacherName10(item.name);
            break;
          default:
            // 何もしない
        }
      });
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };


   // コンポーネントのマウント時にデータをフェッチ
   useEffect(() => {
    fetchTeacherPositions();
  }, []);


  const updateTeacherName = async (positionLabel, teacherId) => {
    try {
      await fetch('http://localhost/update_teacher_name.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          positionLabel: positionLabel,
          teacherId: teacherId
        })
      });
    } catch (error) {
      console.error('Error updating teacher name:', error);
    }
  };

  
  



  const handleAddStudent = (newStudent) => {
    setItems(prev => {
      // 新しい生徒を適切なコンテナ（例えば container11）に追加
      return {
        ...prev,
        container11: [...(prev.container11 || []), newStudent]  // prev.container16 が未定義の場合は空の配列を使用
      };
    });
  };
  

  //  const [items, setItems] = useState<Items>(initialItems);
  

  //DragOverlay用のid
  // const [activeId, setActiveId] = useState<UniqueIdentifier>();

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
const handleDragEnd = async (event: DragEndEvent) => {
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

  // コンテナ内の要素の数をチェック
  const activeItems = items[activeContainer];
  if (activeItems.length <= 1) {
    console.log("Cannot move the last item from the container");
    return; // 最後の要素を移動させない
  }

  // アクティブなアイテムとインデックスを取得
  const activeItem = items[activeContainer].find(item => item.id === activeId);
  const activeIndex = items[activeContainer].findIndex(item => item.id === activeId);
  const overIndex = items[overContainer].findIndex(item => item.id === overId);


  // サーバーに更新を通知
  try {
    await fetch('http://localhost/update_container_assignment.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: activeId,
        newContainer: overContainer,
        newPosition: overIndex // 新しい位置のインデックス
      })
    });
  } catch (error) {
    console.error('Error updating the container assignment:', error);
  }



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
 <div className="flex flex-col items-center">
 <TeacherSelectInput
        selectedTeacherId={teacherName1}
        setSelectedTeacherId={setTeacherName1}
        teachers={teachers}
        positionLabel="teacherName1"
        updateTeacherName={updateTeacherName}
      />

  {/* 教師の名前とコンテナを包含する親要素 */}
  <div className="flex flex-row justify-center items-end">
    {/* 教師の名前を表示する要素と、コンテナを含む子要素 */}
    <div className="flex flex-col items-center mx-0">
    
    <SortableContainer id="container1" items={items.container1 || []} label="A" />



    </div>
    <div className="flex flex-col items-center mx-0">
  

<SortableContainer id="container2" items={items.container2 || []} label="B" />


    </div>
  </div>
  
      <TeacherNameInput
        value={teacherName2}
        onChange={(e) => setTeacherName2(e.target.value)}
        placeholder="講師名2"
      />
      {/* 他の講師名入力フィールドも同様に追加 */}
</div>






<div className="flex flex-col items-center">
 <TeacherNameInput
        value={teacherName3}
        onChange={(e) => setTeacherName3(e.target.value)}
        placeholder="講師名3"
      />

  {/* 教師の名前とコンテナを包含する親要素 */}
  <div className="flex flex-row justify-center items-end">
    {/* 教師の名前を表示する要素と、コンテナを含む子要素 */}
    <div className="flex flex-col items-center mx-0">
    <div className="ml-3">
    <SortableContainer id="container3" items={items.container3 || []} label="A" />


    </div>

    </div>
    <div className="flex flex-col items-center mx-0">
  

<SortableContainer id="container4" items={items.container4 || []} label="B" />


    </div>
  </div>
  
      <TeacherNameInput
        value={teacherName4}
        onChange={(e) => setTeacherName4(e.target.value)}
        placeholder="講師名4"
      />
      {/* 他の講師名入力フィールドも同様に追加 */}
</div>










<div className="flex flex-col items-center">
 <TeacherNameInput
        value={teacherName5}
        onChange={(e) => setTeacherName5(e.target.value)}
        placeholder="講師名5"
      />

  {/* 教師の名前とコンテナを包含する親要素 */}
  <div className="flex flex-row justify-center items-end">
    {/* 教師の名前を表示する要素と、コンテナを含む子要素 */}
    <div className="flex flex-col items-center mx-0">
    
  <div className="ml-4">
    <SortableContainer id="container5" items={items.container5 || []} label="A" />
    </div>


    </div>
    <div className="flex flex-col items-center mx-0">
  

<SortableContainer id="container6" items={items.container6 || []} label="B" />


    </div>
  </div>
  
      <TeacherNameInput
        value={teacherName6}
        onChange={(e) => setTeacherName6(e.target.value)}
        placeholder="講師名6"
      />
      {/* 他の講師名入力フィールドも同様に追加 */}
</div>






<div className="flex flex-col items-center">
 <TeacherNameInput
        value={teacherName7}
        onChange={(e) => setTeacherName7(e.target.value)}
        placeholder="講師名7"
      />

  {/* 教師の名前とコンテナを包含する親要素 */}
  <div className="flex flex-row justify-center items-end">
    {/* 教師の名前を表示する要素と、コンテナを含む子要素 */}
    <div className="flex flex-col items-center mx-0">
    <div className="ml-3">
    <SortableContainer id="container7" items={items.container7 || []} label="A" />

    </div>

    </div>
    <div className="flex flex-col items-center mx-0">
  

<SortableContainer id="container8" items={items.container8 || []} label="B" />


    </div>
  </div>
  
      <TeacherNameInput
        value={teacherName8}
        onChange={(e) => setTeacherName8(e.target.value)}
        placeholder="講師名8"
      />
      {/* 他の講師名入力フィールドも同様に追加 */}
</div>




<div className="flex flex-col items-center">
 <TeacherNameInput
        value={teacherName9}
        onChange={(e) => setTeacherName9(e.target.value)}
        placeholder="講師名9"
      />

  {/* 教師の名前とコンテナを包含する親要素 */}
  <div className="flex flex-row justify-center items-end">
    {/* 教師の名前を表示する要素と、コンテナを含む子要素 */}
    <div className="flex flex-col items-center mx-0">
    


    
    <div className="ml-3">
    <SortableContainer id="container9" items={items.container9 || []} label="A" />
    </div>


    </div>
    <div className="flex flex-col items-center mx-0">
  

<SortableContainer id="container10" items={items.container10 || []} label="B" />

    </div>
  </div>
  
      <TeacherNameInput
        value={teacherName10}
        onChange={(e) => setTeacherName10(e.target.value)}
        placeholder="講師名10"
      />
      {/* 他の講師名入力フィールドも同様に追加 */}
</div>








</div>

<div className="flex flex-row  mb-4 border-gray-300 rounded-md bg-blue-100">
   {/* 日にちと曜日 */}
   <div className="student-data-generator">
  <StudentDataGenerator onStudentCreate={handleAddStudent} />
</div>








    
  <div className="flex flex-col items-center mr-4">
  <TeacherNameInput
        value={teacherName11}
        onChange={(e) => setTeacherName11(e.target.value)}
        placeholder="講師名11"
      />
  <div className="flex flex-row mr-8">
    <SortableContainer id="container11" items={items.container11|| []} label="A" />
    <SortableContainer id="container12" items={items.container12|| []} label="B" />
    <SortableContainer id="container13" items={items.container13|| []} label="C" />
  </div>

  <TeacherNameInput
        value={teacherName12}
        onChange={(e) => setTeacherName12(e.target.value)}
        placeholder="講師名12"
      />
  <span className="text-lg font-bold ">2階B教室</span>
</div> 


<div className="flex flex-col items-center mr-4">
  <TeacherNameInput
        value={teacherName13}
        onChange={(e) => setTeacherName13(e.target.value)}
        placeholder="講師名13"
      />
  <div className="flex flex-row mr-8">
    <SortableContainer id="container14" items={items.container14|| []} label="A" />
    <SortableContainer id="container15" items={items.container15|| []} label="B" />
    <SortableContainer id="container16" items={items.container16|| []} label="C" />
  </div>

  <TeacherNameInput
        value={teacherName14}
        onChange={(e) => setTeacherName14(e.target.value)}
        placeholder="講師名14"
      />
  <span className="text-lg font-bold ">2階A教室</span>
</div> 


</div>



      </div>
      

      {/* DragOverlay */}
      <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
    </DndContext>
    </div>
    
  );
};

export default Contaienr;
