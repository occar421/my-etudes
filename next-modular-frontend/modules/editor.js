"use client";

import {useState} from "react";

export default function Editor() {
  const [test, setTest] = useState("")
  return <div>
    <summary>This is editor and have fun!</summary>
    <input type="text" value={test} onChange={e => setTest(e.target.value)}/>
  </div>;
}
