import html from '../static/index.html';
export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (request.method === 'GET' && url.pathname === '/') {
            return new Response(html, {
                headers: { 'Content-Type': 'text/html' },
            });
        } else if (request.method === 'POST' && url.pathname === '/joke') {
            const { name, favoriteFruit, favoriteColor, random, model } = await request.json();
            const messages = [
				{ role: "system", content: "You are a friendly assistant" },
				{
				  role: "user",
				  content: `Return nothing else besides a joke for someone named ${name} whose favorite color is ${favoriteColor} and favorite fruit is ${favoriteFruit}. They also say ${random}.`,
				},
			  ];
			console.log(name, favoriteColor, favoriteFruit, random, model);
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
