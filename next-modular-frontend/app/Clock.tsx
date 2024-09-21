export async function Clock() {
    const result1: {
        datetime: string
    } = await fetch('https://worldtimeapi.org/api/timezone/Asia/Tokyo', {cache: "no-store"}).then(res => res.json());
    const result2: {
        datetime: string
    } = await fetch('https://worldtimeapi.org/api/timezone/Europe/London').then(res => res.json());

    return <ul>
        <time>{result1.datetime}</time>
        <time>{result2.datetime}</time>
    </ul>
}
