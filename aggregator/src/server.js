// Local dev server: node:http -> Web Request -> handle() -> node:http response.
// Logs every request with start/end timestamps so request waterfalls are visible.

import { createServer } from 'node:http';
import { handle } from './app.js';

const PORT = Number(process.env.PORT ?? 4000);
const time = () => {
	const d = new Date();
	return `${ d.toTimeString().slice(0, 8) }.${ String(d.getMilliseconds()).padStart(3, '0') }`;
};

const server = createServer(async (req, res) => {
	const started = Date.now();
	const path = req.url ?? '/';
	console.log(`${ time() }  →  ${ req.method } ${ path }`);

	try {
		const request = new Request(`http://${ req.headers.host ?? 'localhost' }${ path }`, {
			method: req.method,
			headers: req.headers,
		});
		const response = await handle(request);
		res.writeHead(response.status, Object.fromEntries(response.headers));
		res.end(Buffer.from(await response.arrayBuffer()));
		console.log(`${ time() }  ←  ${ response.status } ${ path }  ${ Date.now() - started }ms`);
	} catch (err) {
		console.error(err);
		res.writeHead(500, { 'content-type': 'application/json' });
		res.end(JSON.stringify({ error: { code: 'internal', message: 'Aggregator crashed' } }));
	}
});

server.listen(PORT, () => {
	console.log(`Aggregator listening on http://localhost:${ PORT }/api`);
});
