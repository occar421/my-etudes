'use client';

import {useState} from "react";

export function Counter() {
    const [count, setCount] = useState(0)
    return <div>
        <button onClick={() => setCount(s => s + 1)}>{count}</button>
    </div>
}
