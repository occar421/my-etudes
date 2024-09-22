"use client";

import styles from "@/app/page.module.css";
import {Counter} from "@/app/Counter";
import {ReactNode} from "react";

type ServerComponents = "Clock" | "EditorModule" | "LinterModule";

export default function Content({serverComponents}: {
    serverComponents: Record<ServerComponents, ReactNode>;
}) {
    return <div>
        <p>Hello</p>
        <main className={styles.main}>
            <Counter/>
            {serverComponents.Clock}
            {serverComponents.EditorModule}
            {serverComponents.LinterModule}
        </main>
    </div>;
}
