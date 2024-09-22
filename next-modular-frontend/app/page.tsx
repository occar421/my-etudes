import "server-only";

import styles from "./page.module.css";
import {Suspense} from "react";
import Content from "@/app/Content";

export const experimental_ppr = true

export default function Home() {
    return (
        <div className={styles.page}>
            <Suspense fallback="loading... main content"><Content/></Suspense>
        </div>
    );
}
