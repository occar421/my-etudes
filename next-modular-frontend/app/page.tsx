import "server-only";

import styles from "./page.module.css";
import {Suspense} from "react";
import Content from "@/app/Content";
import {Clock} from "@/app/Clock";
import {ModuleOf} from "@/app/_ModuleResolver/ModuleOf";

export const experimental_ppr = true

export default function Home() {
    const context = {
        Clock: <Clock/>,
        EditorModule: <ModuleOf name="editor"/>,
        LinterModule: <ModuleOf name="linter"/>
    };

    return (
        <div className={styles.page}>
            <Suspense fallback="loading... main content">
                <Content serverComponents={context}/>
            </Suspense>
        </div>
    );
}
