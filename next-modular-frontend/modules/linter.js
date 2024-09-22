import "server-only";

export default async function Linter() {
  const result = await fetch('https://app-router-api.vercel.app/api/reviews', {cache: "no-store"}).then(res => res.json());

  return <div>This is linter and fix it!
    <ul>
      {result.map(r => <li key={r.id}>{r.text}</li>)}
    </ul>
  </div>;
}
