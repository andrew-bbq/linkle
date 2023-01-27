class SpotifyUtils {
    constructor (clientId, clientSecret) {
        this.clientId = 'f7c13465044643658fd287790d12aa12'
        this.clientSecret = '0c2869aeee834b15858e7c5703bf7893'
    }

    static getSpotifyIdFromUrl (url) {
        const splitUrl = url.split('/')
        const type = splitUrl[splitUrl.length - 2]
        const id = splitUrl[splitUrl.length - 1]
        return {type, id}
    }

    static async getSpotifyTrackInfo (id) {
        console.log(this.token)
        if (!this.token) this.token = SpotifyUtils.getToken()
        const result = await fetch(`https://api.spotify.com/v1/track/${id}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + this.token}
        })
        return await result.json()
    }

    static async getSpotifyInfoFromUrl (url) {
        const {type, id} = SpotifyUtils.getSpotifyIdFromUrl(url)
        switch (type) {
            case 'Track':
                const data = SpotifyUtils.getSpotifyTrackInfo(id)
                return data
            default:
                break;
        }
    }
}

export default SpotifyUtils