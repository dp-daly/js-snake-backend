const csrfToken = document.querySelector('[name="csrf-token"]').content;

export async function endGame(gameId, croissantsEaten) {
  try {
    const response = await fetch("http://localhost:3000/end_game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({
        score: {
          game_id: gameId,
          value: croissantsEaten,
        },
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Error saving the score");
    }

    const data = await response.json();
    console.log("Score saved:", data);

    return data;

  } catch (error) {
    console.error("Error saving score:", error.message);
    return { error: error.message };
  }
}
