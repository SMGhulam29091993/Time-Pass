

export const sampleChats = [
    {
        avatar : ["https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"],
        name : "John Doe",
        _id : "1",
        groupChat : false,
        members : ["1","2"],
    },
    {
        avatar : ["https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"],
        name : "Pankaj Tripathi",
        _id : "2",
        groupChat : false,
        members : ["1","2"],
    }
]

export const sampleUsers = [
    {
        avatar : ["https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"],
        name : "John Doe",
        _id : "1",
    },
    {
        avatar : ["https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"],
        name : "Pankaj Tripathi",
        _id : "2",
    }
]


export const sampleNotification = [
    {
        sender :{
            avatar : ["https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"],
            name : "John Doe",            
        },
        _id : "1",
    },
    {
        sender: {
            avatar : ["https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"],
            name : "Pankaj Tripathi",            
        },
        _id : "2",  
    }
]

export const sampleMessage = [
    {
        attachments :[
            {
                public_id : "ahskck",
                url : "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
            }
        ],
        content : "L*uda Ka message",
        _id : "dlsjvkl68v7ssvs86745",
        sender : {
            _id : "user._id",
            name : "Chaman",
        },
        chat : "chatId",
        createdAt : "2024-04-18T15:00:00.000Z"
    },
    {
        attachments :[
            {
                public_id : "ahskck_2",
                url : "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
            },
            
        ],
        content : "Tera L*uda Ka message",
        _id : "dlsjvkl68v7ssvs6844ca",
        sender : {
            _id : "akjxchkd4adcdc86d8c",
            name : "Chaman Chutiya",
        },
        chat : "chatId",
        createdAt :"2024-04-20T12:00:00.000Z",
    }
]

export const dashBoardData = {
    users: [
        {
            avatar : ["https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"],
            name : "John Doe",
            email : "johnDoe@gmail.com",
            _id : "1",
            username:"john_doe",
            friends : 20,
            groups: 4,
        },
        {
            avatar : ["https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"],
            name : "Pankhuri Tripathi",
            email : "pankhuri_tripathi@gmail.com",
            _id : "2",
            username:"tripathi_pankhuri",
            friends : 22,
            groups: 3,
        }
    ],
    chats :[
        {
            name: "John De Souza Group",
            avatar : ["https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"],
            _id:"1",
            groupChats: false,
             members :[{_id:"1", avatar : "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"},
                        {_id:"2", avatar : "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"}],
            totalMembers: 2,
            totalMessages : 20,
            creator : {
                name :"Joseph Gonzalez ",
                avatar : "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png",
            },
        },
        {
            name: "Joshua Yea Boi Group",
            avatar : ["https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"],
            _id:"2",
            groupChats: true,
            members :[{_id:"1", avatar : "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"},
                        {_id:"2", avatar : "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"}],
            totalMembers: 2,
            totalMessages : 20,
            creator : {
                name :"Rose Mari Marlo",
                avatar : "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png",
            },
        },
    ],
    messages : [
        {
            attachments :[],
            contents : "L*uda ka messages",
            _id :"idhif64sdv45dsv4s",
            sender : {
                avatar : "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png",
                name:"Chut*ya Chaman",
            },
            chat : "chatId",
            groupChats : false,
            createdAt :"2024-05-07T10:00:00.000Z"
        },
        {
            attachments : [
                {
                    public_id : "vndjyft",
                    url : "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                },
               
            ],
            contents : "Tera L*nd ka messages",
            _id :"dvji5vddvvj4v8vd9vd",
            sender: {
                avatar : "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png",
                name : "Chaman Boi",
            },
            chat :"chatId",
            groupChats : true,
            createdAt :"2024-05-01T12:00:00.000Z"
        }
    ],
}


