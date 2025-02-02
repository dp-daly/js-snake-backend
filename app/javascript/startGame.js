const csrfToken = document.querySelector('[name="csrf-token"]').content;

export async function createGame(userId) {
  try {
    const response = await fetch("http://localhost:3000/start_game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({
        game: {
          user_id: userId,
        },
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Error creating game");
    }

    const data = await response.json();
    console.log("Game created:", data);

    return data;

  } catch (error) {
    console.error("Error creating game:", error.message);
    return { error: error.message };
  }
}
