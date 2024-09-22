"use client";

import styles from "@/app/page.module.css";
import {Counter} from "@/app/Counter";
import {ReactNode} from "react";

export default function Content({context}: { context: { Clock: ReactNode, EditorModule: ReactNode } }) {
    return <div>
        <p>Hello</p>
        <main className={styles.main}>
            <Counter/>
            {context.Clock}
            {context.EditorModule}
        </main>
    </div>;
}
