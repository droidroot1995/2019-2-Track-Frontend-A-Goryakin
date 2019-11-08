export default function autoFill() {
    localStorage.setItem('chats', JSON.stringify(
        [
            {
                id: 0,
                avatar: 'http://pikchyriki.net/avatar/krutye/64/30.jpg',
                name: 'Алексей',
                time:'22:30',
                message:'Добрый вечер!',
                isGroup: false,
                status: 'sent'
            },
            {
                id: 1,
                avatar: 'http://pikchyriki.net/avatar/krutye/64/19.jpg',
                name:'Planet42',
                time:'9:00',
                message:'Привет',
                isGroup: true,
                status: '1'
            },
            {
                id: 2,
                avatar: 'http://pikchyriki.net/avatar/krutye/64/21.jpg',
                name:'Мартин',
                time:'10:00',
                message:'Доброе утро!',
                isGroup: false,
                status: 'sent_read'
            },
            {
                id: 3,
                avatar: 'http://pikchyriki.net/avatar/krutye/64/24.jpg',
                name:'Михаил',
                time:'14:00',
                message: 'Добрый день!',
                isGroup: false,
                status: '1'
            }
        ]
    ))

    localStorage.setItem('messages', JSON.stringify(
        {
            0:[
                {
                    name: 'Александр',
                    msg: 'Добрый вечер!',
                    status: 'sent',
                    self: true,
                    time: '22:30'
                },
            ],
            1:[
                {
                    name: 'Planet 42',
                    msg: 'Привет',
                    status: 'sent',
                    self: false,
                    time: '9:00'
                }
            ],
            2:[
                {
                    name: 'Александр',
                    msg: 'Доброе утро!',
                    status: 'sent',
                    self: true,
                    time: '10:00'
                }
            ],
            3:[
                {
                    name: 'Михаил',
                    msg: 'Добрый день!',
                    status: 'sent',
                    self: false,
                    time: '14:00'
                }
            ]
        }
    ))
}