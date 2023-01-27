class SpotifyUtils {
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