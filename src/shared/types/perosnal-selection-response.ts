import { Gender } from "@/features/selection-form/types/gender";
import { PersonalSelectionStatus } from "@/page/admin-personal-selection/types/perosnal-selection.types";
import { ChannelResponse } from "./channel-response";

export interface PersonalSelectionResponse {
    id: string;
    slug: string;
    for: {
        name: string;
        color: string;
    };
    goal: string;
    consumer: {
        gender: Gender,
        title: string;
        description: string;
    };
    formats: string[];
    total: string;
    selection: ChannelResponse[];
    status: PersonalSelectionStatus;
    channelIds: number[];
}