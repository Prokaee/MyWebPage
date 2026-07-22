// Vercel Edge Middleware — schuetzt NUR /demo (der Clickdummy) per HTTP-Basic-Auth.
// Der Rest der Seite (michaelprokop.at) bleibt oeffentlich und unberuehrt.
//
// Zugangsdaten kommen aus Environment-Variablen (NICHT im Code):
//   DEMO_USER, DEMO_PASS  -> in Vercel: Project Settings > Environment Variables
//
// Ohne gueltigen Login antwortet der Server mit 401 (Browser zeigt Login-Popup),
// die Seite wird gar nicht erst ausgeliefert = echter serverseitiger Schutz.

export const config = {
  // Nur diese Pfade laufen durch die Middleware (Rest der Site ist offen):
  matcher: ["/demo", "/demo/:path*"],
};

export default function middleware(request) {
  const auth = request.headers.get("authorization");
  const expectedUser = process.env.DEMO_USER;
  const expectedPass = process.env.DEMO_PASS;

  if (auth && auth.startsWith("Basic ")) {
    let decoded = "";
    try {
      decoded = atob(auth.slice(6));
    } catch {
      decoded = "";
    }
    const sep = decoded.indexOf(":");
    const user = decoded.slice(0, sep);
    const pass = decoded.slice(sep + 1);
    if (sep !== -1 && user === expectedUser && pass === expectedPass) {
      return; // Zugang gewaehrt -> Request laeuft normal weiter
    }
  }

  return new Response("Zugang nur mit Login.", {
    status: 401,
    headers: {
      "WWW-Authenticate":
        'Basic realm="Demo - nur fuer eingeladene Kollegen", charset="UTF-8"',
    },
  });
}
