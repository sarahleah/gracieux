import { removeEditLinks, prefixBrokenAncs } from "../transformations/general"

export function getWikiSearchUrl(searchTerm) {
    let baseUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchTerm.split(' ').join('%20')}&utf8=&format=json&origin=*`
    return baseUrl
}

export function getWikiParseUrl(relevantResult) {
    let baseUrl = `https://en.wikipedia.org/w/api.php?action=parse&page=${relevantResult.title}&prop=text&formatversion=2&format=json&origin=*`
    return baseUrl
}

export function cleanWikiResult(wikiResult) {
    return prefixBrokenAncs(removeEditLinks(wikiResult))
}