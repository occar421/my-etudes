"use client";

import styles from "@/app/page.module.css";
import {Counter} from "@/app/Counter";
import type {Clock} from "@/app/Clock";
// import {ModuleOf} from "@/app/_ModuleResolver/ModuleOf";
import {ReactNode, Suspense, useState} from "react";

export default function Content({context}: { context: { Clock: ReactNode } }) {
    const [mode, setMode] = useState<"editor" | "linter">("editor");

    return <div>
        <p>Hello</p>
        <main className={styles.main}>
            <Counter/>
            {context.Clock}
        </main>
        {/*<Suspense fallback={null}>*/}
        {/*    <ModuleOf name={mode}/>*/}
        {/*</Suspense>*/}
    </div>;
}
