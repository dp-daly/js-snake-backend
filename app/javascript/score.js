const csrfToken = document.querySelector('[name="csrf-token"]').content;

export async function handleScore(croissantsEaten) {
  try {
    console.log("Sending score:", croissantsEaten);

    const response = await fetch("http://localhost:3000/scores/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({ score: { value: croissantsEaten } }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Error saving score");
    }

    const data = await response.json();
    console.log("Score updated:", data);

    return data;

  } catch (error) {
    console.error("Error updating score:", error.message);

    return { error: error.message };
  }
}
