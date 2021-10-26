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
    let searchTerm = title.split(' ')
    searchTerm.length > 5 
        ? searchTerm = searchTerm.slice(0, 6).join(' ') 
        : searchTerm = searchTerm.join(' ')
    let artist = data.data.artist_display
    
    return {id, alt, title, artist, searchTerm}
}

export function getArtApiUrlById(id) {
    let baseUrl = `https://api.artic.edu/api/v1/artworks/`
    return path.join(baseUrl, id)
}