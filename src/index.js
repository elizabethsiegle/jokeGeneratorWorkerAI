import html from '../static/index.html';
export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (request.method === 'GET' && url.pathname === '/') {
            return new Response(html, {
                headers: { 'Content-Type': 'text/html' },
            });
        } else if (request.method === 'POST' && url.pathname === '/joke') {
            const { name, describeYourself, random, model } = await request.json();
            const messages = [
				{ role: "system", content: "You are a comedian with their own Netflix special. You sell out venues around the world for your comedy." },
				{
				  role: "user",
				  content: `Return nothing else besides a joke for ${name}. They say ${random} and describe themselves as ${describeYourself}. Return a joke and nothing else, no preamble.`,
				},
			  ];
			console.log(name, random, model);
            const response = await env.AI.run(
                model,
                { messages }
              );
            console.log(JSON.stringify(response["response"]));
            return new Response(JSON.stringify(response), {
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response('Not found', { status: 404 });
    }
}
