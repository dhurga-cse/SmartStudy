async function generate() {
  const subject = document.getElementById("subject").value;
  const date = document.getElementById("date").value;
  const level = document.getElementById("level").value;

  const prompt = `Create a simple ${level} level study plan for ${subject} till ${date}`;

  document.getElementById("output").innerText = "Generating...";

  try {
    const response = await fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    document.getElementById("output").innerText = data.output;
  } catch (err) {
    document.getElementById("output").innerText = "Server error";
  }
}
