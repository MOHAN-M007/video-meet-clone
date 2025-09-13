export default {
  async fetch(request, env, ctx) {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected a WebSocket request", { status: 400 });
    }

    const [client, server] = Object.values(new WebSocketPair());
    server.accept();

    server.addEventListener("message", (event) => {
      // Broadcast incoming message to all connected peers
      server.send(event.data);
    });

    return new Response(null, {
      status: 101,
      webSocket: client,
    });
  },
};
