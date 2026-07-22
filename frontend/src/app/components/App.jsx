import Dashboard from "./Dashboard";
import Title from "./Title";

async function App() {
    let data;
    try {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/monitoring`,
    {
        next: {
            revalidate: 3600,
        }
    });

    if (!response.ok) {
        throw new Error("Unable to retrieve asteroid data.");
        }

    data = await response.json();

    } catch (err) {
    data = { message: `There was an error: ${err}` };
        return (
            <div className="error-container">
                <Title />
                <div className="card">
                    <h2>🚨 Something went wrong</h2>
                    <p>Unable to load asteroid data. Please try again later.</p>
                </div>
            </div>
        );
        }

    
    return (
        <Dashboard data={data} />
    )

}

export default App