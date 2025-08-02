import {NAV_ITEMS} from "./navigationbar/NavigationBar";
import {DayResults} from "./dayResults/DayResults";
import {AddingCalls} from "./addingCalls/AddingCalls";
import {CallsHistory} from "./CallsHistory/CallsHistory";




export type ActiveTabType = 'call' |  'deals' | 'pipe' | 'result' | 'history' | 'incentive'

type MainPropsType = {
    activeTab: ActiveTabType
}

export const MainRender = ({ activeTab }: MainPropsType ) => {

    switch (activeTab) {
        case NAV_ITEMS.CALL:
            return <AddingCalls />;
        case NAV_ITEMS.DEALS:
            return <></>;
        case NAV_ITEMS.PIPE:
            return <></>;
        case NAV_ITEMS.RESULT:
            return <DayResults />;
        case NAV_ITEMS.HISTORY:
            return <CallsHistory/>;
        case NAV_ITEMS.INCENTIVE:
            return <></>;
        default:
            return null;
    }
};