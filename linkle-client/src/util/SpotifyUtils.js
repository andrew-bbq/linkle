class SpotifyUtils {
    static getSpotifyIdFromUrl (url) {
        const splitUrl = url.split('/')
        const type = splitUrl[splitUrl.length - 2]
        var id = splitUrl[splitUrl.length - 1]
        if (id.includes('?')) id = id.split('?')[0]
        return {type, id}
    }

    static async getSpotifyTrackInfo (token, id) {
        const result = await fetch(`https://api.spotify.com/v1/track/${id}`, {
            method: 'GET',
            headers: { 'Authorization' : `Bearer  ${token}`}
        })
        return result
    }

    static async getSpotifyInfoFromUrl (url, token) {
        const {type, id} = SpotifyUtils.getSpotifyIdFromUrl(url)
        switch (type) {
            case 'Track':
                const data = SpotifyUtils.getSpotifyTrackInfo(token, id)
                return data
            default:
                break;
        }
    }
}

export default SpotifyUtils