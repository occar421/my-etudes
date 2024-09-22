"use client";

import styles from "@/app/page.module.css";
import {Counter} from "@/app/Counter";
import {Clock} from "@/app/Clock";
// import {ModuleOf} from "@/app/_ModuleResolver/ModuleOf";
import {Suspense, useState} from "react";

export default function Content() {
    const [mode, setMode] = useState<"editor" | "linter">("editor");

    return <div>
        <p>Hello</p>
        <main className={styles.main}>
            <Counter/>
            <Clock/>
        </main>
        {/*<Suspense fallback={null}>*/}
        {/*    <ModuleOf name={mode}/>*/}
        {/*</Suspense>*/}
    </div>;
}
