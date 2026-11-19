// Vercel Function entry: all routing lives in src/app.js.
import { handle } from '../src/app.js';

export function GET(request) {
	return handle(request);
}
