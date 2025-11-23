export async function GET() {
  try {
    const response = await fetch(
      "https://api.sportdb.dev/api/flashscore/football/brazil:39/serie-a-betano:Yq4hUnzQ/2025/results?page=1",
      {
        headers: {
          "X-API-Key": "dnugKIuPca6wJtit9A6xDfLrkmu3xXlGmMnOZIRt",
        },
      }
    );

    const data = await response.json();

    // pegar só os 10 primeiros e transformar
    const jogos = data.slice(0, 10).map((jogo) => ({
      id: jogo.eventId,
      jogo: `${jogo.homeName} x ${jogo.awayName}`,
      horario: jogo.startDateTimeUtc,
      homeLogo: jogo.homeLogo,
      awayLogo: jogo.awayLogo,
    }));

    return new Response(JSON.stringify(jogos), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao buscar dados" }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
