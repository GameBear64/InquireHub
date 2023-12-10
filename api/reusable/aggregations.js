exports.answer = ([
  {
    $lookup: {
      from: 'answers',
      localField: 'answers',
      foreignField: '_id',
      pipeline: [
        {
          $lookup: {
            from: 'messages',
            localField: 'messages',
            foreignField: '_id',
            pipeline: [
              {
                $lookup: {
                  from: 'users',
                  localField: 'author',
                  foreignField: '_id',
                  pipeline: [{ $project: { name: 1 } }],
                  as: 'author',
                }
              },
              { $unwind: "$author" },
              { $project: { title: 1, body: 1, author: 1, reaction: 1 } }
            ],
            as: 'messages',
          }
        },
        { $project: { messages: 1 } },
      ],
      as: 'answer',
    }
  },
  { $unwind: { path: "$answer", preserveNullAndEmptyArrays: true }},
  { $project: { answer: { $ifNull: [ "$answer", {} ]}, title: 1, body: 1, anonymous: 1 } },
])