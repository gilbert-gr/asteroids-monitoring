export default async function Home() {

  let data;
  try {
    const response = await fetch ("http://127.0.0.1:8000/test");
    data = await response.json();
  } catch(err) {
    data = {message: `There was an error: ${err}`};
  }


  return (
    <div>
      <h1>Asteroid Monitoring</h1>
      <p>welcome</p>
      <p>status: {data.message}</p>
    </div>
  );
}
