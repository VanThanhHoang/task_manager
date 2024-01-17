import {createAsyncThunk} from "@reduxjs/toolkit";
import AxiosInstance from "../../utils/AxiosInstance";
import {Bill, Notification, ResidentInfo} from "../../global";

interface AddResidentPayload {
    residentId: string;
    roomName: string;
    residentInfo: ResidentInfo,
}

export const addResident = createAsyncThunk("room/getFloor", async (payload: AddResidentPayload, {rejectWithValue}) => {
    try {
        await registerResident(payload.residentInfo);
        const response = await AxiosInstance().post("room/addUser", {
            residentId: payload.residentId,
            roomName: payload.roomName
        });
        return response.data;
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

const registerResident = async (residentInfo: ResidentInfo) => {
    try {
        const response = await AxiosInstance().post("auth/register", residentInfo);
        console.log(response);
    } catch (err) {
        console.log(err);
        throw err;
    }
};


export const getResident = createAsyncThunk("room/getUser", async (id: string, {rejectWithValue}) => {
    try {
        const response = await AxiosInstance().get("user/" + id);
        return response.data;
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

//add payment to resident
interface AddPaymentPayload {
    paymentName: string;
    amount: string;
    residentId: string;
    addPayment2: (payment: Bill) => void;
    dueDate: Date;
}

export const addPayment = createAsyncThunk("room/addPayment", async ({
                                                                         paymentName,
                                                                         amount,
                                                                         residentId,
                                                                         addPayment2,
                                                                         dueDate
                                                                     }: AddPaymentPayload, {rejectWithValue}) => {
    try {
        console.log(paymentName, amount, residentId);
        const response = await AxiosInstance().put("user/addPayment/" + residentId, {
            paymentName,
            amount,
            dueDate
        });
        addPayment2(response.data.payment);
        return response.data;
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

interface MaskPaymentPayload {
    paymentId: string,
    residentId: string,
    updatePayment: (payment: Bill[]) => void;
}

export const maskPaymentIsPayment = createAsyncThunk("user/maskPayment", async ({
                                                                                    paymentId,
                                                                                    residentId,
                                                                                    updatePayment
                                                                                }: MaskPaymentPayload, {rejectWithValue}) => {
    try {
        const response = await AxiosInstance().put("user/maskIsPayment/" + residentId, {
            paymentId
        });
        console.log(response.data.payment);
        updatePayment(response.data.payment);
        return response.data;
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});


export const deleteResident = createAsyncThunk("room/delete", async (id: string, {rejectWithValue}) => {
    try {
        const response = await AxiosInstance().delete("user/delete/" + id);
        return response.data;
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

export const getAllResident = createAsyncThunk("room/getAllUser", async (setResident: (resident: ResidentInfo[]) => void, {rejectWithValue}) => {
    try {
        const response = await AxiosInstance().get("user");
        setResident(response.data.users);
        return response.data;
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

export const sendNoti = createAsyncThunk("room/sedNoti", async ({noti, id}: {
    noti: string,
    id: string
}, {rejectWithValue}) => {
    try {
        const response = await AxiosInstance().post("user/addNotification", {
            content: noti,
            residentId: id,
            time: new Date()
        });
        return response.data;
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});
