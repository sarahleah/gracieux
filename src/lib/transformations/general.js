export function replaceClassWithClassName(wikiResult) {
    return wikiResult.replace(/(class=)/g, 'className=')
}

export function removeEditLinks(wikiResult) {
    let regex = /(<span class="mw-editsection">(.)*(<\/span>){2})/g
    return wikiResult.replace(regex, '')
}

export function prefixBrokenAncs(wikiResult) {
    return wikiResult
        .split('/wiki/')
        .join('https://en.wikipedia.org/wiki')
}