import Dashboard from "./Dashboard";

async function App() {
    let data;
    try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/monitoring`);
    data = await response.json();
    } catch (err) {
    data = { message: `There was an error: ${err}` };
    }

    if (data.error) {
        return (
            <div>
            <Title />
            <p>{data.error}</p>
            </div>
        );
        }
    
    return (
        <Dashboard data={data} />
    )

}

export default App