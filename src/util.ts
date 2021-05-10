export function htmlToDivElement(html: string): HTMLDivElement {
	const template = document.createElement('template');
	html = html.trim();
	template.innerHTML = html;
	if(!(template.content.firstChild instanceof HTMLDivElement)){
		throw new Error('not a div');
	}
	return template.content.firstChild ?? {} as HTMLElement;
}
