import "server-only";

import styles from "./page.module.css";
import {Suspense} from "react";
import Content from "@/app/Content";
import {Clock} from "@/app/Clock";

export const experimental_ppr = true

export default async function Home() {
    return (
        <div className={styles.page}>
            <Suspense fallback="loading... main content"><Content context={{Clock: <Clock/>}}>
            </Content></Suspense>
        </div>
    );
}
