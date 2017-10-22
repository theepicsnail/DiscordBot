export function parse(line: string) :Array<string> {
	const out:Array<string> = [];
	const quotes = "\"'`";
	let escaping = false;
	let exitQuote = null;
	let token = "";
	for(var c of line) {
		// Handle escaping.
		if(escaping) {
			token += c;
			escaping = false;
			continue;
		}
		if(c=='\\') {
			escaping = true;
			continue;
		}

		// Handle quotes.
		if (exitQuote) {
			if(c == exitQuote) {
				exitQuote = null;
				out.push(token);
				token = "";
			} else 
				token += c;
			continue;
		}
		if (quotes.indexOf(c) != -1) {
			exitQuote = c;
			continue;
		}

		// Spaces.
		if (c == ' ') {
			if(token) {
				out.push(token);
				token = "";
			}
			continue;
		}

		// Default.
		token += c;
	}

	if(token)
		out.push(token);
	
	return out;
}

