import styles from "./page.module.css";
import {Counter} from "@/app/Counter";
import {Clock} from "@/app/Clock";
import {Suspense} from "react";
import {ModuleOf} from "@/app/_ModuleResolver/ModuleOf";

export const experimental_ppr = true

export default function Home() {
    return (
        <div className={styles.page}>
            <Suspense fallback="loading... main content">
                <p>Hello</p>
                <main className={styles.main}>
                    <Counter/>
                    <Clock/>
                </main>
                <ModuleOf name="editor"/>
            </Suspense>
        </div>
    );
}
