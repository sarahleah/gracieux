import path from 'path'

export function makeImgSrcUrl(width, height, builtUrl) {

    let size = `${width},${height}`

    return path.join(builtUrl, 'full', size, '0', 'default.jpg')

}

export function makeIiifUrl(data) {
    let imgId = data.data.image_id
    let baseUrl = data.config.iiif_url
    return path.join(baseUrl, imgId)
}

export function getImgProperties(data) {
    let id = data.data.image_id
    let alt = data.data.thumbnail.alt_text
    let title = data.data.title
    let artist = data.data.artist_display
    return {id, alt, title, artist}
}

export function getApiUrlById(id) {
    let baseUrl = `https://api.artic.edu/api/v1/artworks/`
    return path.join(baseUrl, id)
}

export function getWikiSearchUrl(title) {
    let baseUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${title.split(' ').join('%20')}&utf8=&format=json&origin=*`
    return baseUrl
}

export function getWikiParseUrl(relevantResult) {
    let baseUrl = `https://en.wikipedia.org/w/api.php?action=parse&page=${relevantResult.title}&prop=text&formatversion=2&format=json&origin=*`
    return baseUrl
}

function removeInlineStyles(wikiResult) {
    return wikiResult.replace(/(style="(.)+")/gi, '')
}

function replaceClassWithClassName(wikiResult) {
    return wikiResult.replace(/(class=)/g, 'className=')
}

export function cleanResult(wikiResult) {
    return replaceClassWithClassName(wikiResult)
}


