export default class FeedSchema {
    static schema = {
        name: 'post',
        primarykey: 'idPost',
        properties: {
            idPost: { type: 'int', indexed: true },
            id: 'int',
            aspectRatio: 'int',
            media: 'string',
            userID: 'int',
            image: 'string',
            likes: 'string',
            likesNumber: 'int',
            small: 'string',
            name: 'string',
            avatar: 'string',
            description: 'string',
            video: 'string'
        }
    };
}
