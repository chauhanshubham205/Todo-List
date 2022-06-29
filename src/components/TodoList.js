import React, { useEffect, useState } from "react";
import "./TodoList.css";

const getLocalData = () => {
  const lists = localStorage.getItem("TodoList");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};
const TodoList = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEdit, setIsEdit] = useState();
  const [toggle, setToggle] = useState(false);

  const addItems = () => {
    if (!inputData) {
      alert("Plz Enter Data");
    } else if (inputData && toggle) {
      setItems(
        items.map((curEle) => {
          if (curEle.id === isEdit) {
            return { ...curEle, name: inputData };
          }
          return curEle;
        })
      );
      setInputData([]);
      setIsEdit();
      setToggle(false);
    } else {
      const myNewID = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewID]);
      setInputData("");
    }
  };
  const deleteItems = (index) => {
    const updatedItems = items.filter((curEle) => {
      return curEle.id !== index;
    });
    setItems(updatedItems);
  };
  // edit items

  const editItems = (index) => {
    const editedItems = items.find((curEle) => {
      return curEle.id === index;
    });
    setInputData(editedItems.name);
    setIsEdit(index);
    setToggle(true);
  };
  const removeAll = () => {
    setItems([]);
  };
  useEffect(() => {
    localStorage.setItem("TodoList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="container">
        <img src="./image/todo.svg" alt="" />
        <h1>Add Your List Here ✌</h1>
        <figure>
          <div className="box"></div>
          <input
            className="input"
            type="text"
            placeholder="✍ Add Items"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          {toggle ? (
            <i className="i fas fa-edit add-btn" onClick={addItems}></i>
          ) : (
            <i className="i fas fa-plus add-btn" onClick={addItems}></i>
          )}
          {/* <i className='i fas fa-plus add-btn' onClick={addItems}></i> */}
        </figure>

        {/*  */}
        {items.map((curEle, index) => {
          return (
            <div className="list" key={curEle.id}>
              <div className="listName">{curEle.name}</div>
              <div className="icons">
                <i
                  className="fas fa-trash-alt add-btn"
                  onClick={() => deleteItems(curEle.id)}
                ></i>

                <i
                  className="fas fa-edit add-btn"
                  onClick={() => editItems(curEle.id)}
                ></i>
              </div>
            </div>
          );
        })}
        {/*  */}

        <div>
          <div className="btn btn2" onClick={removeAll}></div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
