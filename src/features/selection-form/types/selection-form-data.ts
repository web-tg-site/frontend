import { Gender } from "./gender";

export interface SelectionFormData {
    for: {
        name: string;
        color: string;
    };
    goal: string;
    consumer: {
        gender: Gender;
        title: string;
        description: string;
    };
    formats: string[];
    total: string;
    channelIds: number[];
    status: string;
}