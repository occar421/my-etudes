import styles from "./page.module.css";
import {Counter} from "@/app/Counter";
import {Clock} from "@/app/Clock";
import {Suspense} from "react";

export const experimental_ppr = true

export default function Home() {
    return (
        <div className={styles.page}>
            <p>Hello</p>
            <main className={styles.main}>
                <Counter/>
                <Suspense fallback="loading...">
                    <Clock/>
                </Suspense>
            </main>
        </div>
    );
}
