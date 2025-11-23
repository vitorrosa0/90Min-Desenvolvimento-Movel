export async function GET(request) {
  try {
    const response = await fetch(
      "https://api.sportdb.dev/api/flashscore/football/brazil:39/serie-a-betano:Yq4hUnzQ/2025/results?page=1"
    , {
        headers: {
            "X-API-Key": "dnugKIuPca6wJtit9A6xDfLrkmu3xXlGmMnOZIRt",
        }
    });

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Erro ao buscar dados" }, { status: 500 });
  }
}
