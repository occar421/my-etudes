import "server-only";

import {writeFile} from "fs/promises";

export async function ModuleOf({name}: { name: "editor" | "linter" }) {
    const js = await fetch(`http://localhost:5000/${name}.js`).then(res => res.text());
    await writeFile(`out/${name}.js`, js);
    const result = await import(`../../out/${name}.js`);
    return <result.default/>;
}
