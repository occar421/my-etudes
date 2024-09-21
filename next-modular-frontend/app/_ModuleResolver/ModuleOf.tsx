export async function ModuleOf({name}: { name: "editor" | "linter" }) {
    const js = await fetch(`http://localhost:5000/${name}.js`).then(res => res.text());
    const moduleBase64 = Buffer.from(js).toString('base64');
    const result = await import(/*webpackIgnore: true*/ `data:text/javascript;base64,${moduleBase64}`);
    return <result.default/>;
}
