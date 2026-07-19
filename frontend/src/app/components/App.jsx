import Dashboard from "./Dashboard";

async function App() {
    let data;
    try {
    const response = await fetch("http://127.0.0.1:8000/monitoring");
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