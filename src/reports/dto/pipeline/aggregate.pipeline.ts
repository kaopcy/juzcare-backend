export const project = {
    '_id': 1,
    'user': 1,
    'detail': 1,
    'title': 1,
    'locationDetail': 1,
    'status': 1,
    'location': 1,
    'upVotes': 1,
    'medias': 1,
    'comments': 1,
    'progresses': 1,
    'tags': 1,
    'review': 1,
    'createdAt': 1,
    'updatedAt': 1,
}

export const length = {
    'upVotesLength': { "$size": "$upVotes" },
    'commentsLength': { "$size": "$comments" },
}