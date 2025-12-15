Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    // Serve the main page
    if (url.pathname === "/") {
      const file = Bun.file("./src/index.html");
      return new Response(file, {
        headers: { "Content-Type": "text/html" },
      });
    }

    // Serve sketch.js
    if (url.pathname === "/js/sketch.js") {
      const file = Bun.file("./src/js/sketch.js");
      return new Response(file, {
        headers: { "Content-Type": "application/javascript" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log("Server running at http://localhost:3000");
