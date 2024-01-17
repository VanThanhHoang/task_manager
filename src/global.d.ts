import resident from "./screens/resident";

interface ResidentInfo {
    _id: string,
    fullName: string,
    personal_identification_number: string;
    gender: string;
    portrait_url?: string;
    email: string;
    check_in_date?: Date,
    permanent_address: string;
    date_of_birth?: Date;
    nickName: string,
    fbLink: string,
    avatar: string,
    phone_number: string;
    isSharePublicInfo: boolean,
    role: "admin" | "user",
    payments: Bill[],
    intro: string,
    roomInfo: {
        floor: number,
        room: number,
    },
    notifications: Notification[]
}

interface Bill {
    _id: string,
    name: string,
    amount: number,
    isPayment: boolean,
    dueDate: Date
}

//new
// user.interface.ts
interface User {
    _id: string;
    userName: string;
    email: string;
    password: string;
    img?: string;
    createdAt?: Date;
    updatedAt?: Date;
}


// family.interface.ts
interface Family {
    _id:string,
    name: string;
    image?: string | null;
    members: User[];
    createBy: User[];
    tasks:Task[]
}


// task.interface.ts
interface Task {
    _id:string,
    title: string;
    detail?: string;
    timeStart: Date;
    timeEnd: Date;
    members: User[];
    status: string;
    createBy: User;
    createdAt?: Date;
    updatedAt?: Date;
}
